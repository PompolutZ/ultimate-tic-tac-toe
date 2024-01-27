<script lang="ts">
	import { NO_WINNER } from '$lib/constants';
	import type { CellState, GameState, Player } from '$lib/types';
	import { checkWin } from '$lib/helper';
	import GameResultOverlay from './GameResultOverlay.svelte';

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
	<div class="game-container">
		{#each cells as cell, i}
			<button
				class="cell"
				class:circle={cell === 0}
				class:cross={cell === 1}
				on:click={handleTurn(i)}
			></button>
		{/each}
	</div>

	{#if winner > NO_WINNER}
		<div class="game-result-overlay">
			<GameResultOverlay {winner} />
		</div>
	{/if}
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

	.game-result-overlay,
	.game-container {
		grid-area: 1 / 1 / -1 / -1;
	}

	.game-result-overlay {
		display: grid;
		place-content: center;
		background-color: hsla(0, 0%, 0%, 0.9);
		color: hsla(0, 0%, 100%, 1);
		z-index: 1;
	}

	.game-container {
		display: grid;
		grid-area: 1 / 1 / -1 / -1;
		background-color: hsl(0, 0%, 20%);
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 1px;
		min-width: 35px;
		min-height: 35px;
	}

	.cell {
		background-color: hsl(0, 0%, 100%);
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cell.circle::before,
	.cell.circle::after {
		content: '';
		position: absolute;
		border-radius: 50%;
	}

	.cell.circle::before {
		width: calc(var(--game-size) / 5);
		height: calc(var(--game-size) / 5);
		background-color: hsl(0, 0%, 20%);
	}

	.cell.circle::after {
		width: calc(var(--game-size) / 8);
		height: calc(var(--game-size) / 8);
		background-color: hsl(0, 0%, 100%);
	}

	.cell.cross::before,
	.cell.cross::after {
		content: '';
		position: absolute;
		background-color: hsl(0, 0%, 20%);
		height: calc(var(--game-size) / 5);
		width: calc(var(--game-size) / 25);
	}

	.cell.cross::before {
		transform: rotate(45deg);
	}

	.cell.cross::after {
		transform: rotate(-45deg);
	}
</style>
