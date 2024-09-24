<script lang="ts">
	import TelephoneMcc from '$lib/icons/telephone-mcc.svelte';
	import EnvelopeMcc from '$lib/icons/envelope-mcc.svelte';
	import GeoAltMcc from '$lib/icons/geo-alt-mcc.svelte';

	export let channel = '';
	export let title = 'Title goes here';
	export let text = 'Lorem ipsum dolor set';
	export let info = '';
</script>

<div class="card">
	<div class="inner-card">
		<div class="icon">
			{#if channel === 'phone'}
				<TelephoneMcc width="100" />
			{:else if channel === 'email'}
				<EnvelopeMcc width="100" />
			{:else if channel === 'address'}
				<GeoAltMcc width="100" />
			{:else}
				<div class="empty"></div>
			{/if}
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
			<div class="info">
				<!-- change to if statement with a tags -->

				{#if channel === 'phone'}
					<p>
						Trenger du rask hjelp eller har noe på hjertet? Vi er bare en telefonsamtale unna – ta
						kontakt for en prat.
					</p>
					<p>
						<a href="tel:{info}">{info}</a>
					</p>
				{:else if channel === 'email'}
					<p>
						Har du spørsmål eller ønsker mer informasjon? Send oss en e-post, så svarer vi deg så
						raskt som mulig.
					</p>
					<p>
						<a href="mailto: {info}">{info}</a>
					</p>
				{:else if channel === 'address'}
					<p>
						Kom gjerne innom vår moské for en samtale eller omvisning. Vi gleder oss til å ønske deg
						velkommen!
					</p>
					<p>
						<a
							href="https://maps.app.goo.gl/3dYziNFCMDHiX2eB8"
							target="_blank"
							rel="noopener noreferrer"
							>{info}
						</a>
					</p>
				{:else}
					<div class="empty"></div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.card {
		height: 500px;
		padding: 15px;
		box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
		border-radius: 15px;
		background-color: var(--white);
		.inner-card {
			height: 100%;
			padding: 10px;
			display: flex;
			flex-direction: column;
			box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
			border-radius: 15px;
			.icon {
				margin: 0;
				padding: 0;
				// box-shadow: 5px 0px 12px 0 rgb(0, 0, 0, 0.2);
				overflow-y: hidden;
				height: 150%;
				border-radius: 15px 15px 0 0;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.content {
				height: 100%;
				padding: 10px;
				border-radius: 0 0 15px 15px;
				// box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title {
					display: flex;
					justify-content: center;
					h1 {
						font-weight: 300;
					}
				}
				.text {
					p {
						font-weight: 300;
					}
				}
				.info {
					text-align: center;
					color: var(--black);
					p {
						margin: 10px auto 10px auto;
						font-weight: 300;
						font-size: 0.9em;
					}
					a {
						font-weight: 400;
						text-decoration: underline;
						color: var(--black);
						background-color: var(--green-secondary);
						width: fit-content;
						padding: 8px 10px 5px 8px;
						border-radius: 8px;
						display: flex;
						margin: auto;
						justify-content: center;
						box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
						transition: ease-in-out 0.25s;
						&:hover {
							transform: translateY(-3px);
							box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.3);
						}
					}
				}
			}
		}
	}
</style>
