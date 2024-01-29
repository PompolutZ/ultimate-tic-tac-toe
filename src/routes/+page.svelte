<script lang="ts">
	import { NO_WINNER } from '$lib/constants';
	import type { Board, GameState, Player } from '$lib/types';
	import { checkWin, initGameBoard } from '$lib/helper';
	import GameResultOverlay from './GameResultOverlay.svelte';
	import GameBoard from './GameBoard.svelte';

	let boards = initGameBoard();
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

	const restart = () => {
		boards = initGameBoard();
		gameBoardResults.fill(NO_WINNER);
		winner = NO_WINNER;
		nextBoardToPlay = NO_WINNER;
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

<div class="info">
	Current player: {activePlayer === 0 ? 'O' : 'X'}
	<button class="restart" on:click={restart}>Play again!</button>
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

	.info {
		margin: 1rem auto;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 1.5rem;
		margin-top: 1.5rem;
	}

	.restart {
		border: 0;
		border-radius: 0.75rem;
		cursor: pointer;
		box-shadow: -6px 6px var(--darkblue);
		background-color: var(--blue);
		margin: auto;
		padding: 8px 24px;
		transform: rotate(-3deg);
	}

	.restart:active {
		box-shadow: -3px 3px var(--darkblue);
		transform: translate(-3px, 3px) rotate(-3deg);
	}
</style>
