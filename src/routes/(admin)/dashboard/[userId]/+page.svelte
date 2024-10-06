<script lang="ts">
	import { onMount } from 'svelte';
	import { authStore } from '../../login/auth';
	import { goto } from '$app/navigation';
	import { fbGetUserDoc, updateIqamahTimes } from '$lib/firebase/firebaseFunctions';
	import AdminNavbar from '../../../../components/navbar/AdminNavbar.svelte';
	import { fixedIqamahStore } from '$lib/stores/iqamahStore';
	import { createToast } from '../../../../components/Toast/toastStore';
	import type { Handle } from '@sveltejs/kit';
  
	let fsUser = null;
  
	async function loadFirebaseAuth() {
	  const { getAuth, onAuthStateChanged } = await import('firebase/auth');
	  const { getAuthInstance } = await import('$lib/firebase/firebase.client');
	  return { auth: getAuthInstance(), onAuthStateChanged };
	}
  
	onMount(async () => {
	  const { auth, onAuthStateChanged } = await loadFirebaseAuth();
  
	  onAuthStateChanged(auth, async (user) => {
		if (user) {
		  const res = await fbGetUserDoc(user.uid);
		  authStore.update((curr: any) => {
			return { ...curr, currentUser: res };
		  });
		  fsUser = res;
		} else {
		  goto('/login');
		}
	  });
	});
  
	export const handle : Handle = async ({ event, resolve }) => {
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
  
	let iqamahTimes = $fixedIqamahStore;
  
	type Prayer = {
	  name: string;
	  type: string;
	  time: string | number;
	};
  
	let prayers: Prayer[] = [
	  {
		name: 'fajr',
		type: iqamahTimes?.fajr?.type ?? 'relative',
		time: iqamahTimes?.fajr?.iqamah ?? 15
	  },
	  {
		name: 'dhuhr',
		type: iqamahTimes?.dhuhr?.type ?? 'fixed',
		time: iqamahTimes?.dhuhr?.iqamah ?? '00:00'
	  },
	  {
		name: 'asr',
		type: iqamahTimes?.asr?.type ?? 'relative',
		time: iqamahTimes?.asr?.iqamah ?? 15
	  },
	  {
		name: 'maghrib',
		type: iqamahTimes?.maghrib?.type ?? 'fixed',
		time: iqamahTimes?.maghrib?.iqamah ?? '00:00'
	  },
	  {
		name: 'isha',
		type: iqamahTimes?.isha?.type ?? 'relative',
		time: iqamahTimes?.isha?.iqamah ?? 15
	  },
	  {
		name: 'jumuah',
		type: iqamahTimes?.jumuah?.type ?? 'relative',
		time: iqamahTimes?.jumuah?.iqamah ?? 0
	  }
	];
  
	let selectedPrayers: string[] = [];
	let isFormValid = false;
  
	function validateForm() {
	  if (selectedPrayers.length === 0) {
		isFormValid = false;
		return;
	  }
  
	  isFormValid = selectedPrayers.every((prayerName) => {
		const prayer = prayers.find((p) => p.name === prayerName);
		if (!prayer) return false;
  
		if (prayer.type === 'relative') {
		  const timeValue = +prayer.time; // Ensure `prayer.time` is a number
		  return Number.isInteger(timeValue) && timeValue >= 0 && timeValue <= 60;
		} else if (prayer.type === 'fixed') {
		  return /\d{2}:\d{2}/.test(prayer.time as string); // Check valid time format
		}
		return false;
	  });
	}
  
	async function handleSave() {
	  const updatedTimes: Record<string, { type: string; iqamah: string | number }> = {};
  
	  prayers.forEach((prayer) => {
		if (selectedPrayers.includes(prayer.name)) {
		  updatedTimes[prayer.name] = { type: prayer.type, iqamah: prayer.time };
		}
	  });
  
	  if (isFormValid) {
		try {
		  await updateIqamahTimes(updatedTimes);
		  createToast('success', 'Bønnetider er oppdatert');
		} catch (error) {
		  createToast('error', 'Det oppstod en feil under oppdatering');
		}
	  }
	}
  
	$: selectedPrayers, validateForm();
	$: prayers, validateForm();
  </script>

<AdminNavbar />

<div class="admin-settings">
	<h1>Administrer Bønnetider</h1>

	<div class="prayer-selection">
		<p>Velg hvilke bønner du ønsker å oppdatere:</p>
		{#each prayers as prayer}
			<div class="checkbox">
				<input type="checkbox" id={prayer.name} value={prayer.name} bind:group={selectedPrayers} />
				<label for={prayer.name}
					><p>{prayer.name.charAt(0).toUpperCase() + prayer.name.slice(1)}</p>
				</label>
			</div>
		{/each}
	</div>

	{#each prayers as prayer}
		{#if selectedPrayers.includes(prayer.name)}
			<div class="settings-row">
				<label for={prayer.name + '-type'}
					><p>{prayer.name.charAt(0).toUpperCase() + prayer.name.slice(1)}</p></label
				>
				<select id={prayer.name + '-type'} bind:value={prayer.type}>
					<option value="relative">Minutter etter adhan</option>
					<option value="fixed">Spesifikk klokkeslett</option>
				</select>
			</div>

			{#if prayer.type === 'relative'}
				<div class="settings-row">
					<input
						type="number"
						id={prayer.name + '-time'}
						min="0"
						max="60"
						bind:value={prayer.time}
					/>
					<small>Minutter etter adhan (0-60)</small>
				</div>
			{:else}
				<div class="settings-row">
					<input type="time" id={prayer.name + '-time'} bind:value={prayer.time} />
				</div>
			{/if}
		{/if}
	{/each}

	{#if selectedPrayers.length > 0}
		<!-- Show Save button only if prayers are selected -->
		<button on:click={handleSave} disabled={!isFormValid}>Lagre Endringer</button>
	{/if}
</div>

<style lang="scss">
	.admin-settings {
		max-width: 600px;
		margin: 20px auto;
		padding: 20px;
		background-color: var(--white);
		border-radius: 10px;
		box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.2);
	}

	.prayer-selection {
		margin-bottom: 20px;

		label {
			font-weight: 400;
		}

		.checkbox {
			margin: 10px 0;
			display: flex;
			align-items: center;
			input {
				accent-color: var(--green-primary);
				margin-right: 10px;
			}
		}
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

		label {
			font-weight: bold;
		}

		select,
		input {
			width: 100%;
			padding: 10px;
			margin-top: 5px;
			border: 1px solid var(--green-primary);
			border-radius: 5px;
			font-size: 1em;
		}

		small {
			font-size: 0.9em;
			color: #999;
		}
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
		&:hover {
			background-color: var(--green-secondary);
		}
		&:disabled {
			background-color: #ccc;
			cursor: not-allowed;
		}
	}
</style>
