<script lang="ts">
	import { authStore } from '$lib/stores/authStore';
	import ButtonPrimary from '../ButtonPrimary.svelte';
	import ButtonStandard from '../ButtonStandard.svelte';
	import Logo from '../Logo.svelte';
	import MediaQuery from '../MediaQuery.svelte';
	import SupportPopup from '../Popup/SupportPopup.svelte';
	import { onDestroy } from 'svelte';

	let opentoggle = false;
	let authData: {
		isLoggedIn: any;
		currentUser: any;
		mccUser: any;
		userToken?: string | null;
		isVerified?: boolean;
	};

	const unsubscribe = authStore.subscribe((data) => {
		authData = data;
	});

	onDestroy(() => {
		unsubscribe();
	});

	function openPopup() {
		opentoggle = true;
	}
</script>

<MediaQuery query="(min-width: 936px)" let:matches>
	{#if matches}
		<nav>
			<SupportPopup bind:open={opentoggle} />
			<div class="logo">
				<a href="/"><Logo /></a>
			</div>
			<div class="navbar-menu">
				<ul>
					<li><p><a href="/#Bønnetabell">Bønnetabell</a></p></li>
					<li><p><a href="/#OmMCC">Om MCC</a></p></li>
					<li><p><a href="/#Kontakt">Kontakt</a></p></li>
				</ul>
			</div>

			{#if authData.isLoggedIn && authData.currentUser}
				<div class="navbar-admin-btn">
					<ButtonStandard
						text='Administrer'
						link={'/dashboard/' + authData.currentUser.id}
					/>
				</div>
			{:else}
				<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
				<div class="navbar-cta" on:click={openPopup}>
					<ButtonPrimary text="Støtt MCC" fontSize="1.25em" height="2em" />
				</div>
			{/if}
		</nav>
	{/if}
</MediaQuery>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;
		max-height: 75px;
		width: 100%;
		padding: 0 10% 0 10%;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
	}

	.logo {
		cursor: pointer;
	}

	.navbar-menu {
		display: flex;
		align-items: center;

		ul {
			display: flex;
			list-style-type: none;

			li {
				margin: 10px;
				cursor: pointer;

				p {
					font-size: 1.25em;

					a {
						text-decoration: none;
						color: var(--black);
					}

					transition: ease-in-out 0.25s;

					&:hover {
						transform: translateY(-1px);
					}
				}
			}
		}
	}

	.navbar-cta,
	.navbar-admin-btn {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
