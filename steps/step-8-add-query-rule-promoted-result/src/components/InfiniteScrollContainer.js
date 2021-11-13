import React from "react";
import { SearchContext } from "@appbaseio/react-searchbox";
import { Spin } from "antd";
import "../assets/styles/infiniteScrollContainer.css";

let prevY = 0;
class InfiniteScrollContainer extends React.Component {
  static contextType = SearchContext;
  constructor(props) {
    super(props);
    this.loadingRef = React.createRef();
  }
  // eslint-disable-next-line
  handleObserver = (entities, observer) => {
    const y = entities[0].boundingClientRect.y;

    if (prevY > y) {
      this.props.callNextPage();
    }
    prevY = y;
  };
  componentDidMount() {
    var options = {
      root: document.getElementById("under-observation"),
      rootMargin: "0px",
      threshold: 1.0,
    };

    this.observer = new IntersectionObserver(this.handleObserver, options);
    this.observer.observe(this.loadingRef.current);
  }

  componentDidUpdate() {
    if (this.context._components["result-component"].from == 0) {
      document.getElementById("under-observation").scrollTo(0, 0);
    }
  }

  render() {
    const { children, loading } = this.props;
    return (
      <div id="under-observation">
        <>{children}</>
        <div ref={this.loadingRef} className="loading-spinner">
          <Spin
            delay={500}
            spinning={loading}
            size="large"
            tip="Fetching Results"
          ></Spin>
        </div>
      </div>
    );
  }
}

export default InfiniteScrollContainer;
