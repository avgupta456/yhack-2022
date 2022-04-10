import React from "react";
import { useSelector } from "react-redux";

const TodayScreen = () => {
  const nodes = useSelector((state) => state.user.nodes);
  console.log(nodes);
  return (
    <div className="w-full h-full flex justify-center pt-16 bg-orange-100">
      <div className="flex flex-col">
        <p className="text-3xl font-bold ">Tuesday Tasks</p>
        {nodes
          .filter((node) => node.type === "task" && Math.abs(node.x - 437) < 50)
          .map((node, i) => {
            return (
              <div className="text-2xl p-4">
                {i + 1}. {node.title}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TodayScreen;
