import { SearchComponent } from "@appbaseio/react-searchbox";
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
      {isMobileView && (
        <Button onClick={() => setShowFilterOptions(!showFilterOptions)}>
          {showFilterOptions ? "Hide" : "Show"} Filters
        </Button>
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
          and: ["search-component"],
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
