<script lang="ts">
	import type { CellState, Player } from '$lib/types';
	import { NO_WINNER } from '$lib/constants';
	import { checkWin } from '$lib/helper';

    export let isActiveBoard: boolean;
	export let cells: CellState[];
	export let handleTurn: (cellIndex: number) => (e: MouseEvent) => void;
    const checkIsFinished = () => checkWin(cells) > NO_WINNER;
</script>

<div class="game-container" class:is-active={isActiveBoard && !checkIsFinished()}>
	{#each cells as cell, i}
		<button
			class="cell"
			class:circle={cell === 0}
			class:cross={cell === 1}
			on:click={handleTurn(i)}
		/>
	{/each}
</div>

<style>
	.game-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);
		gap: 1px;
		min-width: 35px;
		min-height: 35px;
	}
    .game-container:not(.is-active) {
        pointer-events: none;
    }

    .cell {
        background-color: hsl(0, 0%, 100%);
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .game-container:not(.is-active) .cell {
        background-color: hsl(0, 0%, 80%);
    }

	.cell.circle,
	.cell.cross {
		pointer-events: none;
	}

	.cell.circle::before,
	.cell.circle::after {
		content: '';
		position: absolute;
		border-radius: 50%;
	}

	.cell.circle::before {
		width: calc(var(--game-size) / 11);
		height: calc(var(--game-size) / 11);
		background-color: hsl(0, 0%, 20%);
	}

    .cell:hover.cell.circle::before {
        background-color: hsl(0, 0%, 30%);
    }

	.cell.circle::after {
		width: calc(var(--game-size) /15);
		height: calc(var(--game-size) / 15);
		background-color: hsl(0, 0%, 100%);
	}

	.cell.cross::before,
	.cell.cross::after {
		content: '';
		position: absolute;
		background-color: hsl(0, 0%, 20%);
		height: calc(var(--game-size) / 11);
		width: calc(var(--game-size) / 57);
	}

	.cell.cross::before {
		transform: rotate(45deg);
	}

	.cell.cross::after {
		transform: rotate(-45deg);
	}
</style>
