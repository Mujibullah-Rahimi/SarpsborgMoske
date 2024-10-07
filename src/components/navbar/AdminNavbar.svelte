<script>
	import { goto } from '$app/navigation';
	import { logoutUser } from '../../routes/login/auth';
	import ButtonStandard from '../ButtonStandard.svelte';
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

	.navbar-btn {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
