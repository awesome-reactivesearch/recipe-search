<template>
  <div id="app">
    <a-layout class="layout">
      <h2>
        Vue Searchbox Demo
        <span>
          <a
            href="https://docs.appbase.io/docs/reactivesearch/vue-searchbox/apireference/"
            target="_blank"
            rel="”noreferrer”"
            >API reference</a
          >
        </span>
      </h2>
      <search-base
        :index="index"
        :credentials="credentials"
        :url="url"
        :appbaseConfig="{
          recordAnalytics: true,
          enableQueryRules: true,
          userId: 'jon@appbase.io',
          customEvents: {
            platform: 'ios',
            device: 'iphoneX',
          },
        }"
      >
        <div>
          <a-row :gutter="24" justify="center" type="flex">
            <a-col :xs="20" :sm="20" :md="24" :lg="16" :xl="16">
              <search-box
                id="search-component"
                :dataField="[
                  { field: 'title', weight: 5 },
                  { field: 'title.search', weight: 1 },
                  { field: 'NER.keyword', weight: 3 },
                  { field: 'ingredients.keyword', weight: 2 },
                ]"
                title="Search"
                placeholder="Yummy pasta..."
                :autosuggest="true"
                :enablePopularSuggestions="true"
                :enableRecentSearches="true"
                :size="10"
                :debounce="100"
                queryFormat="and"
                fuzziness="AUTO"
                :showClear="true"
                :showVoiceSearch="true"
                :URLParams="true"
                class="result-search-box"
                :showDistinctSuggestions="true"
                iconPosition="left"
                style="
                   {
                    paddingbottom: 10;
                  }
                "
              />
              <query-suggestions />
            </a-col>
          </a-row>
          <a-row
            justify="center"
            type="flex"
            :gutter="[24, 24]"
            class="filter-row"
          >
            <a-col
              :xs="20"
              :sm="20"
              :md="24"
              :lg="6"
              :xl="6"
              :class="
                isMobileView && showFilterOptions
                  ? 'show-ingredients-full-screen'
                  : ''
              "
            >
              <a-button
                v-if="isMobileView"
                class="filter-reveal-cta"
                @click="() => (showFilterOptions = !showFilterOptions)"
              >
                {{ showFilterOptions ? "Hide" : "Show" }} Filters
              </a-button>

              <search-component
                id="ingredient-filter"
                dataField="NER.keyword"
                type="term"
                queryFormat="and"
                :highlight="true"
                :aggregationSize="30"
                :subscribe-to="['aggregationData', 'requestStatus', 'value']"
                :react="{
                  and: ['search-component'],
                }"
              >
                <div
                  slot-scope="{ aggregationData, loading, value, setValue }"
                  :class="{
                    isIngredientHidden: !showFilterOptions && isMobileView,
                  }"
                >
                  <!-- ingredient filter facet component -->
                  <filters-renderer
                    :isMobileView="isMobileView"
                    :aggregationData="aggregationData"
                    :loading="loading"
                    :value="value"
                    :setValue="setValue"
                  />
                </div>
              </search-component>
            </a-col>
            <a-col :xs="20" :sm="24" :md="24" :lg="18" :xl="18">
              <search-component
                id="result-component"
                :default-query="
                  () => {
                    return { track_total_hits: true };
                  }
                "
                :dataField="'title'"
                :distinctField="'title.keyword'"
                queryFormat="and"
                :highlight="true"
                :size="10"
                :subscribeTo="['requestStatus']"
                :react="{
                  and: ['search-component', 'ingredient-filter'],
                }"
                :preserveResults="true"
                :pagination="true"
              >
                <div slot-scope="props">
                  <results-renderer
                    :from="props.from"
                    :setFrom="props.setFrom"
                    :size="props.size"
                    :results="props.results"
                    :loading="props.loading"
                    :setFullRecipe="setFullRecipe"
                  />
                </div>
              </search-component>
            </a-col>
          </a-row>
        </div>
      </search-base>
    </a-layout>
    <recipe-modal
      :recipeItem="recipeItemUnderObservation"
      :visible="isRecipeModalVisible"
      :setFullRecipe="setFullRecipe"
    />
  </div>
</template>

<script>
// import Paginate from "vuejs-paginate";
import {
  SearchBase,
  SearchComponent,
  SearchBox,
} from "@appbaseio/vue-searchbox";
import "./styles.css";
import "./App.css";
import RecipeModal from "./components/RecipeModal.vue";
import QuerySuggestions from "./components/QuerySuggestions.vue";
import FiltersRenderer from "./components/FiltersRenderer.vue";
import ResultsRenderer from "./components/ResultsRenderer.vue";

export default {
  name: "App",
  components: {
    SearchBase,
    SearchBox,
    SearchComponent,
    RecipeModal,
    QuerySuggestions,
    FiltersRenderer,
    ResultsRenderer,
  },
  data() {
    return {
      index: process.env.VUE_APP_APPBASE_APP_NAME,
      credentials: process.env.VUE_APP_APPBASE_APP_CREDENTIALS,
      url: process.env.VUE_APP_APPBASE_URL,
      isMobileView: false,
      showFilterOptions: false,
      recipeItemUnderObservation: {}, // recipe item shown in modal
      isRecipeModalVisible: false,
    };
  },
  created() {
    if (window?.innerWidth <= 600) {
      !this.isMobileView && (this.isMobileView = true);
    }

    window.addEventListener("resize", this.windowResizeHandler);
  },
  destroyed() {
    window.removeEventListener("resize", this.windowResizeHandler);
  },
  methods: {
    windowResizeHandler() {
      if (window?.innerWidth <= 600) {
        !this.isMobileView && (this.isMobileView = true);
      } else {
        this.isMobileView && (this.isMobileView = false);
      }
    },
    setFullRecipe(recipeItem) {
      this.recipeItemUnderObservation = recipeItem;
      this.isRecipeModalVisible =
        !!recipeItem || Object.entries(recipeItem).length > 0;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.layout h2 > span {
  font-size: 1rem;
}

.show-ingredients-full-screen {
  position: fixed !important;
  z-index: 2;
  background: rgba(255, 255, 255, 0.9);
  height: 100vh;
  top: 0;
  width: 100vw !important;
  max-width: 100%;
  padding-top: 20px !important;
  overflow-y: scroll;
}

.filter-reveal-cta.ant-btn {
  margin-bottom: 10px;
}
</style>
