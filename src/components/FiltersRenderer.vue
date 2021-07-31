<template>
  <div
    :class="{
      'filter-container': true,
    }"
  >
    <!-- Spinner placeholder for loading : true -->
    <a-row v-if="loading" justify="center" type="flex" :gutter="[24, 24]"
      ><a-col span="24">
        <a-spin :spinning="loading" size="large"></a-spin> </a-col
    ></a-row>

    <!-- template for result renderer -->
    <template v-if="!loading">
      <template
        v-for="(item, index) in getIngredientFilterArr(aggregationData, value)"
      >
        <a-checkable-tag
          :key="index"
          :checked="value ? value.includes(item._key) : false"
          @change="
            (checked) => handleFilterToggle(checked, value, setValue, item._key)
          "
        >
          <a-icon v-if="!item.isChecked" type="plus-circle" />
          <a-icon v-if="item.isChecked" type="minus-circle" />
          {{ item._key }} ({{
            new Intl.NumberFormat("en-US", {
              maximumSignificantDigits: 3,
            }).format(item._doc_count)
          }})</a-checkable-tag
        ></template
      >
      <a-col span="24">
        <a-button
          v-if="!isMobileView"
          type="primary"
          @click="showAllFilters = !showAllFilters"
          >Show {{ showAllFilters ? "Less" : "More" }}
        </a-button>
      </a-col>
    </template>
  </div>
</template>

<script>
export default {
  name: "FiltersRenderer",
  props: {
    isMobileView: {
      type: Boolean,
      default() {
        return false;
      },
    },
    loading: Boolean,
    aggregationData: {
      type: Object || Array,
      default() {
        return [];
      },
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    setValue: {
      type: Function,
      default() {
        return () => {
          window.console.log("Please provide a function");
        };
      },
    },
    /* eslint-enable no-console */
  },
  data() {
    return {
      showAllFilters: false,
    };
  },
  methods: {
    getIngredientFilterArr(aggregationData, value) {
      /* eslint-disable array-callback-return */
      const responseValue = value
        ? value.map((item) => item.toLowerCase())
        : [];
      const sortedFilters = [];
      aggregationData?.data?.map((item) => {
        if (!responseValue.includes(item._key.toLowerCase())) {
          sortedFilters.push(item);
        } else {
          sortedFilters.unshift({ isChecked: true, ...item });
        }
      });

      return sortedFilters.slice(
        0,
        Math.max(
          7,
          this.showAllFilters || this.isMobileView ? sortedFilters.length : 7
        )
      );
      /* eslint-enable array-callback-return */
    },
    handleFilterToggle(checked, value, setValue, itemKey) {
      let values = value || [];
      if (!checked) {
        values = [...values.filter((valueItem) => valueItem !== itemKey)];
      } else {
        values.push(itemKey);
      }
      // Set filter value and trigger custom query
      setValue(values, {
        triggerDefaultQuery: false,
        triggerCustomQuery: true,
        stateChanges: true,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filter-container {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 10px;
}
.filter-container > .ant-row {
  width: 100%;
  height: 200px;
}

.filter-container *.ant-tag-checkable {
  cursor: pointer;
  width: max-content;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: capitalize;
  font-size: 13px;
  font-weight: 600;
  border-color: rgb(90, 183, 148);
}

.filter-container .ant-col:last-child > .ant-btn {
  font-weight: bold;
}
</style>
