<script>
	import { onMount } from 'svelte';
    import { chosendate, incrementDate, decrementDate } from '$lib/date/date'
	
	
    
    let currentDate;
	let prayerTimes = {
		date: '',
		fajr: '',
		dhuhr: '',
		asr: '',
		maghrib: '',
		isha: ''
	};

     // Subscribe to the chosen date and react to changes
     chosendate.subscribe(value => {
        currentDate = value.toISOString().slice(0, 10); // Format as YYYY-MM-DD
        // console.log(currentDate);
        // Call a function here to load prayer times based on the new date
        // loadPrayerTimes(currentDate);
    });

	// Function to load and parse the CSV file
	async function loadCsvData() {
		const response = await fetch('/assets/bonnetider2024test.csv'); 
		const csvData = await response.text(); // Get CSV content as text

		return parseCsv(csvData);
	}

	// Function to parse CSV data into an array of arrays
	/**
	 * @param {string} data
	 */
	function parseCsv(data) {
		const rows = data.split('\n'); // Split by line
		return rows.map((row) => row.split(',')); // Split each row by commas (assuming CSV is comma-separated)
	}

	// Helper function to convert DD-MM-YYYY to YYYY-MM-DD
	/**
	 * @param {{ split: (arg0: string) => [any, any, any]; }} dateStr
	 */
	function convertDateToISO(dateStr) {
		const [day, month, year] = dateStr.split('.');
		return `${year}-${month}-${day}`; // Returns in YYYY-MM-DD format
	}

	// Function to find today's prayer times based on the current date
	/**
	 * @param {any[]} data
	 * @param {undefined} [date]
	 */
	function getTodaysPrayerTimes(data, date) {
		const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
        // console.log(today)

		// Find the row with today's date in DD-MM-YYYY format in the first column
		const todayRow = data.find((row) => {
			const rowDateISO = convertDateToISO(row[0]); // Convert DD-MM-YYYY to YYYY-MM-DD
			return rowDateISO === today;
		});


		// If today's row is found, map it to the `prayerTimes` object
		if (todayRow) {
			prayerTimes = {
				date: todayRow[0],
				fajr: todayRow[1],
				dhuhr: todayRow[2],
				asr: todayRow[3],
				maghrib: todayRow[4],
				isha: todayRow[5]
			};
		}
	}

	// Function to add minutes to a time string (e.g., "05:12")
	/**
	 * @param {string} timeStr
	 * @param {number} minutesToAdd
	 */
	function addMinutesToTime(timeStr, minutesToAdd) {
		if (typeof timeStr !== 'string') {
			console.error('Invalid time string');
			return ''; // return empty string or handle error appropriately
		}

		const [hours, minutes] = timeStr.split(':').map(Number); // Split time into hours and minutes
		const time = new Date();
		time.setHours(hours);
		time.setMinutes(minutes + minutesToAdd);

		// Return the new time as "HH:MM" format
		return time.toTimeString().slice(0, 5);
	}

	// Load the CSV file and update the prayer times on component mount
	onMount(async () => {
		const csvData = await loadCsvData();
		getTodaysPrayerTimes(csvData);
	});
</script>

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
			<h2 class="time">{prayerTimes.fajr}</h2>
		</div>
		<div class="fajr-iqamah">
			<h2 class="time">{addMinutesToTime(prayerTimes.fajr, 15)}</h2>
		</div>
	</div>

	<!-- Dhuhr -->
	<div class="dhuhr salah box">
		<h2 class="title">DHUHR</h2>
		<div class="dhuhr-adhan">
			<h2 class="time">{prayerTimes.dhuhr}</h2>
		</div>
		<div class="dhuhr-iqamah">
			<h2 class="time">14:00</h2>
		</div>
	</div>

	<!-- Asr -->
	<div class="asr salah box">
		<h2 class="title">ASR</h2>
		<div class="asr-adhan">
			<h2 class="time">{prayerTimes.asr}</h2>
		</div>
		<div class="asr-iqamah">
			<h2 class="time">17:00</h2>
		</div>
	</div>

	<!-- Maghrib -->
	<div class="maghrib salah box">
		<h2 class="title">MAGHRIB</h2>
		<div class="maghrib-adhan">
			<h2 class="time">{prayerTimes.maghrib}</h2>
		</div>
		<div class="maghrib-iqamah">
			<h2 class="time">{prayerTimes.maghrib}</h2>
		</div>
	</div>

	<!-- Isha -->
	<div class="isha salah box">
		<h2 class="title">ISHA</h2>
		<div class="isha-adhan">
			<h2 class="time">{prayerTimes.isha}</h2>
		</div>
		<div class="isha-iqamah">
			<h2 class="time">{addMinutesToTime(prayerTimes.isha, 10)}</h2>
		</div>
	</div>

	<!-- Jumuah -->
	<div class="jumuah box">
		<h2 class="title">JUMUAH</h2>
		<div class="khutba">
			<h2 class="time">14:30</h2>
		</div>
	</div>
</div>

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
			.title {
				text-decoration: underline;
				text-decoration-color: var(--white);
			}
		}
	}
</style>
