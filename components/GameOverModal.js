// components/GameOverModal.js
import React from "react";
import { useDispatch } from "react-redux";
import { startGame, resetGame } from "../reducers/tetrisReducer";

const GameOverModal = () => {
  const dispatch = useDispatch();

  const handleRestart = () => {
    dispatch(startGame());
  };

  const handleQuit = () => {
    dispatch(resetGame());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg text-center">
        <h2 className="text-2xl mb-4">Game Over</h2>
        <div className="flex justify-around">
          <button
            className="bg-slate-500 text-white px-4 py-2 rounded"
            onClick={handleRestart}
          >
            Rejouer
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={handleQuit}
          >
            Quitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
