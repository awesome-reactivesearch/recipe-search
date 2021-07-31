<template>
  <a-card hoverable class="card-item">
    <div id="card-header">
      <h3 v-html="getTitleInnerHtml(recipeItem)"></h3>
    </div>
    <div id="card-body">
      <div>
        <template
          v-for="(nerItem, index) in getIngredientIterables(recipeItem.NER)"
        >
          <span :key="index">
            {{ nerItem }}
            {{ index !== recipeItem.NER.length - 1 ? "," : "" }}
          </span>
        </template>
      </div>
    </div>

    <!-- footer -->
    <a-row id="card-footer" type="flex" justify="space-between" align="middle">
      <a-col span="11">
        <span>
          <img src="./../assets/images/external-link.png" height="25px" />
          <a
            :href="'https://' + recipeItem.link"
            target="_blank"
            rel="noreferrer"
          >
            Recipe Origin
          </a>
        </span></a-col
      >
      <a-col span="8" pull="2">
        <a-tooltip title="See Full Recipe!">
          <a-button
            @click="
              () => {
                setFullRecipe(recipeItem);
              }
            "
          >
            View Recipe</a-button
          >
        </a-tooltip>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    recipeItem: {
      type: Object,
      default() {
        return {};
      },
    },
    setFullRecipe: {
      type: Function,
      default() {
        return () => {
          window.console.log("Please provide a function");
        };
      },
    },
    /* eslint-enable no-console */
  },
  methods: {
    getIngredientIterables(ingredientsArr) {
      return ingredientsArr
        ?.filter((item) => item.replace(/[^A-Za-z']/g, "").length > 0)
        .map((item) => item.replace(/[\u{0080}-\u{FFFF}]/gu, ""));
    },
    getTitleInnerHtml(source) {
      return source?.title?.trim().replace(/[()]/g, "");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-item {
  height: 250px;
  width: 300px;
}

#card-header {
  height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(240, 240, 240);
  border-radius: 2px 2px 0px 0px;
  padding-left: 10px;
}

#card-header h3 {
  height: auto;
  white-space: pre-wrap;
  margin-bottom: 0px;
  line-height: 22px;
  font-size: 14px;
  color: rgb(255, 127, 127);
  margin-top: 0px;
}

#card-body {
  height: 120px;
  border-bottom: 1px solid rgb(240, 240, 240);
  border-radius: 2px 2px 0px 0px;
}
#card-body > div {
  display: flex;
  align-items: center;
  gap: 4px 5px;
  flex-wrap: wrap;
  font-size: 0.75rem;
  padding: 5px 15px;
  text-overflow: ellipsis;
  max-height: 100%;
  /* Needed to make it work */
  overflow: hidden;
  white-space: nowrap;
}
#card-body > div span {
  display: "flex";
  align-items: "center";
  grid-gap: "4px";
  text-transform: capitalize;
}
#card-footer {
  height: calc(250px - 120px - 72px);
  padding: 7px;
}
a {
  color: #42b983;
}
</style>
