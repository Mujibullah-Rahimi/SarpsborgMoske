import { convertDateToISO } from '$lib/helpers/dateFunctions';
import { datestore } from '$lib/stores/dateStore';
import { prayerTimesStore } from '../stores/prayertimeStore';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getTodaysPrayerTimes(data: any[]) {
	let chosenDate: string | null | undefined;
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

// Utility function to add minutes to a time string in HH:MM format
export function addMinutesToTime(time: string, minutes: number): string {
	const [hours, mins] = time.split(':').map(Number);
	const totalMinutes = hours * 60 + mins + minutes;
	const newHours = Math.floor(totalMinutes / 60) % 24;
	const newMinutes = totalMinutes % 60;
	return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
  }
