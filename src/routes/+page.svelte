<script lang="ts">
	import { NO_WINNER } from '$lib/constants';
	import type { Board, CellState, GameState, Player } from '$lib/types';
	import { checkWin, initGameBoard } from '$lib/helper';
	import GameResultOverlay from './GameResultOverlay.svelte';
	import GameBoard from './GameBoard.svelte';

	const cells: CellState[] = new Array(9).fill(NO_WINNER);
	const boards = initGameBoard();
	let activePlayer: Player = 0;
	let winner: GameState = NO_WINNER;
	let gameBoardResults: GameState[] = new Array(9).fill(NO_WINNER);
	let nextBoardToPlay: number = NO_WINNER;

	const handleTurn = (gameBoardIndex: number) => (cellIndex: number) => (_: MouseEvent) => {
		boards[gameBoardIndex][cellIndex] = activePlayer;

		const currentBoardResult = checkWin(boards[gameBoardIndex]);
		if (currentBoardResult > NO_WINNER) {
			gameBoardResults[gameBoardIndex] = currentBoardResult;
			if (checkWin(gameBoardResults as Board) > NO_WINNER) {
				winner = activePlayer;
				return;
			}
		}

		activePlayer ^= 1; // Love XOR!...
		nextBoardToPlay = checkWin(boards[cellIndex]) > NO_WINNER ? NO_WINNER : cellIndex;
	};
</script>

<div class="container">
	<div class="game">
		{#each boards as board, i}
			<GameBoard
				isActiveBoard={nextBoardToPlay === -1 || i === nextBoardToPlay}
				cells={board}
				handleTurn={handleTurn(i)}
			/>
		{/each}
	</div>
	<GameResultOverlay {winner} />
</div>

<div class="active-player">
	Current player: {activePlayer === 0 ? 'O' : 'X'}
</div>

<style>
	.container {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
		place-content: center;
		width: var(--game-size);
		height: var(--game-size);
	}

	.game {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 3px;
		background-color: hsl(0, 0%, 20%);
		grid-area: 1 / 1 / -1 / -1;
	}

	.active-player {
		margin: 1rem auto;
	}
</style>
