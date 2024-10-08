<script lang="ts">
	import XmarkMcc from '$lib/icons/xmark-mcc.svelte';
	import { slide, fade } from 'svelte/transition';
	import { getAllSadaqah } from '$lib/firebase/firebaseFunctions';

	export let open = false;
	let sadaqahs: any[] = []; // Array of sadaqah objects to display
	let selectedSadaqah: any = null;
	let isLoading = true;
	let errorMessage = '';

	// Fetch all sadaqahs when the popup opens
	$: if (open) {
		fetchSadaqahs();
	}

	// Function to fetch sadaqahs
	async function fetchSadaqahs() {
		isLoading = true;
		try {
			sadaqahs = await getAllSadaqah();
		} catch (error) {
			console.error('Error fetching sadaqahs:', error);
			errorMessage = 'Failed to load sadaqahs. Please try again later.';
		} finally {
			isLoading = false;
		}
	}

	// Function to truncate the description text
	function truncateText(text: string, maxLength: number) {
		if (text.length > maxLength) {
			return text.substring(0, maxLength) + '...'; // Return truncated text with ellipsis
		}
		return text; // If text is within the limit, return as is
	}

	// Handle closing the popup
	function handleExit() {
		open = false;
		selectedSadaqah = null;
	}

	// Handle choosing a sadaqah
	function handleChoice(sadaqah: any) {
		selectedSadaqah = sadaqah;
	}

	// Handle going back to the list of sadaqahs
	function handleBack() {
		selectedSadaqah = null;
	}
</script>

{#if open}
	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
	<div class="popup" on:click={handleExit} transition:fade>
		<!-- Inner Content Container -->
		<div class="container" on:click|stopPropagation>
			<!-- If no sadaqah is selected, show list view -->
			{#if !selectedSadaqah}
				<div class="header">
					<h1>Veldedigheter</h1>
					<div class="exit-icon" on:click={handleExit}>
						<XmarkMcc width="20" />
					</div>
				</div>

				{#if isLoading}
					<p>Loading...</p>
				{:else if errorMessage}
					<p class="error">{errorMessage}</p>
				{:else}
					<div class="sadaqah-list" transition:slide>
						{#each sadaqahs as sadaqah}
							<div class="sadaqah-item" on:click={() => handleChoice(sadaqah)}>
								<h2>{sadaqah.tittel}</h2>
								<p>{truncateText(sadaqah.beskrivelse, 124)}</p>
							</div>
						{/each}
					</div>
				{/if}
			{:else}
				<!-- Detailed Sadaqah View -->
				<div class="details-view" transition:slide>
					<div class="back-button" on:click={handleBack}>
						<p>Tilbake</p>
					</div>
					<h1>{selectedSadaqah.tittel}</h1>
					<p><strong>Beskrivelse:</strong> {selectedSadaqah.beskrivelse}</p>
					<p><strong>Vipps:</strong> {selectedSadaqah.vipps}</p>
					<p><strong>Kontonummer:</strong> {selectedSadaqah.kontonummer}</p>
					<p>
						<strong>Link:</strong>
						<a href={selectedSadaqah.link} target="_blank">{selectedSadaqah.link}</a>
					</p>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;

		.container {
			background-color: var(--white);
			border-radius: 15px;
			width: 40%;
			max-width: 600px;
			box-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.3);
			padding: 20px;
			transition: 0.3s ease-in-out;

			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20px;

				h1 {
					font-size: 1.5em;
				}

				.exit-icon {
					cursor: pointer;
				}
			}

			.sadaqah-list {
				display: flex;
				flex-direction: column;
				gap: 10px;

				.sadaqah-item {
					cursor: pointer;
					padding: 10px;
					border-radius: 8px;
					background-color: var(--green-secondary);
					box-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.2);
					transition: transform 0.2s ease;

					&:hover {
						transform: translateY(-3px);
					}

					h2 {
						font-size: 1.25em;
						margin: 0;
					}

					p {
						font-size: 1em;
						color: var(--black);
					}
				}
			}

			.details-view {
				display: flex;
				flex-direction: column;
				gap: 10px;

				.back-button {
					cursor: pointer;
					margin-bottom: 10px;

					p {
						color: var(--green-primary);
						font-weight: bold;
					}
				}

				a {
					color: var(--green-primary);
					text-decoration: underline;
					cursor: pointer;
				}
			}
		}
	}

	.error {
		color: red;
		font-weight: bold;
		text-align: center;
	}
</style>
