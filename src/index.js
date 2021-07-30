import ReactDOM from "react-dom";
import React from "react";
import { Col, Row } from "antd";
import { SearchBase, SearchBox } from "@appbaseio/react-searchbox";
import Layout from "antd/lib/layout/layout";

import "antd/dist/antd.css";

import FiltersContainer from "./components/FiltersContainer";
import QuerySuggestions from "./components/QuerySuggestions";
import ResultsContainer from "./components/ResultsContainer";

import "./assets/styles/index.css";

const App = () => {
  return (
    <>
      <Layout className="layout">
        {" "}
        <div>
          <h2>
            React Searchbox Demo{" "}
            <span>
              <a
                href="https://docs.appbase.io/docs/reactivesearch/react-searchbox/apireference/"
                target="_blank"
                rel="noopener noreferrer"
              >
                API reference
              </a>
            </span>
          </h2>

          <Row gutter="24" justify="center">
            <Col xs={20} sm={20} md={24} lg={16} xl={16}>
              {/* Main searchbox for searching recipes */}
              <SearchBox
                id="search-component"
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
                title="Search"
                placeholder="Yummy Pasta..."
                autosuggest={true}
                enablePopularSuggestions={true}
                enableRecentSearches={true}
                size={10}
                debounce={100}
                fuzziness="AUTO"
                showClear
                showVoiceSearch
                URLParams
                className="result-search-box"
                showDistinctSuggestions
                iconPosition="left"
                queryFormat="and"
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
        </div>
      </Layout>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <SearchBase
      index={process.env.REACT_APP_APPBASE_APP_NAME}
      credentials={process.env.REACT_APP_APPBASE_APP_CREDENTIALS}
      url={process.env.REACT_APP_APPBASE_URL}
      appbaseConfig={{
        recordAnalytics: true,
        enableQueryRules: true,
        userId: "jon@appbase.io",
        customEvents: {
          platform: "ios",
          device: "iphoneX",
        },
      }}
    >
      <App />
    </SearchBase>
  </React.StrictMode>,
  document.getElementById("root")
);
