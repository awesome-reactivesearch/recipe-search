import { Row, Spin } from "antd";

import CardItem from "./CardItem";
import InfiniteScrollContainer from "./InfiniteScrollContainer";
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
