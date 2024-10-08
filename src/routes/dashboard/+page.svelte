<script lang="ts">
	import { getAuthInstance } from '$lib/firebase/firebase.client';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { fbGetUserDoc } from '$lib/firebase/firebaseFunctions';
	import { authStore } from '$lib/stores/authStore';
	import { goto } from '$app/navigation';
	import AdminNavbar from '../../components/navbar/AdminNavbar.svelte';
	

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

<!-- Main Dashboard Section -->
<div class="dashboard-container">
	<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
	<div class="admin-sections">
		<div class="section-card" on:click={() => goto('/dashboard/bonnetider')}>
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
			<a href="/assets/PrayertimeFile.pdf" download><p>Last ned Bønnetid fil</p></a>
		</div>

		<div class="download-card">
			<a href="/assets/Innmeldingsskjema.pdf" download><p>Last ned Innmeldingsskjema</p></a>
		</div>
	</div>
</div>

<style>
	.dashboard-container {
		display: flex;
		justify-content: space-between;
		max-width: 1200px;
		margin: 20px auto;
		padding: 20px;
	}

	.admin-sections {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 65%;
	}

	.section-card {
		background-color: var(--green-secondary);
		color: var(--black);
		border-radius: 10px;
		padding: 20px;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.section-card:hover {
		transform: translateY(-5px);
		box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.3);
	}

	.section-card h2 {
		font-weight: 400;
		font-size: 1.5em;
		margin-bottom: 10px;
	}


	.sidebar {
		width: 30%;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.sidebar h2 {
		font-weight: 400;
		font-size: 1.4em;
		margin-bottom: 20px;
	}

	.download-card {
		background-color: var(--green-secondary);
		border-radius: 10px;
		padding: 15px;
		text-align: center;
		box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.download-card:hover {
		transform: translateY(-5px);
		box-shadow: 6px 6px 15px rgba(0, 0, 0, 0.3);
	}

	.download-card a {
		color: var(--black);
		text-decoration: none;
		font-size: 1.1em;
	}

</style>
