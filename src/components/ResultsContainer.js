import { Col } from "antd";
import { SearchComponent } from "@appbaseio/react-searchbox";
import React from "react";

import ResultsRenderer from "./ResultsRenderer";

const ResultsContainer = () => {
  return (
    <Col xs={20} sm={24} md={24} lg={18} xl={18}>
      <SearchComponent
        id="result-component"
        URLParams
        highlight
        defaultQuery={() => {
          return { track_total_hits: true };
        }}
        dataField={["title"]}
        distinctField="title.keyword"
        size={10}
        aggregationSize={10}
        react={{
          and: ["search-component", "ingredient-filter"],
        }}
        preserveResults={true}
      >
        {(props) => {
          const { results, loading, size, setFrom } = props;

          return (
            //Component for rendering recipe results
            <ResultsRenderer
              results={results}
              loading={loading}
              size={size}
              setFrom={setFrom}
            />
          );
        }}
      </SearchComponent>
    </Col>
  );
};

export default ResultsContainer;
