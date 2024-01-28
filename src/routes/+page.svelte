<script lang="ts">
	import { NO_WINNER } from '$lib/constants';
	import type { CellState, GameState, Player } from '$lib/types';
	import { checkWin } from '$lib/helper';
	import GameResultOverlay from './GameResultOverlay.svelte';
	import GameBoard from './GameBoard.svelte';

	const cells: CellState[] = new Array(9).fill(NO_WINNER);
	let activePlayer: Player = 0;
	let winner: GameState = NO_WINNER;

	const handleTurn = (cellIndex: number) => (_: MouseEvent) => {
		cells[cellIndex] = activePlayer;	
		const maybeWinner = checkWin(cells);
		if (maybeWinner > NO_WINNER) {
			winner = maybeWinner;
			return;
		}

		activePlayer ^= 1; // Love XOR!...
	};
</script>

<div class="container">
	<GameBoard {cells} {handleTurn} />
	<GameResultOverlay {winner} />
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
</style>
