import React from "react";
import { Row, Spin } from "antd";

import InfiniteScrollContainer from "./InfiniteScrollContainer";

let currentPage = 0; //current page number; used for scroll pagination
const ResultsRenderer = ({
  results = [],
  loading = false,
  size = 0,
  setFrom = () => console.log("Pass a function to implement pagination"),
}) => {
  const renderResults = (results) => {
    return results.data?.slice(1).map((item) => {
      return (
        <div
          key={item.id * Math.random()}
          style={{ border: "1px solid black", padding: ".7rem" }}
        >
          <span>{item.title}</span>
        </div>
      );
    });
  };

  return (
    <>
      <InfiniteScrollContainer
        callNextPage={() => {
          if (Math.floor(results.numberOfResults / size) >= currentPage) {
            currentPage++;
            setFrom(currentPage * size);
          }
        }}
        loading={loading}
      >
        <div className="result-list-container">
          <Spin spinning={loading}>
            <Row
              gutter={[16, 16]}
              wrap
              justify="flex-start"
              className="result-row"
            >
              {renderResults(results)}
            </Row>
          </Spin>{" "}
        </div>
      </InfiniteScrollContainer>
    </>
  );
};

export default ResultsRenderer;
