<script>
	import GeoAltMcc from '$lib/icons/geo-alt-mcc.svelte';
	import Quranpic from '$lib/images/quran_300.jpg';
	import Charitypic from '$lib/images/veldedighet_300.jpg';
	import Fridaypic from '$lib/images/friday_prayer_300.jpg';
	import ButtonPrimary from '../components/ButtonPrimary.svelte';
	import ButtonSecondary from '../components/ButtonSecondary.svelte';
	import interiorImage from '$lib/images/interior.png';
	import DownloadMcc from '$lib/icons/download-mcc.svelte';
	import Prayertable from '../components/prayertable/Prayertable.svelte';
	import Eventcard from '../components/Eventcard.svelte';
	import Logo from '../components/Logo.svelte';
	import Contactcard from '../components/Contactcard.svelte';
	import MediaQuery from '../components/MediaQuery.svelte';
	import sarpmoske from '$lib/images/sarpsborgmoske.png';
	import Mobileprayertable from '../components/prayertable/Mobileprayertable.svelte';
	const sarpsborgMoske = sarpmoske;
	import Datepicker from '../components/Datepicker.svelte';
	import JoinPopup from '../components/Popup/JoinPopup.svelte';
	import SupportPopup from '../components/Popup/SupportPopup.svelte';
	import Footer from '../components/footer/Footer.svelte';
	import Mobilefooter from '../components/footer/Mobilefooter.svelte';
	import Mobilenavbar from '../components/navbar/Mobilenavbar.svelte';
	import Navbar from '../components/navbar/Navbar.svelte';
	import { goto } from '$app/navigation';

	let openJointoggle = false;
	let openSupportToggle = false;
	function openJoinPopup() {
		openJointoggle = true;
	}
	function openSupportPopup() {
		openSupportToggle = true;
	}
</script>

