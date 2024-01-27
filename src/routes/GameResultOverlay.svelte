<script lang="ts">
	import type { GameState } from '$lib/types';
	import { NO_WINNER } from '$lib/constants';
	export let winner: GameState = NO_WINNER;
</script>

	<div>
		{#if winner === 0}
			<h1>Player 1 wins!</h1>
		{:else if winner === 1}
			<h1>Player 2 wins!</h1>
		{:else if winner === 2}
			<h1>It's a draw!</h1>
		{/if}
	</div>

