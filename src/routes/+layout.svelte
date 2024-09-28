<script>
	import Footer from '../components/footer/Footer.svelte';
	import Mobilefooter from '../components/footer/Mobilefooter.svelte';
	import Mobilenavbar from '../components/navbar/Mobilenavbar.svelte';
	import Navbar from '../components/navbar/Navbar.svelte';
	import { inject } from '@vercel/analytics'
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
<Navbar />
<Mobilenavbar />
<slot />
<footer>
	<Footer />
	<Mobilefooter />
</footer>

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
	:global(h2) {
		font-family: 'Roboto';
		src: local('$lib/fontfaces/Roboto-Light.ttf') format('truetype');
		font-display: swap;
	}
	:global(h2) {
		font-family: 'Roboto';
		src: local('$lib/fontfaces/Roboto-Regular.ttf') format('truetype');
		font-display: swap;
	}
	footer {
		left: 0;
		position: absolute;
		width: 100%;
	}
</style>
