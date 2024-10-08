<script lang="ts">
	import MediaQuery from '../MediaQuery.svelte';

	export let source = '';
	export let altText = 'missing alternate text';
	export let title = 'Title goes here';
	export let text = 'Lorem ipsum dolor set';
</script>

<MediaQuery query="(min-width: 936px)" let:matches>
	{#if matches}
		<div class="card">
			<div class="inner-card">
				<div class="image">
					<img src={source} alt={altText} />
				</div>
				<div class="content">
					<div class="title">
						<h1>
							{title}
						</h1>
					</div>
					<div class="text">
						<p>
							{text}
						</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 935px)" let:matches>
	{#if matches}
		<div class="mobile-card">
			<div class="mobile-inner-card">
				<div class="image">
					<img src={source} alt={altText} />
				</div>
				<div class="content">
					<div class="title">
						<h1>
							{title}
						</h1>
					</div>
					<div class="text">
						<p>
							{text}
						</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
</MediaQuery>

<style lang="scss">
	.card {
		height: 500px;
		padding: 5px;
		box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
		border-radius: 15px;
		background-color: var(--white);
		.inner-card {
			height: 100%;
			padding: 10px;
			display: flex;
			flex-direction: column;
			// box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
			// border-radius: 15px;
			.image {
				margin: 0;
				padding: 0;
				box-shadow: 5px 0px 12px 0 rgb(0, 0, 0, 0.2);
				overflow-y: hidden;
				height: 150%;
				border-radius: 15px 15px 0 0;
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					border-radius: 15px 15px 0 0;
				}
			}
			.content {
				height: 100%;
				padding: 10px;
				border-radius: 0 0 15px 15px;
				box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
				.title {
					h1 {
						font-weight: 300;
					}
				}
				.text {
					p {
						font-weight: 300;
					}
				}
			}
		}
	}

	.mobile-card {
		width: 90%;
		margin: 20px auto;
		height: 200px;
		padding: 2px;
		box-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.2);
		border-radius: 15px;
		background-color: var(--white);

		.mobile-inner-card {
			height: 100%;
			padding: 10px;
			display: flex;

			.image {
				margin: 0;
				padding: 0;
				width: 250px; /* Set a fixed width for all images */
				border-radius: 15px 0 0 15px;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
					object-fit: cover; /* Ensures the image fits within the container and maintains aspect ratio */
					border-radius: 15px 0 0 15px;
				}
			}

			.content {
				flex-grow: 1; /* Takes up the rest of the space */
				height: 100%;
				padding: 10px;
				border-radius: 0 15px 15px 0;
				box-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.2);

				.title {
					h1 {
						font-size: 1.25em;
						font-weight: 400;
					}
				}

				.text {
					p {
						font-weight: 300;
						font-size: 0.9em;
					}
				}
			}
		}
	}
</style>
