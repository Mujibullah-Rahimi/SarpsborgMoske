<script lang="ts">
	import { getAuthInstance } from '$lib/firebase/firebase.client';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { fbGetUserDoc } from '$lib/firebase/firebaseFunctions';
	import { authStore } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';
	import AdminNavbar from '../../components/navbar/AdminNavbar.svelte';
	import DownloadMcc from '$lib/icons/download-mcc.svelte';
	import MediaQuery from '../../components/MediaQuery.svelte';
	import Mobilenavbar from '../../components/navbar/Mobilenavbar.svelte';

	let fsUser = null;

	// Authentication check
	onMount(() => {
		const auth = getAuthInstance();
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const res = await fbGetUserDoc(user.uid);
				authStore.update((curr: any) => ({ ...curr, currentUser: res }));
				fsUser = res;
			} else {
				goto('/login');
			}
		});
	});
</script>

<svelte:head>
	<title>Sarpsborg Moske | Administrasjonspanel</title>
</svelte:head>

<AdminNavbar />
<Mobilenavbar />

<MediaQuery query="(min-width: 936px)" let:matches>
	{#if matches}
		<!-- Main Dashboard Section -->
		<div class="dashboard-container">
			<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
			<div class="admin-sections">
				<div class="section-card" on:click={() => goto('/dashboard/bønnetider')}>
					<h2>Bønnetider</h2>
					<p>Oppdater og administrer bønnetider</p>
				</div>

				<div class="section-card" on:click={() => goto('/dashboard/veldedighet')}>
					<h2>Veldedigheter</h2>
					<p>Administrer og legg til nye veldedigheter</p>
				</div>
			</div>

			<!-- Sidebar with download buttons -->
			<div class="sidebar">
				<h2>Nyttige dokumenter</h2>
				<div class="download-card">
					<DownloadMcc width="20" />
					<a href="/assets/bonnetider2024.csv" download><p>Last ned Bønnetabell</p></a>
				</div>

				<div class="download-card">
					<DownloadMcc width="20" />
					<a href="/assets/Innmeldingsskjema.pdf" download><p>Last ned Innmeldingsskjema</p></a>
				</div>

				<div class="download-card">
					<DownloadMcc width="20" />
					<a href="/assets/Utmeldingsblankett.pdf" download><p>Last ned Utmeldingsblankett</p></a>
				</div>
			</div>
		</div>
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 935px)" let:matches>
	{#if matches}
		<!-- Main Dashboard Section -->
		<div class="mobile-dashboard-container">
			<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
			<div class="admin-mobile-sections">
				<div class="section-mobile-card" on:click={() => goto('/dashboard/bønnetider')}>
					<h2>Bønnetider</h2>
					<p>Oppdater og administrer bønnetider</p>
				</div>

				<div class="section-mobile-card" on:click={() => goto('/dashboard/veldedighet')}>
					<h2>Veldedigheter</h2>
					<p>Administrer og legg til nye veldedigheter</p>
				</div>
			</div>

			<!-- Sidebar with download buttons -->
			<div class="mobile-sidebar">
				<h2>Nyttige dokumenter</h2>
				<div class="download-mobile-card">
					<DownloadMcc width="20" />
					<a href="/assets/bonnetider2024.csv" download><p>Last ned Bønnetabell</p></a>
				</div>

				<div class="download-mobile-card">
					<DownloadMcc width="20" />
					<a href="/assets/Innmeldingsskjema.pdf" download><p>Last ned Innmeldingsskjema</p></a>
				</div>

				<div class="download-mobile-card">
					<DownloadMcc width="20" />
					<a href="/assets/Utmeldingsblankett.pdf" download><p>Last ned Utmeldingsblankett</p></a>
				</div>
			</div>
		</div>
	{/if}
</MediaQuery>

<style>
	.dashboard-container {
	display: flex;
	justify-content: space-between;
	max-width: 1200px;
	margin: 20px auto;
	padding: 20px;
}

.dashboard-container .admin-sections {
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 65%;
}

.dashboard-container .section-card {
	background-color: var(--green-secondary);
	color: var(--black);
	border-radius: 10px;
	padding: 20px;
	box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-container .section-card:hover {
	transform: translateY(-5px);
	box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.3);
}

.dashboard-container .section-card h2 {
	font-weight: 400;
	font-size: 1.5em;
	margin-bottom: 10px;
}

.dashboard-container .section-card p {
	font-size: 1.1em;
}

.dashboard-container .sidebar {
	width: 30%;
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.dashboard-container .sidebar h2 {
	font-weight: 400;
	font-size: 1.4em;
	margin-bottom: 20px;
}

.dashboard-container .download-card {
	background-color: var(--green-secondary);
	border-radius: 10px;
	padding: 15px;
	text-align: center;
	box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
	display: flex;
	gap: 10px;
	align-items: center;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dashboard-container .download-card:hover {
	transform: translateY(-5px);
	box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.3);
}

.dashboard-container .download-card a {
	color: var(--black);
	text-decoration: none;
	font-size: 1.1em;
}

/* Mobile Styles */

.mobile-dashboard-container {
	display: flex;
	flex-direction: column;
	padding: 20px;
	margin-top: 100px;
	align-items: center;
}

.mobile-dashboard-container .admin-mobile-sections {
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 100%;
}

.mobile-dashboard-container .section-mobile-card {
	background-color: var(--green-secondary);
	color: var(--black);
	border-radius: 10px;
	padding: 15px;
	box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
	cursor: pointer;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mobile-dashboard-container .section-mobile-card:hover {
	transform: translateY(-5px);
	box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.3);
}

.mobile-dashboard-container .section-mobile-card h2 {
	font-weight: 400;
	font-size: 1.3em;
	margin-bottom: 10px;
}

.mobile-dashboard-container .section-mobile-card p {
	font-size: 1em;
}

.mobile-dashboard-container .mobile-sidebar {
	margin-top: 100px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.mobile-dashboard-container .mobile-sidebar h2 {
	font-weight: 400;
	font-size: 1.2em;
	margin-bottom: 10px;
}

.mobile-dashboard-container .download-mobile-card {
	background-color: var(--green-secondary);
	border-radius: 10px;
	padding: 10px;
	text-align: center;
	box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
	display: flex;
	gap: 10px;
	align-items: center;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mobile-dashboard-container .download-mobile-card:hover {
	transform: translateY(-5px);
	box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.3);
}

.mobile-dashboard-container .download-mobile-card a {
	color: var(--black);
	text-decoration: none;
	font-size: 1.1em;
}

</style>