<svelte:head></svelte:head>
<Navbar />
<Mobilenavbar />
<MediaQuery query="(min-width: 936px)" let:matches>
	{#if matches}
		<body>
			<JoinPopup bind:open={openJointoggle} />
			<SupportPopup bind:open={openSupportToggle} />
			<div class="hero-section" id="Hjem">
				<div class="left">
					<div class="address">
						<div class="geo-icon">
							<GeoAltMcc width="20" />
						</div>
						<div class="address-text">
							<p>
								<a
									href="https://maps.app.goo.gl/3dYziNFCMDHiX2eB8"
									target="_blank"
									rel="noopener noreferrer"
								>
									Håkons gate 2, 1721 Sarpsborg
								</a>
							</p>
						</div>
					</div>
					<div class="title">
						<h1>I Allahs navn, den mest nådige, den mest barmhjertige</h1>
					</div>
					<div class="buttons">
						<div class="contact">
							<ButtonSecondary text="Kontakt" fontSize="1.25em" link="/#Kontakt" />
						</div>
						<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
						<div class="join" on:click={openJoinPopup}>
							<ButtonPrimary text="Bli medlem" fontSize="1.25em" />
						</div>
					</div>
				</div>
				<div class="right">
					<div class="image">
						<img src={interiorImage} alt="interior" />
					</div>
				</div>
			</div>

			<div class="prayertime-section" id="Bønnetabell">
				<Datepicker iconWidth="24" controlsWidth="16" />
				<div class="prayer-table">
					<Prayertable />
				</div>
				<div class="download-prayertimes-container">
					<div class="download-prayertimes">
						<div class="download-icon">
							<DownloadMcc width="20" />
						</div>
						<div class="download-text">
							<p>
								<a href="/assets/bonnetider2024.csv" download> Last ned bønnetabell 2024 </a>
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="about-section" id="OmMCC">
				<div class="about-mcc">
					<div class="background-logo">
						<Logo width="500px" opacity="0.05" />
					</div>
					<div class="title">
						<h1>Muslim Culture Center</h1>
					</div>
					<div class="text-one">
						<p>
							Som første moske i Sarpsborg har vi i MCC tjent samfunnet ved å skape et sted for
							tilbedelse, utdannelse og opplæring og støtte.
						</p>
					</div>
					<div class="text-two">
						<p>
							Vi er dedikerte til å fremme enhet, fremme fred og berike liv gjennom våre ulike
							programmer og initiativer.
						</p>
					</div>
				</div>
				<div class="programmes">
					<div class="programmes-title">
						<h1>Utforsk våre programmer</h1>
						<div class="text">
							<p>
								Velkommen til vår moskè hvor vi tilbyr en rekke programmer og tjenester for å dekke
								vårt muslimske samfunn sine behov, vi strever for å opprette et miljø alle føler seg
								velkomne hos.
							</p>
						</div>
					</div>
					<div class="programmes-events">
						<div class="event">
							<Eventcard
								source={Quranpic}
								altText="Quran undervisning for barn"
								title="Undervisning for barn"
								text="Quranskole for barn over 7år hver helg kl 13-15. 
						  Kombinert med ulike aktiviteter"
							/>
						</div>
						<div class="event">
							<Eventcard
								source={Charitypic}
								altText="Måter du kan gi veldedighet"
								title="Måter du kan gi sadaqah"
								text="Se ulike måter du kan gi veldedighet på, for å nytte deg i dette liv og neste"
							/>
						</div>
						<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
						<div class="event" on:click={()=>{goto("/#Bønnetabell")}}>
							<Eventcard
								source={Fridaypic}
								altText="Fredagsbønn"
								title="Fredagsbønn"
								text="Velkommen til fredagsbønn! Delta i fellesskapet og styrk din tro med viktig påminnelse og felles bønn"
							/>
						</div>
					</div>
				</div>
			</div>

			<div class="membership-section" id="Innmelding">
				<div class="content">
					<div class="title">
						<h1>Bli en del av noe stort – bli med i dag!</h1>
					</div>
					<div class="text">
						<p>
							Bli en del av et inkluderende fellesskap der vi sammen søker kunnskap, fred og
							samhold.
							<br />Her er alle velkomne – uansett bakgrunn,
							<span class="highlight-text">meld deg inn</span> i dag og bidra til et godt miljø for alle!
						</p>
					</div>
				</div>
				<div class="buttons">
					<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
					<div class="support" on:click={openSupportPopup}>
						<ButtonSecondary fontSize="2em" text="Støtt MCC" />
					</div>
					<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
					<div class="join" on:click={openJoinPopup}>
						<ButtonPrimary fontSize="2em" text="Bli medlem" />
					</div>
				</div>
			</div>

			<div class="contact-section" id="Kontakt">
				<div class="contact">
					<div class="title">
						<h1>Kontakt Oss</h1>
					</div>
					<div class="text">
						<p>
							Har du spørsmål eller ønsker mer informasjon? <br />Ta gjerne kontakt med oss – vi er
							her for å hjelpe deg. Sammen bygger vi et inkluderende og støttende fellesskap.
						</p>
					</div>
				</div>
				<div class="channels">
					<div class="channel">
						<Contactcard channel="email" title="Epost" text="" info="kontakt@sarpsborgmoske.com" />
					</div>
					<div class="channel">
						<Contactcard channel="phone" title="Telefon" text="" info="+47 489 25 590" />
					</div>
					<div class="channel">
						<Contactcard
							channel="address"
							title="Adresse"
							text=""
							info="Håkons gate 2, 1712 Sarpsborg"
						/>
					</div>
				</div>
			</div>
		</body>
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 935px)" let:matches>
	{#if matches}
		<body>
			<JoinPopup bind:open={openJointoggle} />
			<SupportPopup bind:open={openSupportToggle} />
			<div class="mobile-container">
				<div class="mobile-herosection" id="Hjem">
					<div class="bg-image">
						<div class="img" style="background-image: url({sarpsborgMoske});"></div>
					</div>

					<div class="content">
						<div class="address">
							<div class="geo-icon">
								<GeoAltMcc width="16" />
							</div>
							<div class="address-text">
								<p>
									<a
										href="https://maps.app.goo.gl/3dYziNFCMDHiX2eB8"
										target="_blank"
										rel="noopener noreferrer"
									>
										Håkons gate 2, 1721 Sarpsborg
									</a>
								</p>
							</div>
						</div>
						<div class="title">
							<h1>I Allahs navn, den mest nådige, den mest barmhjertige</h1>
						</div>
						<div class="buttons">
							<div class="contact">
								<ButtonSecondary text="Kontakt" fontSize="1em" link="/#Kontakt" />
							</div>
							<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
							<div class="join" on:click={openJoinPopup}>
								<ButtonPrimary text="Bli medlem" fontSize="1em" />
							</div>
						</div>
					</div>
				</div>

				<div class="mobile-prayertime-section" id="Bønnetabell">
					<div class="date-container">
						<div class="date">
							<Datepicker iconWidth="24" controlsWidth="16" />
						</div>

						<div class="prayer-table">
							<Mobileprayertable />
						</div>
						<div class="download-prayertimes-container">
							<div class="download-prayertimes">
								<div class="download-icon">
									<DownloadMcc width="16" />
								</div>
								<div class="download-text">
									<p>
										<a href="/assets/bonnetider2024.csv" download> Last ned bønnetabell 2024 </a>
									</p>
								</div>
							</div>
						</div>
					</div>

					<div class="mobile-about-section" id="OmMCC">
						<div class="about-mcc">
							<div class="background-logo">
								<Logo width="350px" opacity="0.05" />
							</div>
							<div class="title">
								<h1>Muslim Culture Center</h1>
							</div>
							<div class="text-one">
								<p>
									Som første moske i Sarpsborg har vi i MCC tjent samfunnet ved å skape et sted for
									tilbedelse, utdannelse og opplæring og støtte.
								</p>
							</div>
							<div class="text-two">
								<p>
									Vi er dedikerte til å fremme enhet, fremme fred og berike liv gjennom våre ulike
									programmer og initiativer.
								</p>
							</div>
						</div>
						<div class="programmes">
							<div class="programmes-title">
								<h1>Utforsk våre programmer</h1>
								<div class="text">
									<p>
										Velkommen til vår moskè hvor vi tilbyr en rekke programmer og tjenester for å
										dekke vårt muslimske samfunn sine behov, vi strever for å opprette et miljø alle
										føler seg velkomne hos.
									</p>
								</div>
							</div>
							<div class="programmes-events">
								<div class="event">
									<Eventcard
										source={Quranpic}
										altText="Quran undervisning for barn"
										title="Undervisning for barn"
										text="Quranskole for barn over 7år hver helg kl 13-15. 
							  Kombinert med ulike aktiviteter"
									/>
								</div>
								<div class="event">
									<Eventcard
										source={Charitypic}
										altText="Måter du kan gi veldedighet"
										title="Måter du kan gi sadaqah"
										text="Se ulike måter du kan gi veldedighet på, for å nytte deg i dette liv og neste"
									/>
								</div>
								<div class="event">
									<Eventcard
										source={Fridaypic}
										altText="Fredagsbønn"
										title="Fredagsbønn"
										text="Velkommen til fredagsbønn! Delta i fellesskapet og styrk din tro med viktig påminnelse og felles bønn"
									/>
								</div>
							</div>
						</div>
					</div>

					<div class="mobile-membership-section" id="Innmelding">
						<div class="content">
							<div class="title">
								<h1>Bli en del av noe stort – bli med i dag!</h1>
							</div>
							<div class="text">
								<p>
									Bli en del av et inkluderende fellesskap der vi sammen søker kunnskap, fred og
									samhold.
									<br />Her er alle velkomne – uansett bakgrunn,
									<span class="highlight-text">meld deg inn</span> i dag og bidra til et godt miljø for
									alle!
								</p>
							</div>
						</div>
						<div class="buttons">
							<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
							<div class="support" on:click={openSupportPopup}>
								<ButtonSecondary fontSize="1em" text="Støtt MCC" />
							</div>
							<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
							<div class="join" on:click={openJoinPopup}>
								<ButtonPrimary fontSize="1em" text="Bli medlem" />
							</div>
						</div>
					</div>

					<div class="mobile-contact-section" id="Kontakt">
						<div class="contact">
							<div class="title">
								<h1>Kontakt Oss</h1>
							</div>
							<div class="text">
								<p>
									Har du spørsmål eller ønsker mer informasjon? <br />Ta gjerne kontakt med oss – vi
									er her for å hjelpe deg. Sammen bygger vi et inkluderende og støttende fellesskap.
								</p>
							</div>
						</div>
						<div class="channels">
							<div class="channel">
								<Contactcard
									channel="email"
									title="Epost"
									text=""
									info="kontakt@sarpsborgmoske.com"
								/>
							</div>
							<div class="channel">
								<Contactcard channel="phone" title="Telefon" text="" info="+47 489 25 590" />
							</div>
							<div class="channel">
								<Contactcard
									channel="address"
									title="Adresse"
									text=""
									info="Håkons gate 2, 1712 Sarpsborg"
								/>
							</div>
						</div>
					</div>
				</div>
			</div></body
		>
	{/if}
</MediaQuery>

<footer>
	<Footer />
	<Mobilefooter />
</footer>

<style lang="scss">
	body {
		overflow-x: clip;
		a {
			text-decoration: none;
			color: var(--black);
		}
		.highlight-text {
			font-weight: 600;
			color: var(--green-primary);
		}
		.hero-section {
			display: flex;
			height: 50vh;
			width: 80%;
			margin: auto;

			.left {
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				.address {
					background-color: var(--green-secondary);
					width: fit-content;
					padding: 8px 10px 5px 8px;
					border-radius: 8px;
					display: flex;
					justify-content: center;
					box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
					transition: ease-in-out 0.25s;
					&:hover {
						transform: translateY(-3px);
						box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3);
					}
					.geo-icon {
						margin-right: 5px;
					}
					.address-text {
						font-size: 0.9em;
						display: flex;
						align-items: start;
					}
				}
				.title {
					font-size: 1.25em;
					width: 60ch;
					h1 {
						font-weight: 300;
					}
				}
				.buttons {
					display: flex;
					justify-content: end;
					padding-right: 25%;
					gap: 50px;
				}
			}
			.right {
				.image {
					img {
						overflow-x: clip;
						z-index: 0;
					}
				}
			}
		}

		.prayertime-section {
			width: 80%;
			margin: auto;
			margin-top: 80px;
			scroll-margin-top: 70px;
			.date {
				background-color: var(--green-secondary);
				width: fit-content;
				padding: 8px 10px 5px 8px;
				border-radius: 8px;
				display: flex;
				justify-content: center;
				box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
				.calendar-icon {
					margin-right: 5px;
				}
				.date-text {
					font-size: 0.9em;
					display: flex;
					align-items: start;
				}
			}

			.download-prayertimes-container {
				display: flex;
				justify-content: end;
				.download-prayertimes {
					background-color: var(--green-secondary);
					width: fit-content;
					padding: 8px 10px 5px 8px;
					border-radius: 8px;
					display: flex;
					justify-content: center;
					box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
					transition: ease-in-out 0.25s;
					&:hover {
						transform: translateY(-3px);
						box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3);
					}
					.download-icon {
						margin-right: 5px;
					}
					.download-text {
						font-size: 0.9em;
						display: flex;
						align-items: start;
					}
				}
			}
		}

		.about-section {
			width: 80%;
			margin: auto;
			margin-top: 200px;
			scroll-margin-top: 70px;
			.about-mcc {
				position: relative;
				height: 300px;
				.background-logo {
					z-index: 0;
					position: absolute;
					left: 50%;
					margin-top: -200px;
					margin-left: -250px;
				}
				.title {
					h1 {
						margin-left: 5%;
						font-weight: 400;
					}
				}
				.text-one {
					width: 100%;
					margin-top: 25px;
					position: relative;
					p {
						width: 60ch;
						margin-left: 20%;
						background-color: rgb(254, 254, 253, 0.3);
					}
				}
				.text-two {
					width: 100%;
					margin-top: 25px;
					position: relative;

					p {
						background-color: rgb(254, 254, 253, 0.3);
						width: 60ch;
						margin-left: 40%;
					}
				}
			}
			.programmes {
				position: relative;
				display: flex;
				width: 80%;
				margin: auto;
				margin-top: 60px;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.programmes-title {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					h1 {
						font-weight: 400;
					}
					.text {
						width: 70ch;
						text-align: center;
						background-color: rgb(254, 254, 253, 0.3);
						p {
							font-weight: 400;
						}
					}
				}
				.programmes-events {
					margin-top: 50px;
					display: flex;
					gap: 5%;
					.event {
						width: 33%;
						cursor: pointer;
					}
				}
			}
		}
		.membership-section {
			margin: 200px auto 200px auto;
			scroll-margin-top: 70px;
			width: 80%;
			display: flex;
			.content {
				width: 60%;
				.title {
					h1 {
						font-weight: 600;
					}
				}
				.text {
					width: 70ch;
				}
			}
			.buttons {
				width: 40%;
				display: flex;
				justify-content: space-evenly;
			}
		}

		.contact-section {
			width: 80%;
			margin: 50px auto 150px auto;
			scroll-margin-top: 70px;
			display: flex;
			flex-direction: column;
			.contact {
				margin: 0px auto 50px auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				.title {
					h1 {
						font-weight: 400;
					}
				}
				.text {
					margin-top: 10px;
					text-align: center;
					width: 90ch;
				}
			}
			.channels {
				width: 80%;
				margin: auto;
				display: flex;
				gap: 5%;
				.channel {
					width: 33%;
				}
			}
		}
	}

	//------------ CSS FOR MOBILE ------------//
	.mobile-container {
		margin-top: 70px;
		.mobile-herosection {
			.bg-image {
				height: 400px;
				.img {
					width: 100%;
					height: 100%;
					background-position: center center;
					background-size: cover;
					background-repeat: no-repeat;
					border-radius: 0 0 100vw 100vw;
					filter: blur(2px);
				}
			}
			.content {
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				gap: 20px;
				position: absolute;
				top: 420px;
				.address {
					margin-left: 5%;
					background-color: var(--green-secondary);
					width: fit-content;
					padding: 8px 10px 5px 8px;
					border-radius: 8px;
					display: flex;
					justify-content: center;
					box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
					.geo-icon {
						margin-right: 5px;
					}
					.address-text {
						font-size: 0.7em;
						display: flex;
						align-items: start;
					}
				}
				.title {
					font-size: 0.7em;
					width: 100%;
					text-align: center;
					padding: 0px 20px;
					h1 {
						font-weight: 300;
					}
				}
				.buttons {
					display: flex;
					justify-content: center;
					gap: 25px;
				}
			}
		}
		.mobile-prayertime-section {
			margin: 200px 0 0 0;
			.date-container {
				width: 90vw;
				display: flex;
				flex-direction: column;
				margin: auto;
				margin-bottom: 20px;
				.date {
					background-color: var(--green-secondary);
					width: 80%;
					margin: auto;
					margin-bottom: 10px;
					padding: 8px 10px 5px 8px;
					border-radius: 8px;
					display: flex;
					justify-content: center;
					box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
					.calendar-icon {
						margin-right: 5px;
					}
					.date-text {
						font-size: 0.7em;
						display: flex;
						align-items: start;
					}
				}
			}

			.download-prayertimes-container {
				width: 90vw;
				margin: auto;
				margin-top: 20px;
				display: flex;
				justify-content: end;
				.download-prayertimes {
					background-color: var(--green-secondary);
					width: fit-content;
					padding: 8px 10px 5px 8px;
					border-radius: 8px;
					display: flex;
					justify-content: center;
					box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
					.download-icon {
						margin-right: 5px;
					}
					.download-text {
						font-size: 0.7em;
						display: flex;
						align-items: start;
					}
				}
			}
		}

		.mobile-about-section {
			margin: auto;
			margin-top: 100px;
			scroll-margin-top: 70px;
			.about-mcc {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: center;
				.background-logo {
					z-index: 0;
					position: absolute;
					left: 50%;
					margin-top: -100px;
					margin-left: -175px;
				}
				.title {
					h1 {
						font-size: 1.5em;
						font-weight: 400;
					}
				}
				.text-one {
					width: 80%;
					margin-top: 25px;
					position: relative;
					p {
						font-size: 0.9em;
						background-color: rgb(254, 254, 253, 0.3);
					}
				}
				.text-two {
					width: 80%;
					margin-top: 25px;
					position: relative;

					p {
						text-align: center;
						font-size: 0.9em;
						background-color: rgb(254, 254, 253, 0.3);
					}
				}
			}
			.programmes {
				position: relative;
				display: flex;
				margin-top: 60px;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.programmes-title {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					h1 {
						font-size: 1.5em;
						font-weight: 400;
					}
					.text {
						width: 80%;
						text-align: center;
						background-color: rgb(254, 254, 253, 0.3);
						p {
							font-size: 0.9em;
							// font-weight: 300;
						}
					}
				}
				.programmes-events {
					margin-top: 20px;
					display: flex;
					flex-direction: column;
					gap: 5%;
					.event {
						flex: 1;
					}
				}
			}
		}

		.mobile-membership-section {
			margin: 100px auto 100px auto;
			scroll-margin-top: 70px;
			width: 100%;
			display: flex;
			flex-direction: column;
			.content {
				width: 80%;
				margin: 20px auto;
				.title {
					h1 {
						text-align: center;
						font-weight: 600;
						font-size: 1.5em;
					}
				}
				.text {
					width: 100%;
				}
			}
			.buttons {
				display: flex;
				justify-content: space-evenly;
			}
		}

		.mobile-contact-section {
			width: 90%;
			margin: 50px auto 100px auto;
			scroll-margin-top: 70px;
			display: flex;
			flex-direction: column;
			.contact {
				margin: 0px auto 50px auto;
				display: flex;
				flex-direction: column;
				align-items: center;
				.title {
					h1 {
						font-size: 1.5em;
						font-weight: 400;
					}
				}
				.text {
					margin-top: 10px;
					text-align: center;
				}
			}
			.channels {
				width: 100%;
				margin: auto;
				display: flex;
				flex-direction: column;
				gap: 30px;
				.channel {
					flex: 1;
				}
			}
		}
	}

	footer {
		left: 0;
		position: absolute;
		width: 100%;
	}
</style>
