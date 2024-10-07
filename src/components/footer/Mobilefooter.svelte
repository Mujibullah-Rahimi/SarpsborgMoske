<script>
	import Logo from '../Logo.svelte';
	import FacebookMcc from '$lib/icons/facebook-mcc.svelte';
	import InstagramMcc from '$lib/icons/instagram-mcc.svelte';
	import ButtonSecondary from '../ButtonSecondary.svelte';
	import ButtonPrimary from '../ButtonPrimary.svelte';
	import MediaQuery from '../MediaQuery.svelte';
</script>

<MediaQuery query="(max-width: 935px)" let:matches>
	{#if matches}
		<footer>
			<div class="container">
				<div class="content">
					<div class="bg-logo">
						<Logo width="200" opacity="0.05" />
					</div>
					<div class="logo">
						<Logo width="64" />
						<div class="channels">
							<h3>Følg oss</h3>
							<ul>
								<li>
									<p>
										<FacebookMcc width="16" />
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
										<InstagramMcc width="16" />
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
				</div>

				<!-- <div class="newsletter">
					<div class="text">
						<p>
							Abonner på vårt nyhetsbrev, og hold deg oppdatert på <br /> bønnetider og andre nyheter!
						</p>
					</div>
					<form action="submit">
						<input type="text" class="form-input" name="email" placeholder="Epost" required />

						<ButtonPrimary text="Abonner" />
					</form>
					<div class="disclaimer">
						<p>Ved å abonnere godtår du våre vilker</p>
					</div>
				</div> -->

				<div class="legal">
					<p class="copyright">
						© 2024 Muslim Culture Center. All rights reserved. Org. nr. 980325652
					</p>
					<p class="madeby">
						Levert av <span
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
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		outline: none;
	}
	footer {
		width: 100%;
		height: auto;
		bottom: 0;
		left: 0;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.container {
			min-width: 100%;
			background-color: var(--green-secondary);
			box-shadow: 0 -5px 12px 0 rgb(0, 0, 0, 0.2);

			.content {
				z-index: 2;
				margin: 10px 0;
				width: 100%;
				display: flex;
				justify-content: space-evenly;
				gap: 5%;
				font-size: 0.8em;
				.logo{
					display: flex;
					flex-direction: column;
					justify-content: space-evenly;
					gap: 20%;
				}
				.bg-logo {
					position: absolute;
					z-index: 0;
				}
				.channels {
					position: relative;
					h3 {
						width: 100%;
						text-align: start;
						margin: 0 auto 10px auto;
					}
					ul {
						list-style-type: none;
						li {
							margin-bottom: 10px;
							p {
								display: flex;
								gap: 5px;
								a {
									text-decoration: none;
									color: var(--black);
								}
							}
						}
					}
				}
				.sitemap {
					position: relative;
					h3 {
						width: 100%;
						text-align: end;
						margin: 0 auto 10px auto;
					}
					ul {
						list-style-type: none;
						li {
							margin-bottom: 10px;
							p {
								text-align: end;
								a {
									text-decoration: underline;
									color: var(--black);
								}
							}
						}
					}
				}
			}
			
			.legal {
				display: flex;
				margin-top: 30px;
				flex-direction: column;
				font-size: 0.7em;
				p {
					margin: 5px 15px;
					a {
						color: var(--black);
					}
				}
				.madeby {
					display: flex;
					gap: 5px;
					justify-content: end;
				}
			}
		}
	}
</style>
