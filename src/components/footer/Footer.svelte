<script>
	import FacebookMcc from '$lib/icons/facebook-mcc.svelte';
	import InstagramMcc from '$lib/icons/instagram-mcc.svelte';
	import ButtonSecondary from '../ButtonSecondary.svelte';
	import Logo from '../Logo.svelte';
	import MediaQuery from '../MediaQuery.svelte';
</script>

<svelte:head></svelte:head>

<MediaQuery query="(min-width: 936px)" let:matches>
	{#if matches}
		<footer>
			<div class="container">
				<div class="left">
					<div class="biglogo">
						<Logo width="265" opacity="0.05" />
					</div>
					<div class="small-logo">
						<Logo />
					</div>

					<div class="newsletter">
						<div class="cta-text">
							<p>
								Abonner på vårt nyhetsbrev, og hold deg oppdatert på <br /> bønnetider og andre nyheter!
							</p>
						</div>
						<form action="submit">
							<input type="text" class="form-input" name="email" placeholder="Epost" required />

							<ButtonSecondary text="Abonner" />
						</form>
						<div class="disclaimer">
							<p>Ved å abonnere godtår du våre vilker</p>
						</div>
					</div>
				</div>

				<div class="right">
					<div class="sitemap">
						<h3>Sitemap</h3>
						<ul>
							<li><p><a href="/#top">Tilbake til toppen</a></p></li>
							<li><p><a href="/#Bønnetabell">Bønnetider</a></p></li>
							<li><p><a href="/#Innmelding">Innmelding</a></p></li>
							<li><p><a href="/#OmMCC">Programmer</a></p></li>
							<li><p><a href="/#Kontakt">Kontakt</a></p></li>
							<li><p><a href="/#bottom">Nyhetsbrev</a></p></li>
						</ul>
					</div>
					<div class="channels">
						<h3>Følg oss</h3>
						<ul>
							<li>
								<p>
									<FacebookMcc width="24" />
									<a
										href="https://www.facebook.com/profile.php?id=61557985585676&locale=nb_NO"
										target="_blank"
										rel="noopener noreferrer"
									>
										Facebook</a
									>
								</p>
							</li>
							<li>
								<p>
									<InstagramMcc width="24" />
									<a
										href="https://www.instagram.com/rahimisolutions/"
										target="_blank"
										rel="noopener noreferrer"
									>
										Instagram
									</a>
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="outside">
				<div class="outside-left">
					<p class="copyright">
						© 2024 Muslim Culture Center. All rights reserved. Org. nr. 980325652
					</p>
				</div>
				<div class="outside-right">
					<p class="privacypolicy">Personvern</p>
					<p class="madeby">
						Made by <span
							><a href="https://www.rahimisolutions.com/" target="_blank" rel="noopener noreferrer"
								>Rahimi Solutions</a
							></span
						>
					</p>
				</div>
			</div>
		</footer>
	{/if}
</MediaQuery>

<style lang="scss">
	footer {
		position: relative;
		bottom: 0;
		margin-top: 50px;
		margin-bottom: 20px;
		width: 100%;
		display: flex;
		flex-direction: column;

		.container {
			width: 80%;
			height: 300px;
			box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.2);
			display: flex;
			margin: auto;
			margin-bottom: 10px;
			border-radius: 15px;
			padding: 20px;
		}

		.biglogo {
			position: absolute;
			left: 250px;
			top: 0;
		}
		.left,
		.right {
			width: 50%;
			display: flex;
		}
		.left {
			flex-direction: column;
			.newsletter {
				margin-top: 20px;
				display: flex;
				flex-direction: column;
				height: 100%;
				justify-content: space-evenly;
				.form-input {
					background-color: var(--white);
					border-radius: 5px;
					height: 2.5em;
					width: 30ch;
					font-size: 1em;
					box-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.2);
					border: none;
					position: relative;
					padding: 0 5px 0 5px;
					margin-right: 15px;
				}

				.cta-text {
					font-size: 1em;
				}
				.disclaimer {
					opacity: 0.8;
					font-size: 0.8em;
				}
			}
		}

		.right {
			display: flex;
			justify-content: space-evenly;
			.sitemap {
				h3 {
					width: 100%;
					text-align: center;
					margin: 0 auto 10px auto;
				}
				ul {
					list-style-type: none;
					li {
						margin-bottom: 8px;
						p {
							transition: ease-in-out 0.25s;
							&:hover {
								transform: translateY(-1px);
							}
							a {
								text-decoration: none;
								color: var(--black);
							}
						}
					}
				}
			}

			.channels {
				h3 {
					width: 100%;
					text-align: center;
					margin: 0 auto 10px auto;
				}
				ul {
					list-style-type: none;
					li {
						margin-bottom: 8px;
						p {
							display: flex;
							gap: 5px;
							transition: ease-in-out 0.25s;
							&:hover {
								transform: translateY(-1px);
							}
							a {
								text-decoration: none;
								color: var(--black);
							}
						}
					}
				}
			}
		}
	}

	.outside {
		width: 80%;
		margin: auto;
		display: flex;
		font-size: 0.8em;
		.outside-left,
		.outside-right {
			width: 50%;
		}
		.outside-right {
			display: flex;
			justify-content: right;
			p {
				margin: 0 10px 10px 10px;
			}
		}
	}
</style>
