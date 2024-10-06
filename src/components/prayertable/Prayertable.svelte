<script lang="ts">
	import { onMount } from 'svelte';
	import { loadCsvData } from '$lib/helpers/csvfunctions';
	import { addMinutesToTime, getTodaysPrayerTimes } from '$lib/helpers/prayertimeFunctions';
	import { prayerTimesStore } from '$lib/stores/prayertimeStore';
	import { fixedIqamahStore, type IqamahTimes } from '$lib/stores/iqamahStore';
	import { listenToIqamahTimes } from '$lib/firebase/firestoreListeners';

	let iqamahTimes: IqamahTimes;
	$: iqamahTimes = $fixedIqamahStore;

	let prayerTimes;
	$: prayerTimes = $prayerTimesStore;

	// Load the CSV file and update the prayer times on component mount
	onMount(async () => {
		const csvData = await loadCsvData('/assets/bonnetider2024.csv');
		getTodaysPrayerTimes(csvData);
	});
</script>

{#key $prayerTimesStore.date}
	<div class="prayer-table">
		<div class="description-box box">
			<div class="content">
				<h2>BØNN</h2>
				<h2>ADHAN</h2>
				<h2>IQAMAH</h2>
			</div>
		</div>

		<!-- Fajr -->
		<div class="fajr salah box">
			<h2 class="title">FAJR</h2>
			<div class="fajr-adhan">
				<h2 class="time">{$prayerTimesStore.fajr}</h2>
			</div>
			<div class="fajr-iqamah">
				{#if iqamahTimes.fajr.type === 'relative' && typeof iqamahTimes.fajr.iqamah === 'number'}
					<h2 class="time">{addMinutesToTime($prayerTimesStore.fajr, iqamahTimes.fajr.iqamah)}</h2>
				{:else}
					<h2 class="time">{iqamahTimes.fajr.iqamah}</h2>
				{/if}
			</div>
		</div>

		<!-- Dhuhr -->
		<div class="dhuhr salah box">
			<h2 class="title">DHUHR</h2>
			<div class="dhuhr-adhan">
				<h2 class="time">{$prayerTimesStore.dhuhr}</h2>
			</div>
			<div class="dhuhr-iqamah">
				{#if iqamahTimes.dhuhr.type === 'relative' && typeof iqamahTimes.dhuhr.iqamah === 'number'}
					<h2 class="time">
						{addMinutesToTime($prayerTimesStore.dhuhr, iqamahTimes.dhuhr.iqamah)}
					</h2>
				{:else}
					<h2 class="time">{iqamahTimes.dhuhr.iqamah}</h2>
				{/if}
			</div>
		</div>

		<!-- Asr -->
		<div class="asr salah box">
			<h2 class="title">ASR</h2>
			<div class="asr-adhan">
				<h2 class="time">{$prayerTimesStore.asr}</h2>
			</div>
			<div class="asr-iqamah">
				{#if iqamahTimes.asr.type === 'relative' && typeof iqamahTimes.asr.iqamah === 'number'}
					<h2 class="time">{addMinutesToTime($prayerTimesStore.asr, iqamahTimes.asr.iqamah)}</h2>
				{:else}
					<h2 class="time">{iqamahTimes.asr.iqamah}</h2>
				{/if}
			</div>
		</div>

		<!-- Maghrib -->
		<div class="maghrib salah box">
			<h2 class="title">MAGHRIB</h2>
			<div class="maghrib-adhan">
				<h2 class="time">{$prayerTimesStore.maghrib}</h2>
			</div>
			<div class="maghrib-iqamah">
				{#if iqamahTimes.maghrib.type === 'relative' && typeof iqamahTimes.maghrib.iqamah === 'number'}
					<h2 class="time">
						{addMinutesToTime($prayerTimesStore.maghrib, iqamahTimes.maghrib.iqamah)}
					</h2>
				{:else}
					<h2 class="time">{iqamahTimes.maghrib.iqamah}</h2>
				{/if}
			</div>
		</div>

		<!-- Isha -->
		<div class="isha salah box">
			<h2 class="title">ISHA</h2>
			<div class="isha-adhan">
				<h2 class="time">{$prayerTimesStore.isha}</h2>
			</div>
			<div class="isha-iqamah">
				{#if iqamahTimes.isha.type === 'relative' && typeof iqamahTimes.isha.iqamah === 'number'}
					<h2 class="time">{addMinutesToTime($prayerTimesStore.isha, iqamahTimes.isha.iqamah)}</h2>
				{:else}
					<h2 class="time">{iqamahTimes.isha.iqamah}</h2>
				{/if}
			</div>
		</div>

		<!-- Jumuah -->
		<div class="jumuah box">
			<h2 class="title">JUMUAH</h2>
			<div class="khutba">
				<h2 class="time">
					{iqamahTimes.jumuah.iqamah}
				</h2>
			</div>
		</div>
	</div>
{/key}

<style lang="scss">
	.prayer-table {
		width: 100%;
		box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
		background-color: var(--white);
		border-radius: 15px;
		border: 1px solid var(--green-secondary);
		margin: 20px 0 20px 0;
		z-index: 3;
		position: relative;
		display: flex;
		font-size: 1.25em;
		h2 {
			font-weight: 200;
		}

		.box {
			padding: 10px 0 10px 0;
			display: flex;
			flex-direction: column;
			flex: 1;
			align-items: center;
			.title {
				text-decoration: underline;
				text-decoration-color: var(--green-secondary);
			}
			.time {
				font-weight: 400;
				margin-top: 50%;
			}
		}
		.description-box {
			.content {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
		.jumuah {
			background-color: var(--green-secondary);
			border-radius: 0px 15px 15px 0px;
			.title {
				text-decoration: underline;
				text-decoration-color: var(--white);
			}
		}
	}
</style>
