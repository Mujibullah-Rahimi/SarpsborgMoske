<script lang="ts">
	import { loadCsvData } from '$lib/helpers/csvfunctions';
	import { addMinutesToTime, getTodaysPrayerTimes } from '$lib/helpers/prayertimeFunctions';
	import { type IqamahTimes, fixedIqamahStore } from '$lib/stores/iqamahStore';
	import { prayerTimesStore } from '$lib/stores/prayertimeStore';
	import { onMount } from 'svelte';

	let iqamahTimes: IqamahTimes;
	$: iqamahTimes = $fixedIqamahStore;

	// Load the CSV file and update the prayer times on component mount
	onMount(async () => {
		const csvData = await loadCsvData('/assets/bonnetider2024.csv');
		getTodaysPrayerTimes(csvData);
	});
</script>

{#key $prayerTimesStore.date}
	<div class="prayer-table">
		<div class="description-box box">
			<div class="left"><h2>BØNN</h2></div>
			<div class="right">
				<h2>ADHAN</h2>
				<h2>IQAMAH</h2>
			</div>
		</div>

		<!-- Fajr -->
		<div class="fajr salah box">
			<div class="left"><h2 class="title">FAJR</h2></div>
			<div class="right">
				<div class="fajr-adhan">
					<h2 class="time">{$prayerTimesStore.fajr}</h2>
				</div>
				<div class="fajr-iqamah">
					{#if iqamahTimes.fajr.type === 'relative' && typeof iqamahTimes.fajr.iqamah === 'number'}
						<h2 class="time">
							{addMinutesToTime($prayerTimesStore.fajr, iqamahTimes.fajr.iqamah)}
						</h2>
					{:else}
						<h2 class="time">{iqamahTimes.fajr.iqamah}</h2>
					{/if}
				</div>
			</div>
		</div>

		<!-- Dhuhr -->
		<div class="dhuhr salah box">
			<div class="left"><h2 class="title">DHUHR</h2></div>
			<div class="right">
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
		</div>

		<!-- Asr -->
		<div class="asr salah box">
			<div class="left"><h2 class="title">ASR</h2></div>
			<div class="right">
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
		</div>

		<!-- Maghrib -->
		<div class="maghrib salah box">
			<div class="left"><h2 class="title">MAGHRIB</h2></div>
			<div class="right">
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
		</div>

		<!-- Isha -->
		<div class="isha salah box">
			<div class="left"><h2 class="title">ISHA</h2></div>
			<div class="right">
				<div class="isha-adhan">
					<h2 class="time">{$prayerTimesStore.isha}</h2>
				</div>
				<div class="isha-iqamah">
					{#if iqamahTimes.isha.type === 'relative' && typeof iqamahTimes.isha.iqamah === 'number'}
						<h2 class="time">
							{addMinutesToTime($prayerTimesStore.isha, iqamahTimes.isha.iqamah)}
						</h2>
					{:else}
						<h2 class="time">{iqamahTimes.isha.iqamah}</h2>
					{/if}
				</div>
			</div>
		</div>

		<!-- Jumuah -->
		<div class="jumuah box">
			<div class="left"><h2 class="title">JUMUAH</h2></div>
			<div class="right">
				<div class="empty">
					<h2 class="empty">14:30</h2>
				</div>
				<div class="khutba">
					<h2 class="time">
						{iqamahTimes.jumuah.iqamah}
					</h2>
				</div>
			</div>
		</div>
	</div>
{/key}

<style lang="scss">
	.prayer-table {
		width: 80%;
		margin: auto;
		box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
		background-color: var(--white);
		border-radius: 15px;
		border: 1px solid var(--green-secondary);

		position: relative;
		display: flex;
		flex-direction: column;
		h2 {
			font-weight: 200;
		}

		.box {
			padding: 10px 0 10px 0;
			display: flex;
			flex: 1;
			align-items: center;
			font-size: 0.7em;
			width: 100%;
			justify-content: space-evenly;
			.left {
				display: flex;
				justify-content: start;
				align-items: center;
				width: 30%;
				padding-left: 20px;
				.title {
					text-decoration: underline;
					text-decoration-color: var(--green-secondary);
				}
			}
			.right {
				display: flex;
				justify-content: space-evenly;
				width: 70%;
				align-items: center;
				.time {
					font-weight: 400;
				}
			}
		}

		.jumuah {
			background-color: var(--green-secondary);
			border-radius: 0 0 10px 10px;
			.empty {
				visibility: hidden;
			}
			.title {
				text-decoration: underline;
				text-decoration-color: var(--white);
			}
			.time {
				font-weight: 400;
			}
		}
	}
</style>
