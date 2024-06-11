//* Dimensions du plateau de jeu
export const BOARD_WIDTH = 10; // Largeur de la grille en nombre de cellules x 4 x 16
export const BOARD_HEIGHT = 20; // Hauteur de la grille en nombre de cellules

//* 1. Fonction pour créer un plateau de jeu vide
export const createEmptyBoard = () => {
  // Création d'un tableau de BOARD_HEIGHT lignes
  return Array.from({ length: BOARD_HEIGHT }, () =>
    // Chaque ligne est un tableau de BOARD_WIDTH cellules, initialisées avec { value: 0, color: "" }
    Array.from({ length: BOARD_WIDTH }, () => ({ value: 0, color: "" }))
  );
};

//* 2. Fonction pour vérifier les collisions
export const checkCollision = (board, piece, position = { x: 0, y: 0 }) => {
  const { shape } = piece;
  const { x, y } = position;

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (
        shape[i][j] &&
        (board[y + i] && board[y + i][x + j] && board[y + i][x + j].value) !== 0
      ) {
        return true; // Collision détectée
      }
    }
  }
  return false; // Pas de collision
};

//* 3. Fonction pour placer la pièce sur le plateau de jeu
export const placePieceOnBoard = (board, piece, position) => {
  if (!board) return board; // Vérification de la définition de board

  const newBoard = board.map((row) => row.slice());
  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const boardX = x + position.x;
        const boardY = y + position.y;
        if (
          boardY >= 0 &&
          boardY < BOARD_HEIGHT &&
          boardX >= 0 &&
          boardX < BOARD_WIDTH
        ) {
          newBoard[boardY][boardX] = {
            value: cell,
            color: piece.color,
          };
        }
      }
    });
  });
  return newBoard;
};

//* 4. Fonction pour effacer les lignes complètes
export const clearFullRows = (board) => {
  const newBoard = board.filter((row) => row.some((cell) => cell.value === 0));
  const clearedRows = BOARD_HEIGHT - newBoard.length;
  const emptyRows = Array.from({ length: clearedRows }, () =>
    Array.from({ length: BOARD_WIDTH }, () => ({ value: 0, color: "" }))
  );
  return {
    clearedBoard: [...emptyRows, ...newBoard],
    linesCleared: clearedRows,
  };
};

//* 5. Fonction pour le rendu de la prochaine pièce à jouer
export const renderNextPiece = (nextPiece) => {
  if (!nextPiece || !nextPiece.shape) {
    return []; // Retourner un tableau vide si nextPiece n'est pas défini ou n'a pas de forme
  }

  const pieceBoard = []; // Initialiser un tableau vide pour contenir la pièce

  // Placer la prochaine pièce sur le tableau
  nextPiece.shape.forEach((row, rowIndex) => {
    const newRow = []; // Initialiser une nouvelle ligne pour la pièce
    row.forEach((cell, cellIndex) => {
      newRow.push({ value: cell, color: cell ? nextPiece.color : null }); // Ajouter la cellule avec la valeur et la couleur
    });
    pieceBoard.push(newRow); // Ajouter la ligne au tableau de la pièce
  });

  return pieceBoard;
};

