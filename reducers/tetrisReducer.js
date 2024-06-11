import { createSlice } from "@reduxjs/toolkit";
import { generateRandomPiece } from "../utils/utils";
import {
  createEmptyBoard,
  checkCollision,
  placePieceOnBoard,
  clearFullRows,
} from "../utils/boardUtils";

const initialState = {
  board: createEmptyBoard(),
  piece: generateRandomPiece(),
  nextPiece: generateRandomPiece(), //! Ajout de l'état pour la prochaine pièce
  position: { x: 4, y: 0 },
  score: 0,
  level: 1,
  linesCleared: 0,
  isGameRunning: false,
  isGameOver: false,
};

const tetrisSlice = createSlice({
  name: "tetris",
  initialState,
  reducers: {
    startGame: (state) => {
      state.isGameRunning = true;
      state.isGameOver = false;
      state.board = createEmptyBoard();
      state.piece = generateRandomPiece();
      state.nextPiece = generateRandomPiece();
      state.position = { x: 4, y: 0 };
      state.score = 0;
      state.level = 1;
      state.linesCleared = 0;
    },
    //* Placer les pièces sur le tableau
    placePiece: (state) => {
      const newBoard = placePieceOnBoard(
        state.board,
        state.piece,
        state.position
      );
      const { clearedBoard, linesCleared } = clearFullRows(newBoard);

      state.board = clearedBoard;
      state.score += linesCleared * 10 * state.level;
      state.linesCleared += linesCleared;

      if (state.linesCleared >= state.level * 10) {
        state.level += 1;
      }

      // Utiliser la pièce suivante et générer une nouvelle pièce
      state.piece = state.nextPiece;
      state.nextPiece = generateRandomPiece();
      state.position = { x: 4, y: 0 };

      if (checkCollision(state.board, state.piece, state.position)) {
        state.board = createEmptyBoard();
        state.score = 0;
        state.level = 1;
        state.linesCleared = 0;
        alert("Game Over");
      }
    },

    //* Faire descendre les pièces
    movePieceDown: (state, action) => {
      // 1. on calcule la nouvelle position
      const newPosition = { x: state.position.x, y: state.position.y + 1 };

      // 2. on vérifie la collision vec la nouvelle position
      if (!checkCollision(state.board, state.piece, newPosition)) {
        // mise à jour de la nouvelle position
        state.position = newPosition;
      } else {
        // 3. on place la pièce si une nouvelle collision est détectée
        const newBoard = placePieceOnBoard(
          state.board,
          state.piece,
          state.position
        );
        // 4. on efface les lignes complétées ...
        const { clearedBoard, linesCleared } = clearFullRows(newBoard);
        state.board = clearedBoard;
        state.linesCleared += linesCleared;
        state.score += linesCleared * 10 * state.level;

        if (state.linesCleared >= state.level * 10) {
          state.level += 1;
        }
        // 5. On utilise la pièce suivante et on génère un nouvelle pièce 
        state.piece = state.nextPiece;
        state.nextPiece = generateRandomPiece();        
        state.position = { x: 4, y: 0 };
        
        // if (checkCollision(state.board, state.piece, state.position)) {
        //   state.board = createEmptyBoard();
        //   state.score = 0;
        //   state.level = 1;
        //   state.linesCleared = 0;
        //   alert("Game Over");
        // }
        //! utilisation de la modale
        if (checkCollision(state.board, state.piece, state.position)) {
          state.isGameOver = true;
          state.isGameRunning = false;
        }
      }
    },

    //* Bouger les pièces latéralement
    movePiece: (state, action) => {
      const { dx, dy } = action.payload;
      const newPosition = {
        x: state.position.x + dx,
        y: state.position.y + dy,
      };
      if (!checkCollision(state.board, state.piece, newPosition)) {
        state.position = newPosition;
      }
    },

    //* Faire tourner les pièces de 90° dans le sens antihoraire
    rotatePiece: (state, action) => {
      const rotatedPiece = state.piece.shape[0].map((_, index) =>
        state.piece.shape.map((row) => row[index]).reverse()
      );

      if (
        !checkCollision(
          state.board,
          { shape: rotatedPiece, color: state.piece.color },
          state.position
        )
      ) {
        state.piece.shape = rotatedPiece;
      }
    },

    resetGame: (state) => {
      state.isGameRunning = false;
      state.isGameOver = false;
      state.board = createEmptyBoard();
      state.piece = generateRandomPiece();
      state.nextPiece = generateRandomPiece();
      state.position = { x: 4, y: 0 };
      state.score = 0;
      state.level = 1;
      state.linesCleared = 0;
    },

    endGame: (state) => {
      state.isGameOver = true;
      state.isGameRunning = false;
    },

    //* Mise à jour du score
    updateScore: (state, action) => {
      // 1. On récupère le nombre de lignes effacées à partir de l'état actuel.
      const lines = state.linesCleared;

      // 2. On calcule le nombre de points à ajouter au score en fonction du nombre de lignes effacées,
      //    du niveau actuel et du score actuel.
      const pointToAdd = (state.score += linesCleared * 10 * state.level);

      // 3. On vérifie si des lignes ont été effacées et si des points doivent être ajoutés au score.
      if (lines > 0) {
        // 4. Si des points doivent être ajoutés (c'est-à-dire si pointsToAdd est supérieur à 0),
        //    on ajoute ces points au score actuel.
        state.score += pointToAdd;

        // 5. On met à jour le nombre total de lignes effacées en ajoutant le nombre de lignes effacées
        //    lors de cette action au nombre total déjà effacé.
        state.linesCleared += state.linesCleared;
      }
    },
  },
});

export const {
  startGame,
  placePiece,
  movePiece,
  movePieceDown,
  rotatePiece,
  resetGame,
  endGame,
  updateScore,
} = tetrisSlice.actions;
export default tetrisSlice;
