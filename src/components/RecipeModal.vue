<template>
  <div v-if="Object.keys(recipeItem).length > 0">
    <a-modal
      v-model="visible"
      :title="recipeItem.title.trim().replace(/[()]/g, '')"
      @cancel="onClose"
    >
      <div>
        <h3>Ingredients</h3>
        <ul>
          <template v-for="(item, index) in recipeItem.ingredients"
            ><li :key="index">
              <img src="./../assets/images/ingredients.svg" height="15px" />
              {{ item[0].toUpperCase() + item.substring(1) }}
            </li></template
          >
        </ul>
      </div>
      <div>
        <h3>Cook this Way!</h3>
        <ul>
          <template v-for="(item, index) in recipeItem.directions"
            ><li :key="index">
              <img src="./../assets/images/cooking.svg" height="20px" />
              {{ item[0].toUpperCase() + item.substring(1) }}
            </li></template
          >
        </ul>
      </div>
      <template slot="footer">
        <a-row id="card-footer" type="flex" justify="end" align="middle">
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
        </a-row></template
      >
    </a-modal>
  </div>
</template>

<script>
export default {
	name: 'RecipeModal',
	props: {
		recipeItem: {
			default() {
				return {};
			},
			type: Object,
		},
		setFullRecipe: {
			default() {
				return () => window.console.log('Provide a handler as prop!');
			},
			type: Function,
		},
		visible: Boolean,
	},
	methods: {
		getIngredientIterables(ingredientsArr) {
			return ingredientsArr?.filter(
				(item) => item.replace(/[^A-Za-z']/g, '').length > 0
			);
		},
		onClose() {
			this.setFullRecipe({});
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
}
li {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 4px 1px;
}
a {
  color: #42b983;
}
</style>
