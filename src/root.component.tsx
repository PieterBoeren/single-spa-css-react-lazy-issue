import React, { Suspense } from "react";

// Comment this and it will work again
const LazyComponent = React.lazy(() => import("./LazyComponent"));

export default function Root(props) {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <h1>Hello</h1>
    </Suspense>
  );
}
