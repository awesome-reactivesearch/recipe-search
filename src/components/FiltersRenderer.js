import React, { useEffect, useState } from "react";
import { Button, Col, Row, Spin, Tag } from "antd";
import { PlusCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import "./../assets/styles/filtersRenderer.css";
const { CheckableTag } = Tag;

const FiltersRenderer = ({
  showFilterOptions,
  isMobileView,
  loading,
  value,
  rawFilterData,
  setValue,
}) => {
  const [showAllFilters, setShowAllFilters] = useState(false); //used for displaying all available filters at once
  const [sortedFilters, setSortedFilters] = useState([]); // an array that would have sorted filters' list based on selected/ not-selected
  const [selectedFilters, setSelectedFilters] = useState([]);
  useEffect(() => {
    //applying logic for having the selected filters always in front of array and rest following them
    let tempSortedFilters = [];
    rawFilterData?.data?.forEach((item) => {
      if (!selectedFilters.includes(item._key.toLowerCase())) {
        tempSortedFilters.push(item);
      } else {
        tempSortedFilters.unshift(item);
      }
    });
    setSortedFilters(tempSortedFilters);
  }, [rawFilterData.data, selectedFilters]);

  useEffect(() => {
    if (
      value &&
      selectedFilters.join("|") !==
        value.map((item) => item.toLowerCase()).join("|")
    ) {
      setSelectedFilters(
        //value prop gives us all the selected filters(ingredients)
        value // storing selected filters' names in a separate variable
          ? value.map((item) => item.toLowerCase())
          : []
      );
    }
  });
  return (
    <div
      className={
        !showFilterOptions && isMobileView
          ? " filter-container isIngredientHidden"
          : "filter-container"
      }
    >
      {loading ? (
        <Row
          justify="center"
          align="middle"
          gutter={[24, 24]}
          className="spinner-container"
        >
          {" "}
          <Col span={24}>
            <Spin spinning={loading} size="large"></Spin>
          </Col>
        </Row>
      ) : (
        <>
          {sortedFilters //showing only 7 or less filters by default; based on users'choice and device width
            .slice(
              0,
              Math.max(
                7,
                showAllFilters || isMobileView ? sortedFilters.length : 7
              )
            )
            .map((item) => {
              const isChecked = value
                ? selectedFilters.includes(item._key.toLowerCase())
                : false;
              return (
                <div className="list-item" key={item._key}>
                  <CheckableTag
                    checked={isChecked}
                    onChange={(checked) => {
                      let values = value || [];
                      if (!checked) {
                        values = [
                          ...values.filter(
                            (valueItem) => valueItem != item._key
                          ),
                        ];
                      } else {
                        values.push(item._key);
                      }
                      // Set filter value and trigger custom query
                      setValue(values, {
                        triggerDefaultQuery: false,
                        triggerCustomQuery: true,
                        stateChanges: true,
                      });
                    }}
                  >
                    {isChecked ? <MinusCircleTwoTone /> : <PlusCircleTwoTone />}{" "}
                    {`${item._key} ( ${new Intl.NumberFormat("en-US", {
                      maximumSignificantDigits: 3,
                    }).format(item._doc_count)} )`}
                  </CheckableTag>
                </div>
              );
            })}

          {/* //for desktop only */}
          {!isMobileView && (
            <Col span={24}>
              <Button
                type="primary"
                onClick={() => setShowAllFilters(!showAllFilters)}
              >
                Show {showAllFilters ? "Less" : "More"}
              </Button>
            </Col>
          )}
        </>
      )}
    </div>
  );
};

export default FiltersRenderer;
