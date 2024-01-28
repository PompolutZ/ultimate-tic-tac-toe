<script lang="ts">
	import 'normalize.css/normalize.css';
</script>

<div class="app">
	<slot />
</div>

<style>
	:root {
		--game-size: 90vmin;
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
	}
</style>
