import ReactDOM from "react-dom";
import React from "react";
import { SearchBase, SearchBox } from "@appbaseio/react-searchbox";
import ResultsContainer from "./components/ResultsContainer";
import Layout from "antd/lib/layout/layout";
import { Col, Row } from "antd";
import QuerySuggestions from "./components/QuerySuggestions";
import FiltersContainer from "./components/FiltersContainer";
import "antd/dist/antd.css";
import "./assets/styles/index.css";

const App = () => {
  return (
    <>
      <Layout className="layout">
        <Row gutter="24" justify="center">
          <Col xs={20} sm={20} md={24} lg={16} xl={16}>
            {/* Main searchbox for searching recipes */}
            <SearchBox
              id="search-component"
              className="result-search-box"
              iconPosition="left"
              showClear
              showVoiceSearch
              dataField={[
                {
                  field: "title",
                  weight: 5,
                },
                {
                  field: "title.search",
                  weight: 1,
                },

                {
                  field: "NER.keyword",
                  weight: 3,
                },
              ]}
              URLParams
              autosuggest
              showDistinctSuggestions
              size={10}
              enablePopularSuggestions={true}
              popularSuggestionsConfig={{
                size: 3,
                minChars: 2,
                index: "recipes-demo",
              }}
              enableRecentSuggestions={true}
              recentSuggestionsConfig={{
                size: 3,
                minHits: 2,
                index: "recipes-demo",
              }}
              index="recipes-demo"
            />
            {/* Recipe Suggestions Component */}
            <QuerySuggestions />
          </Col>
        </Row>

        <Row justify="center" gutter={(24, 24)} className="result-row">
          {/* filters-column */}
          <FiltersContainer />
          {/* Results- Column */}
          <ResultsContainer />
        </Row>
      </Layout>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <SearchBase
      index="recipes-demo"
      credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
      url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
      appbaseConfig={{
        recordAnalytics: true,
        enableQueryRules: true,
      }}
    >
      <App />
    </SearchBase>
  </React.StrictMode>,
  document.getElementById("root")
);
