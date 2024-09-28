<script lang="ts">
	import { datestore } from '$lib/date/dateStore';
	import { incrementDate, decrementDate } from '$lib/date/date';
	import CalendarMcc from '$lib/icons/calendar-mcc.svelte';
	import LeftMcc from '$lib/icons/left-mcc.svelte';
	import RightMcc from '$lib/icons/right-mcc.svelte';
	import { getTodaysPrayerTimes } from '$lib/prayertimes/prayertimeFunctions';
	import { loadCsvData } from '$lib/csv/csvfunctions';
	import { reformatDate } from '$lib/date/dateFunctions';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import MediaQuery from './MediaQuery.svelte';

	export let iconWidth;
	export let controlsWidth;
	let today = 'Idag';
	let otherdays = '';

	async function handleControlClick(choice: number) {
		if (choice == 1) {
			decrementDate();
			(async () => {
				const csvData = await loadCsvData('/assets/bonnetider2024test.csv');
				getTodaysPrayerTimes(csvData); // This updates the prayerTimesStore
			})();
		}
		if (choice == 2) {
			incrementDate();
			(async () => {
				const csvData = await loadCsvData('/assets/bonnetider2024test.csv');
				getTodaysPrayerTimes(csvData); // This updates the prayerTimesStore
			})();
		}
	}
</script>

<MediaQuery query="(min-width: 936px)" let:matches>
	{#if matches}
		<div class="datepicker">
			<div class="decrement controls">
				<div class="left-icon">
					<button
						on:click={() => {
							handleControlClick(1);
						}}
					>
						<LeftMcc {controlsWidth} />
					</button>
				</div>
			</div>
			<div class="info">
				<div class="date">
					<div class="calendar-icon">
						<CalendarMcc {iconWidth} />
					</div>
					<div class="date-text">
						<p>
							{$datestore.chosenDate != null
								? reformatDate($datestore.chosenDate)
								: reformatDate($datestore.today)}
						</p>
					</div>
				</div>
			</div>
			{#if $datestore.chosenDate != null && $datestore.chosenDate != $datestore.today ? otherdays : today}
				<div
					class="today"
					transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}
				>
					<p>{today}</p>
				</div>
			{/if}
			<div class="increment controls">
				<div class="right-icon">
					<button
						on:click={() => {
							handleControlClick(2);
						}}
					>
						<RightMcc {controlsWidth} />
					</button>
				</div>
			</div>
		</div>
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 935px)" let:matches>
	{#if matches}
		<div class="mobile-datepicker">
			<div class="decrement controls">
				<div class="left-icon">
					<button
						on:click={() => {
							handleControlClick(1);
						}}
					>
						<LeftMcc {controlsWidth} />
					</button>
				</div>
			</div>
			<div class="info">
				<div class="date">
					<div class="calendar-icon">
						<CalendarMcc {iconWidth} />
					</div>
					<div class="date-text">
						<p>
							{$datestore.chosenDate != null
								? reformatDate($datestore.chosenDate)
								: reformatDate($datestore.today)}
						</p>
					</div>
				</div>
			</div>
			{#if $datestore.chosenDate != null && $datestore.chosenDate != $datestore.today ? otherdays : today}
				<div
					class="today"
					transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'x' }}
				>
					<p>{today}</p>
				</div>
			{/if}
			<div class="increment controls">
				<div class="right-icon">
					<button
						on:click={() => {
							handleControlClick(2);
						}}
					>
						<RightMcc {controlsWidth} />
					</button>
				</div>
			</div>
		</div>
	{/if}
</MediaQuery>

<style lang="scss">
	.datepicker {
		position: relative;
		height: 50px;
		display: flex;
		align-items: center;
		button {
			cursor: pointer;
			display: flex;
			padding: 8px 10px 5px 8px;
			border-radius: 8px;
			margin: 0 5px;
			background-color: var(--green-secondary);
			box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
			border: none;
			transition: ease-in-out 0.25s;
			&:hover {
				transform: translateY(-2px);
			}
		}
		.date {
			background-color: var(--green-secondary);
			width: 150px;
			border-radius: 8px;
			padding: 8px 0;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);

			.calendar-icon {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100%;
				width: 25%;
			}
			.date-text {
				height: 100%;
				width: 75%;
				font-size: 0.9em;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.today {
			background-color: var(--green-secondary);
			width: fit-content;
			border-radius: 8px;
			margin-left: 8px;
			padding: 8px 8px;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
			p {
				height: 100%;
				font-size: 0.9em;
			}
		}
	}


	//_______________________MOBILE_______________________//

	.mobile-datepicker {
		position: relative;
		height: 50px;
		display: flex;
		align-items: center;
		button {
			cursor: pointer;
			display: flex;
			padding: 8px 10px 5px 8px;
			border-radius: 8px;
			margin: 0 5px;
			background-color: var(--green-secondary);
			box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
			border: none;
			transition: ease-in-out 0.25s;
			&:hover {
				transform: translateY(-2px);
			}
		}
		.date {
			background-color: var(--green-secondary);
			width: 150px;
			border-radius: 8px;
			padding: 8px 0;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);

			.calendar-icon {
				display: flex;
				justify-content: center;
				align-items: center;
				
				width: 25%;
			}
			.date-text {
				width: 75%;
				font-size: 0.9em;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.today {
			background-color: var(--green-secondary);
			width: fit-content;
			border-radius: 8px;
			margin-left: 8px;
			padding: 8px 8px;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			box-shadow: 5px 5px 12px 0 rgb(0, 0, 0, 0.2);
			p {
				font-size: 0.9em;
			}
		}
	}
</style>
