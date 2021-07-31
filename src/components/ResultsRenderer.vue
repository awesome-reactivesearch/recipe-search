<template>
  <a-spin :spinning="loading" size="large">
    <!-- empty or no results -->
    <a-empty v-if="results.data.length <= 0" description="">{{
      loading ? "Fetching Data!" : "No Results Found!"
    }}</a-empty>
    <!-- renderResults -->
    <a-col span="24" class="result-time-status">
      <p>
        <strong>
          {{
            new Intl.NumberFormat("en-US", {
              maximumSignificantDigits: 3,
            }).format(results.numberOfResults)
          }}
        </strong>
        results found in
        <strong>
          {{
            typeof results.time == "object" ? results.time.took : results.time
          }}
        </strong>
        ms
      </p></a-col
    >
    <a-col
      id="under-observation"
      
    >
      <!-- rendering the promoted results on top -->
      <template v-if="!!results.promoted">
        <template
          v-for="promotedItem in getPromotedResultsArray(results.promotedData)"
        >
          <promoted-card-item
            :key="promotedItem.id"
            :promoted-item="promotedItem"
          />
        </template>
      </template>

      <template v-for="(recipeItem, index) in results.data">
        <!-- rendering all the result item except the promoted ones -->
        <card-item
          v-if="index !== 0"
          :key="index"
          :recipe-item="recipeItem"
          :set-full-recipe="setFullRecipe"
        />
      </template>

      <pagination-trigger
        :isSpinning="loading && results.data.length > 0"
        :scrollToTop="!from"
        :callNextPage="callNextPage"
      />
    </a-col>
  </a-spin>
</template>

<script>
import PaginationTrigger from './PaginationTrigger.vue';
import CardItem from './CardItem.vue';
import PromotedCardItem from './PromotedCardItem.vue';

export default {
	name: 'ResultsRenderer',
	components: {
		CardItem,
		PromotedCardItem,
		PaginationTrigger,
	},
	props: {
		loading: Boolean,
		size:{
			type: Number,
			default() {
				return 10;
			},
		},
		results: {
			type: Object,
			default() {
				return [];
			},
		},
		from: {
			type: Number,
			default() {
				return 0;
			},
		},
		/* eslint-disable no-console */
		setFrom: {
			type: Function,
			default() {
				return () => {
					console.log('Please provide a function');
				};
			},
		},
		/* eslint-enable no-console */
		setFullRecipe: {
			type: Function,
			default() {
				return ()=>window.console.log('Please provide Handler ');
			},
		},
	},
	data() {
		return {
			currentPage:0
		};
	},
	methods: {
		getPromotedResultsArray(promotedData) {
			return Array.isArray(promotedData) && promotedData?.length > 0
				? promotedData.map((item) => item.doc)
				: [];
		},
		callNextPage(){
			if (Math.floor(this.results.numberOfResults / this.size) >= this.currentPage) {
				this.currentPage += 1;
				this.setFrom(this.currentPage * this.size);
			}
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.result-time-status p strong{
    color: red;
}

#under-observation {
  display: flex;
  flex-wrap: wrap;
  grid-gap: 24px;
  max-height: 60vh;
  overflow: hidden scroll;



}

@media screen and (max-width: 600px) {
   #under-observation{  max-height: 50vh;}
}
</style>
