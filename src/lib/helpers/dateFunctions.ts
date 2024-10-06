
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertDateToISO(dateStr: { split: (arg0: string) => [any, any, any]; } ) {
	const [day, month, year] = dateStr.split('.');
	return `${year}-${month}-${day}`; // Returns in YYYY-MM-DD format
}


export function reformatDate(isoDateString : string) {
	// Split the string by '-' to get [YYYY, MM, DD]
	const [year, month, day] = isoDateString.split('-');

	// Return the reformatted date as 'DD.MM.YYYY'
	return `${day}.${month}.${year}`;
}

export function resetDate(DateString : string | null) {
	// Split the string by '-' to get [YYYY, MM, DD]
	if (DateString) {
		const [day, month, year] = DateString.split('.');

		// Return the reformatted date as 'DD.MM.YYYY'
		return `${year}.${month}.${day}`;
	}
}
import { datestore } from '../stores/dateStore';

export const getChosenDate = (): Date | null => {
	let date: string | null = null; // Initialize as null since it can be null

	// Subscribe to extract the value from the store synchronously
	datestore.subscribe((curr) => {
		date = curr.chosenDate; // Assign the store's `chosenDate` to the `date` variable (can be null)
	})(); // Immediately unsubscribe

	return date; // Return the extracted date (either Date or null)
};

export const incrementDate = (): Date => {
	const currentChosenDate = getChosenDate() || new Date(); // Fallback to today if null

	// Create a new Date instance and increment it
	const newDate = new Date(currentChosenDate);
	newDate.setDate(newDate.getDate() + 1); // Increment the date by 1 day
	const formattedNewDate = newDate.toISOString().slice(0, 10);

	datestore.update((cur) => {
		return { ...cur, chosenDate: formattedNewDate }; // Update the store with the new incremented date
	});
	return newDate;
};

export const decrementDate = (): Date => {
	const currentChosenDate = getChosenDate() || new Date(); // Fallback to today if null

	// Create a new Date instance and increment it
	const newDate = new Date(currentChosenDate);
	newDate.setDate(newDate.getDate() - 1); // Decrement the date by 1 day
	const formattedNewDate = newDate.toISOString().slice(0, 10);

	datestore.update((cur) => {
		return { ...cur, chosenDate: formattedNewDate }; // Update the store with the new decremented date
	});
	return newDate;
};
