<script lang="ts">
	import { quintOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import Vipps from '$lib/icons/vipps.svelte';
	import Dnb from '$lib/icons/DNB.svelte';
	import MediaQuery from '../MediaQuery.svelte';

	export let open = false;

	function handleExit() {
		open = false;
	}
</script>

<MediaQuery query="(min-width: 1517px)" let:matches>
	{#if matches}
		{#if open}
			<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
			<div
				class="popup"
				on:click={handleExit}
				transition:fade={{ delay: 100, duration: 500, easing: quintOut }}
			>
				<div class="container" on:click|stopPropagation>
					<div class="text">
						<h1>Støtt moskeen – Bli med og gjør en forskjell!</h1>
						<p>
							Vi er takknemlige for all støtte som hjelper oss med å opprettholde moskeen som et
							trygt og inkluderende samlingssted for fellesskapet. <br /><br />Din støtte bidrar til
							viktige aktiviteter, vedlikehold, og drift av moskeen.<br /><br /> Du kan enkelt støtte
							oss på følgende måter:
						</p>
					</div>

					<div class="choices">
						<div class="dnb">
							<div class="details">
								<h1>Muslim Culture Center</h1>
								<div class="logo">
									<Dnb width="300" />
								</div>
								<h2>0530.422.6031</h2>
							</div>
						</div>
						<div class="vipps">
							<div class="details">
								<h1>Muslim Culture Center</h1>
								<div class="logo">
									<Vipps width="300" />
								</div>
								<h2>#762639</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 1516px)" let:matches>
	{#if matches}
		{#if open}
			<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
			<div
				class="mobile-popup"
				on:click={handleExit}
				transition:fade={{ delay: 100, duration: 500, easing: quintOut }}
			>
				<div class="container" on:click|stopPropagation>
					<div class="text">
						<h1>Støtt moskeen – Bli med og gjør en forskjell!</h1>
						<p>
							Vi er takknemlige for all støtte som hjelper oss med å opprettholde moskeen som et
							trygt og inkluderende samlingssted for fellesskapet. <br /><br />Din støtte bidrar til
							viktige aktiviteter, vedlikehold, og drift av moskeen.<br /><br /> Du kan enkelt støtte
							oss på følgende måter:
						</p>
					</div>

					<div class="choices">
						<div class="dnb">
							<div class="details">
								<h1>Muslim Culture Center</h1>
								<div class="logo">
									<Dnb width="200" />
								</div>
								<h2>0530.422.6031</h2>
							</div>
						</div>
						<div class="vipps">
							<div class="details">
								<h1>Muslim Culture Center</h1>
								<div class="logo">
									<Vipps width="300" />
								</div>
								<h2>#762639</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</MediaQuery>

<style lang="scss">
	.popup {
		height: 100%;
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 5;
		display: flex;
		justify-content: center;
		align-items: center;
		.container {
			z-index: 6;
			background-color: var(--white);
			margin: auto;
			width: 40%;
			border-radius: 15px;
			box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.5);
			.text {
				padding: 10px;
				h1 {
					text-align: center;
					margin-bottom: 20px;
				}
			}
			.choices {
				height: 300px;
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				.dnb {
					display: flex;
					flex: 1;
					justify-content: center;

					color: var(--white);
					background-color: #14555a;
					border-radius: 0 0 0 15px;
					.details {
						display: flex;
						flex-direction: column;
						justify-content: space-evenly;
						align-items: center;
					}
				}
				.vipps {
					display: flex;
					flex: 1;
					justify-content: center;
					color: var(--white);
					background-color: #ff5b24;
					border-radius: 0 0 15px 0;
					.details {
						display: flex;
						flex-direction: column;
						justify-content: space-evenly;
						align-items: center;
					}
				}
			}
		}
	}
	.mobile-popup {
		height: 100%;
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 5;
		display: flex;
		justify-content: center;
		align-items: center;

		.container {
			z-index: 6;
			background-color: var(--white);
			margin: auto;
			width: 80%;
			height: fit-content;
			min-height: 200px; // Ensure a minimum height for the popup
			border-radius: 15px;
			box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.5);
			font-size: 0.9em;

			.text {
				padding: 10px;

				h1 {
					font-size: 1.25em;
					text-align: center;
					margin-bottom: 20px;
				}
			}

			.choices {
				display: flex;
				flex-wrap: wrap; // Allow wrapping
				width: 100%;
				font-size: 0.9em;

				.dnb,
				.vipps {
					display: flex;
					flex: 1;
					justify-content: center;
					align-items: center; // Center the content
					color: var(--white);
					height: auto; // Let the height be auto so it can adjust to the content
				}

				.dnb {
					background-color: #14555a;
					border-radius: 0px;
				}

				.vipps {
					background-color: #ff5b24;
					border-radius: 0 0 15px 15px;
				}

				.details {
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					align-items: center;
				}
			}
		}
	}
</style>
