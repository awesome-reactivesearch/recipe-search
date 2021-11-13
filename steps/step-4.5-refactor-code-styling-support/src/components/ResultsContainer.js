import { Col } from "antd";
import { SearchComponent } from "@appbaseio/react-searchbox";
import React from "react";

const ResultsContainer = () => {
  return (
    <Col xs={20} sm={24} md={24} lg={18} xl={18}>
      <SearchComponent
        id="result-component"
        dataField={["title"]}
        distinctField="title.keyword"
        size={10}
        react={{
          and: "search-component",
        }}
      >
        {(props) => {
          const { results } = props;
          return results.data?.slice(1).map((item, idx) => {
            return (
              <div
                key={idx}
                style={{ border: "1px solid black", padding: ".7rem" }}
              >
                <span>{item.title}</span>
              </div>
            );
          });
        }}
      </SearchComponent>{" "}
    </Col>
  );
};

export default ResultsContainer;
