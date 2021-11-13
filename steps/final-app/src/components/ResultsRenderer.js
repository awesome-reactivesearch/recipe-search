import { Col, Empty, Row, Spin } from "antd";

import CardItem from "./CardItem";
import InfiniteScrollContainer from "./InfiniteScrollContainer";
import PromotedCardItem from "./PromotedCardItem";
import React, { useState } from "react";
import RecipeFullView from "./RecipeFullView";

let currentPage = 0; //current page number; used for scroll pagination
const ResultsRenderer = ({
  results = [],
  loading = false,
  size = 0,
  setFrom = () => console.log("Pass a function to implement pagination"),
}) => {
  const [fullRecipe, setfullRecipe] = useState({
    isModalVisible: false, //boolean for full-recipe modal visibility
    recipeItem: {}, // object holding current recipe opened in modal for full-recipe
  });
  const renderPromotedResults = (results) => {
    //getting promoted results separately from normal results
    const promotedData = results?.promoted
      ? [
          ...results.promotedData.map((element) => {
            return element.doc;
          }),
        ]
      : [];
    return promotedData?.map((promotedItem) => (
      <PromotedCardItem key={promotedItem.id} item={promotedItem} />
    ));
  };

  const renderResults = (results) => {
    return results.data?.slice(1).map((item) => {
      return (
        <CardItem
          key={item.id * Math.random()}
          item={item}
          setfullRecipe={setfullRecipe}
        />
      );
    });
  };

  return (
    <>
      {" "}
      {!results.data.length ? (
        <Empty
          description={
            <span>{loading ? "Fetching Data!" : "No Results Found!"}</span>
          }
        ></Empty>
      ) : (
        <Col span={24} className="result-time-status">
          {" "}
          <p>
            <strong>
              {new Intl.NumberFormat("en-US", {
                maximumSignificantDigits: 3,
              }).format(results.numberOfResults)}
            </strong>{" "}
            results found in{" "}
            <strong>
              {typeof results.time == "object"
                ? results.time.took
                : results.time}
            </strong>{" "}
            ms
          </p>
        </Col>
      )}
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
              {renderPromotedResults(results)}
              {renderResults(results)}
            </Row>
          </Spin>{" "}
        </div>
      </InfiniteScrollContainer>
      {/* Recipe full view modal */}
      <RecipeFullView
        isModalVisible={fullRecipe.isModalVisible}
        recipeItem={fullRecipe.recipeItem}
        onClose={() => setfullRecipe({ isModalVisible: false, recipeItem: {} })}
      />
    </>
  );
};

export default ResultsRenderer;
