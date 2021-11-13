import ReactDOM from "react-dom";
import React from "react";
import {
  SearchBase,
  SearchBox,
  SearchComponent,
} from "@appbaseio/react-searchbox";
const App = () => {
  return (
    <>
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

      {/* SearchComponent for displaying results */}
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
      </SearchComponent>
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
      }}
    >
      Inside SearchBase: Greetings from React SearchBox
      <App />
    </SearchBase>
  </React.StrictMode>,
  document.getElementById("root")
);
