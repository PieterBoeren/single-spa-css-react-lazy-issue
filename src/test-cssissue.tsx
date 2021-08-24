import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import singleSpaCss from "single-spa-css";

import "./test.scss";

const cssLifecycles = singleSpaCss({
  // required: a list of CSS URLs to load
  // can be omitted if webpackExtractedCss is set to true, do not specify Webpack extracted css files here
  cssUrls: [],

  // optional: defaults to false. This controls whether extracted CSS files from Webpack
  // will automatically be loaded. This requires using the ExposeRuntimeCssAssetsPlugin,
  // which is documented below.
  webpackExtractedCss: true,
});

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

// Export an array of lifecycles to integrate with a framework's
// single-spa lifecycles. The order matters.
export const bootstrap = [cssLifecycles.bootstrap, reactLifecycles.bootstrap];

export const mount = [
  // The CSS lifecycles should be before your framework's mount lifecycle,
  // to avoid a Flash of Unstyled Content (FOUC)
  cssLifecycles.mount,
  reactLifecycles.mount,
];

export const unmount = [
  // The CSS lifecycles should be after your framework's unmount lifecycle,
  // to avoid a Flash of Unstyled Content (FOUC)
  reactLifecycles.unmount,
  cssLifecycles.unmount,
];
