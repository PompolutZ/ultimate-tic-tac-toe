<script lang="ts">
	import type { GameState } from '$lib/types';
	import { NO_WINNER } from '$lib/constants';
	export let winner: GameState = NO_WINNER;
</script>

{#if winner > NO_WINNER}
	<div class="game-result-overlay">
		{#if winner === 0}
			<h1>O wins!</h1>
		{:else if winner === 1}
			<h1>X wins!</h1>
		{:else if winner === 2}
			<h1>Draw!</h1>
		{/if}
	</div>
{/if}

<style>
	.game-result-overlay {
		grid-area: 1 / 1 / -1 / -1;
		display: grid;
		place-content: center;
		background-color: hsla(0, 0%, 0%, 0.7);
		color: hsla(0, 0%, 100%, 1);		
		z-index: 1;
	}
</style>
