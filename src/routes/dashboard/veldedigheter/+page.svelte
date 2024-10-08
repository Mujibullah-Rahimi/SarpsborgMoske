<script lang="ts">
	import { goto } from '$app/navigation';
	import { getAuthInstance } from '$lib/firebase/firebase.client';
	import { addNewSadaqah, fbGetUserDoc } from '$lib/firebase/firebaseFunctions'; // Import the existing add function
	import { authStore } from '$lib/stores/authStore';
	import { createToast } from '$lib/stores/toastStore';
	import type { Handle } from '@sveltejs/kit';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';
	import { mccSadaqah } from '../../../components/mccSadaqah';
	import AdminNavbar from '../../../components/navbar/AdminNavbar.svelte';
	import Mobilenavbar from '../../../components/navbar/Mobilenavbar.svelte';

	let tittel = '';
	let beskrivelse = '';
	let vipps = '';
	let kontonummer = '';
	let link = '';
    let fsUser = null;

	onMount(() => {
		const auth = getAuthInstance(); // Get the Firebase Auth instance

		onAuthStateChanged(auth, async (user) => {
			if (user) {
				// Fetch user data from Firestore
				const res = await fbGetUserDoc(user.uid);
				// Update the authStore with the fetched user data
				authStore.update((curr: any) => {
					return { ...curr, currentUser: res };
				});
				fsUser = res;
			} else {
				// Redirect to login page if user is not authenticated
				goto('/login');
			}
		});
	});

	export const handle: Handle = async ({ event, resolve }) => {
		const { getAuthInstance } = await import('$lib/firebase/firebase.client');
		const auth = getAuthInstance();
		const user = auth.currentUser;

		if (event.url.pathname.startsWith('/dashboard')) {
			if (!user) {
				return Response.redirect('/', 302);
			}
		}

		if (event.url.pathname === '/login' && user) {
			return Response.redirect(`/dashboard/${user.uid}`, 302);
		}

		return resolve(event);
	};

	// Function to handle form submission
	async function handleAddSadaqah() {
		try {
			const newSadaqah = new mccSadaqah(tittel, beskrivelse, link, kontonummer, vipps);
			await addNewSadaqah(newSadaqah);

			// Reset form fields after successful addition
			tittel = '';
			beskrivelse = '';
			vipps = '';
			kontonummer = '';
			link = '';
		} catch (error) {
			console.error('Error adding Sadaqah:', error);
		}
	}
</script>

<AdminNavbar />
<Mobilenavbar />

<div class="admin-settings">
	<h1>Legg til Veldedighet</h1>

	<div class="settings-row">
		<label for="title"><p>Tittel</p></label>
		<input type="text" id="title" bind:value={tittel} required />
	</div>

	<div class="settings-row">
		<label for="beskrivelse"><p>Beskrivelse</p></label>
		<textarea id="beskrivelse" bind:value={beskrivelse} required></textarea>
	</div>

	<div class="settings-row">
		<label for="vipps"><p>Vipps</p></label>
		<input type="text" id="vipps" bind:value={vipps} required />
	</div>

	<div class="settings-row">
		<label for="kontonummer"><p>Kontonummer</p></label>
		<input type="text" id="kontonummer" bind:value={kontonummer} required />
	</div>

	<div class="settings-row">
		<label for="link"><p>Link</p></label>
		<input type="url" id="link" bind:value={link} />
	</div>

	<button on:click={handleAddSadaqah}>Legg til Veldedighet</button>
</div>

<style>
	.admin-settings {
		max-width: 600px;
		margin: 20px auto;
        margin-top: 100px;
		padding: 20px;
		background-color: var(--white);
		border-radius: 10px;
		box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.2);
	}

	h1 {
		font-size: 1.8em;
		margin-bottom: 20px;
		color: var(--green-primary);
		text-align: center;
		font-weight: 400;
	}

	.settings-row {
		margin-bottom: 15px;
	}

	.settings-row label {
		font-weight: bold;
	}

	.settings-row input,
	.settings-row textarea {
		width: 100%;
		padding: 10px;
		margin-top: 5px;
		border: 1px solid var(--green-primary);
		border-radius: 5px;
		font-size: 1em;
	}
	.settings-row textarea {
		width: 100%;
		padding: 10px;
		margin-top: 5px;
		border: 1px solid var(--green-primary);
		border-radius: 5px;
		font-size: 1em;
		resize: vertical; /* Only allow vertical resizing */
		max-width: 100%; /* Prevents exceeding the parent's width */
		box-sizing: border-box; /* Ensures padding and borders are included in the width */
	}

	button {
		margin-top: 20px;
		width: 100%;
		padding: 12px;
		background-color: var(--green-primary);
		color: var(--white);
		border: none;
		border-radius: 5px;
		font-size: 1.1em;
		cursor: pointer;
	}

	button:hover {
		background-color: var(--green-secondary);
	}
</style>
