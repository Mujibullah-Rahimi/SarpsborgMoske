<script lang="ts">
	import { goto } from '$app/navigation';
	import LeftMcc from '$lib/icons/left-mcc.svelte';
	import { onMount } from 'svelte';
	import type { Unsubscriber } from 'svelte/store';
	import { authStore } from '$lib/stores/authStore';
	import { loginUser } from './auth';

	let email = '';
	let password = '';
	let errorMessage = '';
	let isLoading = false;
	let unsubscribe: Unsubscriber;

	function goHome() {
		goto('/');
	}
	async function handleLogin() {
		isLoading = true;
		errorMessage = '';
		await loginUser(email, password);
		setTimeout(() => {
			isLoading = false;
		}, 3000);
	}
	onMount(() => {
		unsubscribe = authStore.subscribe(($authStore) => {
			// console.log('Auth Store Changed:', $authStore); // Debugging step
			if ($authStore.isLoggedIn && $authStore.currentUser) {
				// console.log('Redirecting to dashboard');
				goto('/dashboard/' + $authStore.currentUser.uid);
			}
		});
		return () => unsubscribe();
	});
</script>

<svelte:head>
	<title>Sarpsborg Moske | Innlogging</title>
</svelte:head>

<div class="login-container">
	<div class="login-box">
		<div class="header">
			<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
			<div class="home-btn" on:click={goHome}>
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
			<button type="submit" disabled={isLoading}>
				{#if isLoading}
					<p>Logger inn...</p>
				{:else}
					<p>Logg inn</p>
				{/if}
			</button>
		</form>
	</div>
</div>

<style>
	/* Login Container */
	.login-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background-color: #d0fae2; /* Green secondary */
	}

	/* Login Box */
	.login-box {
		background-color: var(--white); /* White */
		padding: 2rem;
		border-radius: 15px;
		box-shadow: 5px 5px 12px 0 rgba(0, 0, 0, 0.2);
		max-width: 400px;
		width: 100%;
		text-align: center;
	}

	/* Header */
	.header {
		display: flex;
		margin-bottom: 20px;
	}

	.home-btn {
		cursor: pointer;
		display: flex;
		justify-content: center;
		transition: 0.2s ease-in-out;
	}

	.home-btn:hover {
		transform: translateX(-3px); /* Simple hover effect */
	}

	h1 {
		text-align: center;
		flex: 1;
	}

	/* Error message */
	.error {
		color: red;
		margin-bottom: 1rem;
	}

	/* Form */
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.5rem;
	}

	/* Inputs */
	input {
		width: 100%;
		padding: 0.8rem;
		border-radius: 8px;
		border: 1px solid #1da599; /* Green primary */
	}

	/* Button */
	button {
		width: 100%;
		padding: 0.8rem;
		background-color: #1da599; /* Green primary */
		color: white;
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}

	button:disabled {
		background-color: #d0fae2; /* Green secondary */
		cursor: not-allowed;
	}

</style>
