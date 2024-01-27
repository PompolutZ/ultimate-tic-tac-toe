import { NO_WINNER } from './constants';
import type { Board, GameState } from './types';

export const checkWin = (board: Board): GameState => {
	// Define winning combinations
	const lines = [
		[0, 1, 2], // top row
		[3, 4, 5], // middle row
		[6, 7, 8], // bottom row
		[0, 3, 6], // left column
		[1, 4, 7], // middle column
		[2, 5, 8], // right column
		[0, 4, 8], // left-to-right diagonal
		[2, 4, 6] // right-to-left diagonal
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (board[a] > NO_WINNER && board[a] === board[b] && board[a] === board[c]) {
			return board[a];
		}
	}

	if (!board.includes(NO_WINNER)) {
		return 2;
	}

	return NO_WINNER;
};
