<script lang="ts">
	const cells = new Array(9).fill(-1);
	let activePlayer = 0;

	const handleTurn = (cellIndex: number) => (_: MouseEvent) => {
		cells[cellIndex] = activePlayer;
		activePlayer ^= 1; // Love XOR!...
	};
</script>

<div class="game-container">
	{#each cells as cell, i}
		<button class="cell" class:circle={cell === 0} on:click={handleTurn(i)}></button>
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
		width: calc(var(--game-size) / 7);
		height: calc(var(--game-size) / 7);
		background-color: hsl(0, 0%, 100%);
	}
</style>
