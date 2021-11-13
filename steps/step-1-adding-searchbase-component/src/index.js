import ReactDOM from "react-dom";
import React from "react";
import { SearchBase } from "@appbaseio/react-searchbox";

ReactDOM.render(
  <SearchBase
    index="recipes-demo"
    credentials="a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61"
    url="https://appbase-demo-ansible-abxiydt-arc.searchbase.io"
  >
    Inside SearchBase: Greetings from React SearchBox
  </SearchBase>,
  document.getElementById("root")
);
