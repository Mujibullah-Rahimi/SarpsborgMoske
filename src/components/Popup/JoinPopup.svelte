<script lang="ts">
	import DownloadMcc from '$lib/icons/download-mcc.svelte';
	import { quintOut } from 'svelte/easing';
	import { fade, slide } from 'svelte/transition';
	import MediaQuery from '../MediaQuery.svelte';

	export let open = false;

	function handleExit() {
		open = false;
	}
</script>

<MediaQuery query="(min-width: 1057px)" let:matches>
	{#if matches}
		{#if open}
			<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
			<div
				class="popup"
				on:click={handleExit}
				transition:fade={{ delay: 100, duration: 500, easing: quintOut }}
			>
				<div class="container" on:click|stopPropagation>
					<div class="join">
						<div class="text">
							<h1>Bli medlem i MCC – Velkommen til fellesskapet!</h1>

							<h2>Vil du være en del av vårt fellesskap?</h2>
							<p>
								Å melde seg inn i moskeen er enkelt og helt <span class="highlight"
									>kostnadsfritt!</span
								><br />
								Som medlem bidrar du til å styrke vårt arbeid, aktiviteter og samhold, <br />
								samtidig som du får tilgang til viktig informasjon og tjenester fra moskeen.
							</p>
							<div class="joinguide">
								<div class="text">
									<h2>Slik melder du deg inn:</h2>
									<ol>
										<li><p>Skriv ut og fyll ut innmeldingsskjemaet.</p></li>
										<li><p>Lever skjemaet til styret i moskeen for å bekrefte medlemskapet.</p></li>
									</ol>
								</div>
								<div class="buttonbox">
									<div class="button">
										<div class="download-icon">
											<DownloadMcc width="24" />
										</div>
										<a href="/assets/Innmeldingsskjema.pdf" download> <p>Innmeldingsskjema</p> </a>
									</div>
								</div>
							</div>
							<div class="exitguide">
								<div class="text">
									<h2>Viktig informasjon:</h2>
									<p>
										Er du allerede medlem i et annet trossamfunn? <br /><br />
										For å bli medlem i MCC må du først melde deg ut fra det trossamfunnet.<br />
										Bruk vedlagt skjema til å melde deg ut.<br /><br />
									</p>
									<ul>
										<li>
											<p>
												Er du usikker på hvor du er medlem?<br /> Ta kontakt med Brønnøysundregistrene
												på 75 00 75 00 for å få informasjon.
											</p>
										</li>
									</ul>
								</div>
								<div class="buttonbox">
									<div class="button">
										<div class="download-icon">
											<DownloadMcc width="24" />
										</div>
										<a href="/assets/Utmeldingsblankett.pdf" download>
											<p>Utmeldingsblankett</p>
										</a>
									</div>
								</div>
							</div>
							<h1 class="welcome">Vi gleder oss til å ønske deg velkommen som medlem!</h1>
						</div>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 1056px)" let:matches>
	{#if matches}
	{#if open}
			<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
			<div
				class="mobile-popup"
				on:click={handleExit}
				transition:fade={{ delay: 100, duration: 500, easing: quintOut }}
			>
				<div class="container" on:click|stopPropagation>
					<div class="join">
						<div class="text">
							<h1>Bli medlem i MCC – Velkommen til fellesskapet!</h1>

							<h2>Vil du være en del av vårt fellesskap?</h2>
							<p>
								Å melde seg inn i moskeen er enkelt og helt <span class="highlight"
									>kostnadsfritt!</span
								><br />
								Som medlem bidrar du til å styrke vårt arbeid, aktiviteter og samhold, <br />
								samtidig som du får tilgang til viktig informasjon og tjenester fra moskeen.
							</p>
							<div class="joinguide">
								<div class="text">
									<h2>Slik melder du deg inn:</h2>
									<ol>
										<li><p>Skriv ut og fyll ut innmeldingsskjemaet.</p></li>
										<li><p>Lever skjemaet til styret i moskeen for å bekrefte medlemskapet.</p></li>
									</ol>
								</div>
								<div class="buttonbox">
									<div class="button">
										<div class="download-icon">
											<DownloadMcc width="24" />
										</div>
										<a href="/assets/Innmeldingsskjema.pdf" download> <p>Innmeldingsskjema</p> </a>
									</div>
								</div>
							</div>
							<div class="exitguide">
								<div class="text">
									<h2>Viktig informasjon:</h2>
									<p>
										Er du allerede medlem i et annet trossamfunn? <br /><br />
										For å bli medlem i MCC må du først melde deg ut fra det trossamfunnet.<br />
										Bruk vedlagt skjema til å melde deg ut.<br /><br />
									</p>
									<ul>
										<li>
											<p>
												Er du usikker på hvor du er medlem?<br /> Ta kontakt med Brønnøysundregistrene
												på 75 00 75 00 for å få informasjon.
											</p>
										</li>
									</ul>
								</div>
								<div class="buttonbox">
									<div class="button">
										<div class="download-icon">
											<DownloadMcc width="24" />
										</div>
										<a href="/assets/Utmeldingsblankett.pdf" download>
											<p>Utmeldingsblankett</p>
										</a>
									</div>
								</div>
							</div>
							<h1 class="welcome">Vi gleder oss til å ønske deg velkommen som medlem!</h1>
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
		h2 {
			font-size: 1.25em;
		}

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
					color: var(--black);
					font-size: 1.5em;
					margin-bottom: 20px;
				}
				.highlight {
					color: var(--green-primary);
				}
				.welcome {
					text-align: center;
					color: var(--black);
					font-size: 1.25em;
					margin: 20px;
				}
				.joinguide {
					margin-top: 20px;
					display: flex;
					flex-wrap: wrap;
					border-bottom: 1px solid var(--green-primary);
					ol {
						padding-left: 20px;
					}
					.text {
						flex: 2;
					}
					.buttonbox {
						margin-bottom: 20px;
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						.button {
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: var(--green-secondary);
							border-radius: 5px;
							box-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.5);
							padding: 0px 8px;
							cursor: pointer;
							transition: ease-in-out 0.25s;
							&:hover {
								transform: translateY(-3px);
								box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3);
							}
							a {
								padding: 10px;
								text-decoration: none;
								color: var(--black);
								font-size: 1.15em;
							}
						}
					}
				}
				.exitguide {
					margin-top: 20px;
					display: flex;
					flex-wrap: wrap;
					border-bottom: 1px solid var(--green-primary);
					ul {
						padding-left: 20px;
					}
					.text {
						flex: 2;
					}
					.buttonbox {
						margin-bottom: 20px;
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						.button {
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: var(--green-secondary);
							border-radius: 5px;
							box-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.5);
							padding: 0px 8px;
							cursor: pointer;
							transition: ease-in-out 0.25s;
							&:hover {
								transform: translateY(-3px);
								box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3);
							}
							a {
								padding: 10px;
								text-decoration: none;
								color: var(--black);
								font-size: 1.15em;
							}
						}
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
		h2 {
			font-size: 1em;
		}

		.container {
			z-index: 6;
			background-color: var(--white);
			margin: auto;
			width: 80%;
			border-radius: 15px;
			box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.5);
			font-size: 0.9em;
			.text {
				padding: 10px;
				h1 {
					text-align: center;
					color: var(--black);
					font-size: 1.25em;
					margin-bottom: 20px;
				}
				.highlight {
					color: var(--green-primary);
				}
				.welcome {
					text-align: center;
					color: var(--black);
					font-size: 1.25em;
					margin: 20px;
				}
				.joinguide {
					margin-top: 20px;
					display: flex;
					flex-wrap: wrap;
					border-bottom: 1px solid var(--green-primary);
					ol {
						padding-left: 20px;
					}
					.text {
						flex: 2;
					}
					.buttonbox {
						margin-bottom: 20px;
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						.button {
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: var(--green-secondary);
							border-radius: 5px;
							box-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.5);
							padding: 0px 8px;
							cursor: pointer;
							transition: ease-in-out 0.25s;
							&:hover {
								transform: translateY(-3px);
								box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3);
							}
							a {
								padding: 10px;
								text-decoration: none;
								color: var(--black);
								font-size: 1.15em;
							}
						}
					}
				}
				.exitguide {
					margin-top: 20px;
					display: flex;
					flex-wrap: wrap;
					border-bottom: 1px solid var(--green-primary);
					ul {
						padding-left: 20px;
					}
					.text {
						flex: 2;
					}
					.buttonbox {
						margin-bottom: 20px;
						flex: 1;
						display: flex;
						align-items: center;
						justify-content: center;
						.button {
							display: flex;
							justify-content: center;
							align-items: center;
							background-color: var(--green-secondary);
							border-radius: 5px;
							box-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.5);
							padding: 0px 8px;
							cursor: pointer;
							transition: ease-in-out 0.25s;
							&:hover {
								transform: translateY(-3px);
								box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3);
							}
							a {
								padding: 10px;
								text-decoration: none;
								color: var(--black);
								font-size: 1.15em;
							}
						}
					}
				}
			}
		}
	}
</style>
