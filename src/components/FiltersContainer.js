import { SearchBox, SearchComponent } from "@appbaseio/react-searchbox";
import { Button, Col } from "antd";
import React, { useEffect, useState } from "react";
import FiltersRenderer from "./FiltersRenderer";

const FiltersContainer = () => {
  const [isMobileView, setIsMobileView] = useState(false); //state variable(boolean) depicting mobile view or otherwise

  const [showFilterOptions, setShowFilterOptions] = useState(false); //used in mobile view to show/ hide filter options (ingredient in this case)

  useEffect(() => {
    // using resize listener for applying mobile responsiveness programatically
    if (window?.innerWidth <= 600) {
      !isMobileView && setIsMobileView(true);
    }

    const windowResizeHandler = () => {
      if (window?.innerWidth <= 600) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };
    window.addEventListener("resize", windowResizeHandler);

    return () => {
      window.removeEventListener("resize", windowResizeHandler);
    };
  }, []);
  return (
    <Col
      xs={20}
      sm={20}
      md={24}
      lg={6}
      xl={6}
      className={`${
        isMobileView && showFilterOptions ? "show-ingredients-full-screen" : ""
      }`}
    >
      {isMobileView && !showFilterOptions && (
        <Button onClick={() => setShowFilterOptions(!showFilterOptions)}>
          {showFilterOptions ? "Hide" : "Show"} Filters
        </Button>
      )}

      {/* Searchbox for searching through ingredients */}
      {((isMobileView && showFilterOptions) || !isMobileView) && (
        <SearchBox
          queryFormat="and"
          className={`${
            !showFilterOptions && isMobileView
              ? "isIngredientHidden ingredient-search-box"
              : "ingredient-search-box"
          }`}
          id="filter-search-component"
          dataField={[
            {
              field: "NER.keyword",
              weight: 4,
            },
          ]}
          title={
            <div className="filter-search-component__title">
              <span>Ingredient Filter</span>
              {isMobileView && (
                <Button
                  onClick={() => setShowFilterOptions(!showFilterOptions)}
                >
                  {showFilterOptions ? "Hide" : "Show"} Filters
                </Button>
              )}
            </div>
          }
          placeholder="Try searching : 'salt' or 'sugar'"
          autosuggest={true}
          debounce={100}
          fuzziness="AUTO"
          showClear
          URLParams
          iconPosition="left"
          enablePredictiveSuggestions={true}
        />
      )}

      {/* Search component displaying ingredient filters facets */}
      <SearchComponent
        id="ingredient-filter"
        type="term"
        queryFormat="and"
        highlight
        aggregationSize={30}
        dataField="NER.keyword"
        subscribeTo={["aggregationData", "requestStatus", "value"]}
        react={{
          and: ["search-component", "filter-search-component"],
        }}
        value={[]}
        render={({ aggregationData, loading, value, setValue }) => {
          //Component for rendering Ingredient Filters
          return (
            <FiltersRenderer
              showFilterOptions={showFilterOptions}
              isMobileView={isMobileView}
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
