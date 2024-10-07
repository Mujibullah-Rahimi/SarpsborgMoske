<script>
	import { inject } from '@vercel/analytics';
	import { dev } from '$app/environment';
	// import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import NotificationToast from '../components/Toast/NotificationToast.svelte';
	import { onMount } from 'svelte';
	import { getAuthInstance } from '$lib/firebase/firebase.client';
	import { authStore } from '$lib/stores/authStore';
	import { onAuthStateChanged } from 'firebase/auth';
	// import { authStore } from './(admin)/login/auth';

	// injectSpeedInsights();

	inject({ mode: dev ? 'development' : 'production' });

	// // Dynamically import Firebase Auth and update authStore
	// onMount(async () => {
	// 	const { getAuthInstance } = await import('$lib/firebase/firebase.client'); // Lazy load
	// 	const { onAuthStateChanged } = await import('firebase/auth'); // Lazy load Firebase auth

	// 	// Lazily get the auth instance
	// 	const auth = getAuthInstance();

	// 	onAuthStateChanged(auth, (user) => {
	// 		if (user) {
	// 			authStore.update((curr) => ({
	// 				...curr,
	// 				isLoggedIn: true,
	// 				currentUser: user
	// 			}));
	// 		} else {
	// 			authStore.update((curr) => ({
	// 				...curr,
	// 				isLoggedIn: false,
	// 				currentUser: null
	// 			}));
	// 		}
	// 	});
	// });
	onMount(() => {
		// Lazily get the auth instance
		const auth = getAuthInstance();

		onAuthStateChanged(auth, (user) => {
			if (user) {
				authStore.update((curr) => ({
					...curr,
					isLoggedIn: true,
					currentUser: user
				}));
			} else {
				authStore.update((curr) => ({
					...curr,
					isLoggedIn: false,
					currentUser: null
				}));
			}
		});
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<NotificationToast />
<slot />

<style>
	:global(*) {
		--white: #fefefd;
		--black: #231b1b;
		--green-primary: #1da599;
		--green-secondary: #d0fae2;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		scroll-behavior: smooth;
	}
	:global(p, input) {
		font-family: 'Poppins';
		src: local('$lib/fontfaces/Poppins-Regular.ttf') format('truetype');
		font-display: swap;
	}
	:global(h1) {
		font-family: 'Poppins';
		src: local('$lib/fontfaces/Poppins-Light.ttf') format('truetype');
		font-display: swap;
	}
	:global(h3) {
		font-family: 'Poppins';
		src: local('$lib/fontfaces/Poppins-SemiMedium.ttf') format('truetype');
		font-display: swap;
	}
	:global(h2, li) {
		font-family: 'Roboto';
		src: local('$lib/fontfaces/Roboto-Light.ttf') format('truetype');
		font-display: swap;
	}
	:global(h2) {
		font-family: 'Roboto';
		src: local('$lib/fontfaces/Roboto-Regular.ttf') format('truetype');
		font-display: swap;
	}
</style>