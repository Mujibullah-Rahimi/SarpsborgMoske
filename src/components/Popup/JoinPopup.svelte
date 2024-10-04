<script lang="ts">
	import DownloadMcc from '$lib/icons/download-mcc.svelte';
	import { quintOut } from 'svelte/easing';
	import { fade, fly, slide } from 'svelte/transition';
	import MediaQuery from '../MediaQuery.svelte';
	import RightMcc from '$lib/icons/right-mcc.svelte';
	import LeftMcc from '$lib/icons/left-mcc.svelte';
	import XmarkMcc from '$lib/icons/xmark-mcc.svelte';

	export let open = false;
	let choice = 'zero';
	let currentSlide = 1;

	function handleExit() {
		open = false;
		choice = 'zero';
	}

	function handleChoice(newChoice: string) {
		choice = '';
		setTimeout(() => {
			choice = newChoice;
		}, 300);
	}
	function handleBackChoice() {
		choice = '';
		setTimeout(() => {
			choice = 'zero';
			currentSlide = 1;
		}, 300);
	}

	function goToSlide(slideIndex: number) {
		if (slideIndex != currentSlide) {
			currentSlide = 0;
			setTimeout(() => {
				currentSlide = slideIndex;
			}, 300);
		}
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
							<div class="header">
								<div class="title">
									<h1>Bli medlem i MCC – Velkommen til fellesskapet!</h1>
								</div>
								<div class="exit-icon" on:click={handleExit}>
									<XmarkMcc width="20" />
								</div>
							</div>

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

<MediaQuery query="(min-width: 936px) and (max-width: 1056px)" let:matches>
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
							<div class="header">
								<div class="title">
									<h1>Bli medlem i MCC – Velkommen til fellesskapet!</h1>
								</div>
								<div class="exit-icon" on:click={handleExit}>
									<XmarkMcc width="20" />
								</div>
							</div>

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

<MediaQuery query="(max-width: 935px)" let:matches>
	{#if matches}
		{#if open}
			<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
			<div
				class="swipe-popup"
				on:click={handleExit}
				transition:fade={{ delay: 100, duration: 500, easing: quintOut }}
			>
				<div class="container" on:click|stopPropagation>
					{#if choice === 'zero'}
						<div class="header">
							<h1>Bli medlem i MCC – Velkommen til fellesskapet!</h1>
							<div class="exit-icon" on:click={handleExit}>
								<XmarkMcc width="20" />
							</div>
						</div>
						<div class="exitguide" transition:fly={{ x: 150, delay: 0, duration: 300 }}>
							<div class="text">
								<h2><span class="highlight">Viktig informasjon:</span></h2>
								<p>
									Er du allerede medlem i et annet trossamfunn? <br /><br />
									For å bli medlem i MCC må du først melde deg ut fra det trossamfunnet.<br />
									Bruk vedlagt skjema til å melde deg ut.<br /><br />
								</p>
								<ul>
									<li>
										<p>
											Usikker på hvor du er medlem?<br /> Ta kontakt med Brønnøysundregistrene på 75
											00 75 00 for å få informasjon.
										</p>
									</li>
								</ul>
							</div>
							<div class="buttonbox">
								<div class="button">
									<div class="download-icon">
										<DownloadMcc width="20" />
									</div>
									<a href="/assets/Utmeldingsblankett.pdf" download>
										<p>Utmeldingsblankett</p>
									</a>
								</div>
								<div
									class="button"
									on:click={() => {
										handleChoice('one');
									}}
								>
									<p>Meld deg inn!</p>
									<div class="download-icon">
										<RightMcc controlsWidth="12" />
									</div>
								</div>
							</div>
						</div>
					{/if}

					{#if open && choice === 'one'}
						<div class="header">
							<h1>Bli medlem i MCC – Velkommen til fellesskapet!</h1>
							<div class="download-icon" on:click={handleExit}>
								<XmarkMcc width="20" />
							</div>
						</div>
						<div class="joinguide" transition:fly={{ x: 150, delay: 0, duration: 300 }}>
							<h2><span class="highlight">Vil du være en del av vårt fellesskap?</span></h2>
							<p>
								Å melde seg inn i moskeen er enkelt og helt <span class="highlight"
									>kostnadsfritt!</span
								><br />
								Som medlem bidrar du til å styrke vårt arbeid, aktiviteter og samhold, <br />
								samtidig som du får tilgang til viktig informasjon og tjenester fra moskeen.
							</p>
							<div class="exitguide">
								<div class="text">
									<h2>Slik melder du deg inn:</h2>
									<ol>
										<li><p>Skriv ut og fyll ut innmeldingsskjemaet.</p></li>
										<li><p>Lever skjemaet til styret i moskeen for å bekrefte medlemskapet.</p></li>
									</ol>
								</div>

								<div class="buttonbox">
									<div class="button" on:click={handleBackChoice}>
										<div class="download-icon">
											<LeftMcc controlsWidth="12" />
										</div>
										<p>Tilbake</p>
									</div>
									<div class="button">
										<div class="download-icon">
											<DownloadMcc width="20" />
										</div>
										<a href="/assets/Innmeldingsskjema.pdf" download>
											<p>Innmeldingsskjema</p>
										</a>
									</div>
								</div>
							</div>
						</div>
					{/if}
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
				.header {
					display: flex;
					width: 100%;
					justify-content: space-between;
					.title {
						display: flex;
						flex: 1;
						justify-content: center;
						h1 {
							text-align: center;
							color: var(--black);
							font-size: 1.5em;
							margin-bottom: 10px;
						}
					}
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
				.header {
					display: flex;
					width: 100%;
					justify-content: space-between;
					.title {
						display: flex;
						flex: 1;
						justify-content: center;
						h1 {
							text-align: center;
							color: var(--black);
							font-size: 1.25em;
							margin-bottom: 10px;
						}
					}
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

	.swipe-popup {
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
			font-size: 1.15em;
		}
		.highlight {
			color: var(--green-primary);
		}
		.container {
			z-index: 6;
			background-color: var(--white);
			margin: auto;
			width: 80%;
			border-radius: 15px;
			box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.5);
			font-size: 0.9em;
			padding: 10px;
			.header {
				display: flex;
				width: 100%;
				justify-content: space-between;
				h1 {
					text-align: center;
					color: var(--black);
					font-size: 1.25em;
					margin-bottom: 10px;
				}
			}

			.exitguide {
				margin-top: 20px;
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				border-bottom: 1px solid var(--green-primary);
				ul {
					padding-left: 20px;
				}
				.text {
					flex: 2;
				}
				.buttonbox {
					margin: 20px 0;
					flex: 1;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: space-evenly;
					.button {
						margin: 10px 0;
						height: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						background-color: var(--green-secondary);
						border-radius: 5px;
						box-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.5);
						padding: 0px 8px;
						cursor: pointer;
						.download-icon {
							display: flex;
							align-items: end;
						}
						a {
							text-decoration: none;
						}
						p {
							padding: 10px;

							color: var(--black);
							font-size: 1em;
						}
					}
				}
			}

			.joinguide {
				margin-top: 20px;
				padding: 10px;
			}
		}
	}
</style>
