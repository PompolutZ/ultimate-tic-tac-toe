<script lang="ts">
	import 'normalize.css/normalize.css';
</script>

<div class="app">
	<slot />
</div>

<style>
	:root {
		--game-size: 90vmin;
		--blue: hsl(253, 87%, 79%);
		--darkblue: hsl(253, 76%, 62%);
		--off-white: hsl(35, 51%, 93%);
	}

	@media (min-width: 601px) {
		:root {
			--game-size: 50vmin;
		}
	}

	.app {
		width: 100%;
		min-height: 100vh;
		display: grid;
		place-content: center;
		background-color: var(--off-white);
	}
</style>
