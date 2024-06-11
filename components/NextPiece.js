import React, { useEffect, useState } from "react"; //!
import { useSelector } from "react-redux";
import {
  renderNextPiece,
  createEmptyBoard,
  placePieceOnBoard,
} from "../utils/boardUtils";

const NextPiece = () => {
  const nextPiece = useSelector((state) => state.tetris.nextPiece);

  const [pieceBoard, setPieceBoard] = useState([]); //!
  useEffect(() => {
    const emptyBoard = createEmptyBoard(4, 3); // Create an empty board of size 4x3
    const boardWithPiece = placePieceOnBoard(emptyBoard, nextPiece, {
      x: 1,
      y: 1,
    });
    setPieceBoard(boardWithPiece);
  }, [nextPiece]);

  return (
    <div className="next-piece flex flex-col items-center">
      <h2 className="text-white">Next Piece</h2>
      <div className="next-piece-grid h-12 mt-3">
        {renderNextPiece(nextPiece).map((row, rowIndex) => (
          //{nextPiece.shape.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, cellIndex) => (
              <div
                key={cellIndex}
                className={`w-4 h-4 border ${
                  cell.value ? "border-gray-800 rounded-sm" : "border-gray-800"
                }`}
                style={{
                  backgroundColor: cell.value ? cell.color : "#1F2937",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextPiece;
