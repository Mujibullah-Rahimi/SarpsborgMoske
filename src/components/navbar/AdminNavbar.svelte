<script>
	import { goto } from '$app/navigation';
	import { logoutUser } from '../../routes/(admin)/login/auth';
	import ButtonStandard from '../ButtonStandard.svelte';
	import Logo from '../Logo.svelte';
	import MediaQuery from '../MediaQuery.svelte';
	import ConfirmationPopup from '../Popup/ConfirmationPopup.svelte'; // Import the confirmation popup

	let showPopup = false;

	function handleLogOutClick() {
		// Open the popup when user clicks "Logg ut"
		showPopup = true;
	}

	function handleConfirmLogout() {
		// This function will be called when the user confirms logout
		logoutUser();
		goto('/login');
	}

	function handleCancelLogout() {
		// This function will be called when the user cancels logout
		showPopup = false;
	}
</script>

<MediaQuery query="(min-width: 936px)" let:matches>
	{#if matches}
		<nav>
			<div class="logo">
				<a href="/"><Logo /></a>
			</div>
			<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
			<div class="navbar-btn" on:click={handleLogOutClick}>
				<ButtonStandard text="Logg ut" />
			</div>
		</nav>
	{/if}
</MediaQuery>
<MediaQuery query="(max-width: 935px)" let:matches>
	{#if matches}
		<nav>
			<div class="logo">
				<a href="/"><Logo /></a>
			</div>
			<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
			<div class="navbar-btn" on:click={handleLogOutClick}>
				<ButtonStandard text="Logg ut" />
			</div>
		</nav>
	{/if}
</MediaQuery>

<!-- Include the confirmation popup and pass the required functions -->
<ConfirmationPopup open={showPopup} onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />

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
	.navbar-btn {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
