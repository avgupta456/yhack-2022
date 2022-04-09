import React from "react";
import Graph from "./Graph";

const HomeScreen = () => {
  return (
    <div className="w-full h-full flex">
      <div className="w-1/3 bg-red-100">Test</div>
      <div className="w-2/3 bg-blue-100">
        <Graph />
      </div>
    </div>
  );
};

export default HomeScreen;
