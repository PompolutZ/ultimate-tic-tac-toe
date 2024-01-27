<script lang="ts">
	import { NO_WINNER } from "$lib/constants";
	import type { CellState, Player } from "$lib/types";

	const cells: CellState[] = new Array(9).fill(NO_WINNER);
	let activePlayer: Player = 0;

	const handleTurn = (cellIndex: number) => (_: MouseEvent) => {
		cells[cellIndex] = activePlayer;
		activePlayer ^= 1; // Love XOR!...
	};
</script>

<div class="game-container">
	{#each cells as cell, i}
		<button class="cell" class:circle={cell === 0} class:cross={cell === 1} on:click={handleTurn(i)}></button>
	{/each}
</div>

<style>
	.game-container {
		display: grid;
		width: var(--game-size);
		height: var(--game-size);
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
