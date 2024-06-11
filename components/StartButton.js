// components/StartButton.js
import React from "react";
import { useDispatch } from "react-redux";
import { startGame } from "../reducers/tetrisReducer";

const StartButton = () => {
  const dispatch = useDispatch();

  const handleStart = () => {
    dispatch(startGame());
  };

  return (
    <div className="flex flex-col bg-slate-950  h-20 w-20">
      <div
        style={{ "background-image": "url('/btnTetris1.png')" }}
        className=" bg-contain h-20 rounded-2xl border-white border-2 cursor-pointer bg-no-repeat bg-center"
        onClick={handleStart}
      >
      </div>
    </div>
  );
};

export default StartButton;
