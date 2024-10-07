<script lang="ts">
	import type { Unsubscriber } from 'svelte/store';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import LeftMcc from '$lib/icons/left-mcc.svelte';

	let email = '';
	let password = '';
	let errorMessage = '';
	let isLoading = false;

	let unsubscribe: Unsubscriber;

	onMount(() => {
		// unsubscribe = authStore.subscribe(($authStore) => {
		// 	if ($authStore.isLoggedIn && $authStore.currentUser) {
		// 		// Redirect to the dashboard with the user ID if already logged in
		// 		goto('/dashboard/' + $authStore.currentUser.uid);
		// 	}
		// });

		// return () => unsubscribe(); // Clean up the subscription
	});

	async function handleLogin() {
		isLoading = true;
		errorMessage = '';
		// await loginUser(email, password);
		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}
</script>

<div class="login-container">
	<div class="login-box">
		<div class="header">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="home-btn tooltip" on:click={()=>{goto('/')}}>
				<span class="tooltiptext"><p>Tilbake til nettsiden</p></span>
				<LeftMcc controlsWidth="20" />
			</div>
			<h1>Logg inn</h1>
		</div>

		{#if errorMessage}
			<p class="error">{errorMessage}</p>
		{/if}

		<form on:submit|preventDefault={handleLogin}>
			<input type="email" bind:value={email} placeholder="Epost" required autocomplete="email" />
			<input
				type="password"
				bind:value={password}
				placeholder="Passord"
				required
				autocomplete="current-password"
			/>
			<button type="submit" disabled={isLoading}><p>Logg inn</p></button>
		</form>

		{#if isLoading}
			<p>Logger inn...</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.login-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: var(--green-secondary);
	}

	.login-box {
		background-color: var(--white);
		padding: 2rem;
		border-radius: 15px;
		box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.2);
		max-width: 400px;
		width: 100%;
		text-align: center;

		.header {
			display: flex;
			margin-bottom: 20px;

			h1 {
				text-align: center;
				flex: 1;
			}

			.home-btn {
				cursor: pointer;
				display: flex;
				flex-direction: column;
				justify-content: center;
				position: relative; // Ensures tooltip is positioned relative to this element
				transition: 0.3s ease-in-out;
				&:hover{
					transform:translateX(-3px);
				}
				&:hover .tooltiptext {
					visibility: visible;
					opacity: 1;
					transform: translateX(5px) translateY(-10px); // Shift right and up
				}
			}
		}
	}

	/* Tooltip container */
	.tooltip {
		position: relative;
		display: inline-block;
	}

	/* Tooltip text */
	.tooltip .tooltiptext {
		visibility: hidden;
		width: auto; /* Allow tooltip width to adjust based on content */
		background-color: var(--green-primary);
		color: #fff;
		text-align: center;
		padding: 5px;
		border-radius: 6px;
		position: absolute;
		left: 50%; // Center horizontally
		top: -40px; // Place it above the icon
		transform: translateX(-5%);
		opacity: 0;
		transition:
			opacity 0.2s ease-in-out,
			transform 0.2s ease-in-out;
		z-index: 1;

		white-space: nowrap; /* Prevent line break */
	}

	input {
		width: 100%;
		padding: 0.8rem;
		margin-bottom: 1.5rem;
		border-radius: 8px;
		border: 1px solid var(--green-primary);
	}

	button {
		width: 100%;
		padding: 0.8rem;
		background-color: var(--green-primary);
		color: var(--white);
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}

	button:disabled {
		background-color: var(--green-secondary);
		cursor: not-allowed;
	}

	.error {
		color: red;
		margin-bottom: 1rem;
	}
</style>
