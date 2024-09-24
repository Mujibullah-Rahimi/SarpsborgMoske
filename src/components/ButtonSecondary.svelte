<script lang="ts">
	export let fontSize = '1em';
	export let height = '2.5em';
	export let text = 'text';
	export let link = '';
</script>

<button class="button" style="--font-size: {fontSize}; --height: {height};">
	<span><a href={link}>{text}</a></span>
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
		transition:
			background-color 0.3s ease,
			color 0.3s ease;

		// Pseudo-element for the sliding background effect
		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: -100%;
			width: 100%;
			height: 100%;
			background-color: var(--green-primary);
			transition: left 0.3s ease;
			z-index: 0;
		}

		&:hover {
			color: var(--white); // This affects the color of text inside the button

			&::before {
				left: 0; // Slide the background in from the left
			}

			// Ensure the <a> tag inside the button changes color when the button is hovered
			span a {
				color: var(--white); // Change text color to white when the button is hovered
			}
		}
	}
</style>
