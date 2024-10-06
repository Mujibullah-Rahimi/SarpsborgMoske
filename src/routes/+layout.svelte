<script>
	import { inject } from '@vercel/analytics';
	import { dev } from '$app/environment';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import NotificationToast from '../components/Toast/NotificationToast.svelte';
	import { auth } from '$lib/firebase/firebase.client';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { authStore } from './(admin)/login/auth';
	import { listenToIqamahTimes } from '$lib/firebase/firestoreListeners';
	import { getIqamahTimes } from '$lib/firebase/firebaseFunctions';

	injectSpeedInsights();

	inject({ mode: dev ? 'development' : 'production' });

	onMount(() => {
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
