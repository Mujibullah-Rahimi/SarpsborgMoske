import { convertDateToISO } from '$lib/date/dateFunctions';
import { datestore } from '$lib/date/dateStore';
import { prayerTimesStore } from './prayertimeStore';

export function updatePrayerTimes(
	date: string,
	fajr: string,
	dhuhr: string,
	asr: string,
	maghrib: string,
	isha: string
) {
	prayerTimesStore.set({
		date,
		fajr,
		dhuhr,
		asr,
		maghrib,
		isha
	});
}

export function getTodaysPrayerTimes(data: any[]) {
	let chosenDate: string | null;
	let today: string;
	datestore.subscribe((curr) => {
		chosenDate = curr.chosenDate;
		today = curr.today;
	});
	if (chosenDate == null) {
		// Find the row with today's date in DD-MM-YYYY format in the first column
		const todayRow = data.find((row) => {
			const rowDateISO = convertDateToISO(row[0]); // Convert DD-MM-YYYY to YYYY-MM-DD
			return rowDateISO === today;
		});

		// If today's row is found, map it to the `prayerTimes` object
		if (todayRow) {
			updatePrayerTimes(
				todayRow[0],
				todayRow[1],
				todayRow[2],
				todayRow[3],
				todayRow[4],
				todayRow[5]
			);
		}
	} else {
		// Find the row with today's date in DD-MM-YYYY format in the first column
		const row = data.find((row) => {
			const rowDateISO = convertDateToISO(row[0]); // Convert DD-MM-YYYY to YYYY-MM-DD
			return rowDateISO === chosenDate;
		});

		// If today's row is found, map it to the `prayerTimes` object
		if (row) {
			updatePrayerTimes(row[0], row[1], row[2], row[3], row[4], row[5]);
		}
	}
}

// Function to add minutes to a time string (e.g., "05:12")

export function addMinutesToTime(timeStr: string, minutesToAdd: number) {
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
