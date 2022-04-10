import React from "react";

const LandingScreen = () => {
  return (
    <div className="w-full h-full flex justify-center bg-cyan-500 text-orange-600">
      <div className="w-full xl:w-1/2 flex flex-col justify-center p-4">
        <div className="w-full 3xl:w-2/3 mx-auto text-center text-3xl md:text-5xl 3xl:text-6xl font-bold mb-6">
          Find a balanced schedule that works for you
        </div>
        <div className="w-full 3xl:w-2/3 mx-auto text-center md:text-lg 3xl:text-2xl mb-2">
          Clockwork uses an innovative graph based scheduling algorithm to
          create a healthy schedule that reduces stress and increases
          productivity
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
