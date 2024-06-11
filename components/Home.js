import React from "react";
import GameBoard from "./GameBoard";

const Home = () => {
  return (
    <div className="flex items-center gap-5">
      <main className="">
        <div className="gameBoy flex flex-col items-center justify-center bg-slate-950 ">
          <h1 className="text-xl text-white text-center mt-2">Tetris</h1>
          <div className="relative border-2 border-gray-500 mx-auto mt-2 rounded-md">
            <GameBoard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
