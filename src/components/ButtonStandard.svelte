<script lang="ts">
	import { goto } from '$app/navigation';

	export let fontSize = '1em';
	export let height = '2.5em';
	export let text = 'text';
	export let link = '';

	function goToLink() {
		if (link != '') {
			goto(link);
		}
	}
</script>

<button class="button" style="--font-size: {fontSize}; --height: {height};" on:click={goToLink}>
	<span><a>{text}</a></span>
</button>

<style lang="scss">
	// Ensures the text remains visible above the sliding background
	span {
		position: relative;
		z-index: 1;

		a {
			text-decoration: none;
			color: var(--green-primary);
			transition: color 0.3s ease; // Smooth color change on button hover
		}
	}

	.button {
		height: var(--height);
		font-size: var(--font-size);
		border: 1px solid var(--green-primary);
		box-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.2);
		border-radius: 5px;
		background-color: var(--white);
		position: relative;
		padding: 0 20px;
		cursor: pointer;
		overflow: hidden;
		color: var(--green-primary);
		a{
			text-transform: capitalize;
		}
	}
</style>
