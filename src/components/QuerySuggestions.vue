<template>
  <a-row type="flex" class="query-suggestions">
    <span >Try:</span>
    <template v-for="(item, index) in STATIC_RECIPE_SUGGESTIONS">
      <a-tag
        :key="index"
        :color="item.tagColor"
        @click="setQueryValue(item.value)"
        >{{ item.value }}</a-tag
      >
    </template>
  </a-row>
</template>

<script>
export default {
	inject: ['searchbase'],
	data() {
		return {
			STATIC_RECIPE_SUGGESTIONS: [
				{ value: 'Pizza', tagColor: 'magenta' },
				{ value: 'Curry', tagColor: 'red' },
				{ value: 'Low Carb', tagColor: 'volcano' },
				{ value: 'Pasta', tagColor: 'orange' },
				{ value: 'Fried', tagColor: 'gold' },
				{ value: 'Diabetic', tagColor: 'lime' },
				{ value: 'Veg', tagColor: 'green' },
				{ value: 'Healthy', tagColor: 'geekblue' },
				{ value: 'Saute', tagColor: 'cyan' },
			],
		};
	},
	methods: {
		setQueryValue(itemName) {
			this.searchbase._components['search-component'].setValue(itemName, {
				triggerCustomQuery: true,
			});
		},
	},
};
</script>

<style>
.query-suggestions{
	row-gap: 10px;
    margin-top: 1rem;
}

.query-suggestions >span{margin: 0 5px;}

.query-suggestions .ant-tag{cursor: pointer;}

</style>
