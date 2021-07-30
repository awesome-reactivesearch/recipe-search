import React, { Component } from "react";
import { Row, Tag } from "antd";

import { STATIC_RECIPE_SUGGESTIONS } from "../helper/constans";
import { SearchContext } from "@appbaseio/react-searchbox";

class QuerySuggestions extends Component {
  static contextType = SearchContext;

  getStaticRecipeJsx = (optionsArr) => {
    return optionsArr.map((option) => (
      <React.Fragment key={option.value}>
        <Tag
          className="suggestion-tag"
          onClick={() => {
            this.context._components["search-component"].setValue(
              option.value,
              { triggerCustomQuery: true }
            );
          }}
          color={option.tagColor}
        >
          {option.value}
        </Tag>
        &nbsp;
      </React.Fragment>
    ));
  };
  render() {
    return (
      <Row className="suggestions-row">
        Try: &nbsp;{this.getStaticRecipeJsx(STATIC_RECIPE_SUGGESTIONS)}
      </Row>
    );
  }
}

export default QuerySuggestions;
