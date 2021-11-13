import { SearchComponent } from "@appbaseio/react-searchbox";
import { Col } from "antd";
import React from "react";
import FiltersRenderer from "./FiltersRenderer";

const FiltersContainer = () => {
  return (
    <Col xs={20} sm={20} md={24} lg={6} xl={6}>
      {/* Search component displaying ingredient filters facets */}
      <SearchComponent
        id="ingredient-filter"
        type="term"
        queryFormat="and"
        aggregationSize={30}
        dataField="NER.keyword"
        subscribeTo={["aggregationData", "requestStatus", "value"]}
        react={{
          and: ["search-component"],
        }}
        value={[]}
        render={({ aggregationData, loading, value, setValue }) => {
          //Component for rendering Ingredient Filters
          return (
            <FiltersRenderer
              loading={loading}
              value={value}
              rawFilterData={aggregationData}
              setValue={setValue}
            />
          );
        }}
      />
    </Col>
  );
};

export default FiltersContainer;
