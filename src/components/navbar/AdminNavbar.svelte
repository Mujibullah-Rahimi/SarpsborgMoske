<script>
	import { goto } from '$app/navigation';
	import { logoutUser } from '../../routes/login/auth';
	import ButtonStandard from '../Button/ButtonStandard.svelte';
	import Logo from '../Logo.svelte';
	import MediaQuery from '../MediaQuery.svelte';
	import ConfirmationPopup from '../Popup/ConfirmationPopup.svelte'; // Import the confirmation popup

	let showPopup = false;

	function handleLogOutClick() {
		showPopup = true;
	}

	function handleConfirmLogout() {
		logoutUser();
		goto('/login');
	}

	function handleCancelLogout() {
		showPopup = false;
	}
</script>

<MediaQuery query="(min-width: 936px)" let:matches>
	{#if matches}
		<nav>
			<div class="logo">
				<a href="/"><Logo /></a>
			</div>
			<div class="navbar-menu">
				<ul>
					<li><p><a href="/dashboard">Dashbord</a></p></li>
					<li><p><a href="/dashboard/bønnetider">Bønnetider</a></p></li>
					<li><p><a href="/dashboard/veldedigheter">Veldedigheter</a></p></li>
				</ul>
			</div>
			<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
			<div class="navbar-btn" on:click={handleLogOutClick}>
				<ButtonStandard text="Logg ut" />
			</div>
		</nav>
	{/if}
</MediaQuery>


<ConfirmationPopup open={showPopup} onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;
		max-height: 75px;
		width: 100%;
		padding: 0 10% 0 10%;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.2);
		.navbar-menu {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			ul {
				display: flex;
				justify-content: space-evenly;
				li {
					list-style-type: none;
					transition: 0.25s ease-in-out;
					&:hover {
						transform: translateY(-1px);
					}
					a {
						font-size: 1.25em;
						color: var(--black);
						text-decoration: none;
					}
				}
			}
		}
	}

	.logo {
		cursor: pointer;
	}

	.navbar-btn {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
