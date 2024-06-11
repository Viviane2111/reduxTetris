import dynamic from "next/dynamic"; //!
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  placePiece,
  movePiece,
  movePieceDown,
  rotatePiece,
  resetGame,
  endGame,
} from "../reducers/tetrisReducer";
import {
  placePieceOnBoard,
  checkCollision,
  clearFullRows,
} from "../utils/boardUtils";
import StartButton from "./StartButton";
import GameOverModal from "./GameOverModal";

const NextPiece = dynamic(() => import("./NextPiece"), { ssr: false }); //!

const GameBoard = () => {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.tetris.board);
  const piece = useSelector((state) => state.tetris.piece);
  const position = useSelector((state) => state.tetris.position);
  const score = useSelector((state) => state.tetris.score);
  const level = useSelector((state) => state.tetris.level);
  const linesCleared = useSelector((state) => state.tetris.linesCleared);
  const isGameRunning = useSelector((state) => state.tetris.isGameRunning);
  const isGameOver = useSelector((state) => state.tetris.isGameOver);

  useEffect(() => {
    // if (!isGameRunning) return; //?

    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          dispatch(movePiece({ dx: -1, dy: 0 }));
          break;
        case "ArrowRight":
          dispatch(movePiece({ dx: 1, dy: 0 }));
          break;
        case "ArrowDown":
          dispatch(movePieceDown());
          break;
        case "ArrowUp":
          dispatch(rotatePiece());
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [dispatch]);

  useEffect(() => {
    if (!isGameRunning) return;

    const intervalId = setInterval(() => {
      dispatch(movePieceDown());
    }, 1000 / level);

    return () => clearInterval(intervalId);
  }, [level, dispatch, isGameRunning]);

  useEffect(() => {
    if (checkCollision(board, piece, position)) {      
      dispatch(endGame());
    }
  }, [board, piece, position, dispatch]);

  const renderBoard = () => {
    const displayBoard = placePieceOnBoard(board, piece, position);
    return displayBoard;
  };

  return (
    <div className="game-container flex">
      {!isGameRunning && (
        <div className="start-button">
          <StartButton />
        </div>
      )}
      {isGameRunning && (
        <>
          <div className="array p-1 mt-50">
            {isGameRunning &&
              renderBoard().map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  {row.map((cell, cellIndex) => (
                    <div
                      key={cellIndex}
                      className={`w-4 h-4 border ${
                        cell.value
                          ? "border-gray-800 rounded-sm"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: cell.value ? cell.color : "#d1d5db",
                      }}
                    />
                  ))}
                </div>
              ))}
          </div>
          <div className="flex flex-col justify-center gap-5 my-1 mx-2">
            <div className="text-white mt-2 pl-2 text-sm flex flex-col items-center">
              <p>Best score:</p>
              <p>10 000</p>
            </div>
            <div className="text-white mt-2 mx-auto text-sm">
              Score: {score}
            </div>
            <div className="text-white mt-2 mx-auto text-sm">
              Level: {level}
            </div>
            <NextPiece />
          </div>
        </>
      )}
      {isGameOver && (
        <GameOverModal />
      )}
    </div>
  );
};

export default GameBoard;
