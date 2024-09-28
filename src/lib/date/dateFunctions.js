
// Helper function to convert DD-MM-YYYY to YYYY-MM-DD
/**
 * @param {{ split: (arg0: string) => [any, any, any]; }} dateStr
 */
export function convertDateToISO(dateStr) {
	const [day, month, year] = dateStr.split('.');
	return `${year}-${month}-${day}`; // Returns in YYYY-MM-DD format
}


/**
 * @param {string} isoDateString
 */
export function reformatDate(isoDateString) {
	// Split the string by '-' to get [YYYY, MM, DD]
	const [year, month, day] = isoDateString.split('-');

	// Return the reformatted date as 'DD.MM.YYYY'
	return `${day}.${month}.${year}`;
}

/**
 * @param {string | null} DateString
 */
export function resetDate(DateString) {
	// Split the string by '-' to get [YYYY, MM, DD]
	if (DateString) {
		const [day, month, year] = DateString.split('.');

		// Return the reformatted date as 'DD.MM.YYYY'
		return `${year}.${month}.${day}`;
	}
}

/**
 * @param {Date} dateObject
 */
function toString(dateObject) {
	let day = dateObject.getDate();
	let monthIndex = dateObject.getMonth();
	let year = dateObject.getFullYear();
	let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	let month = monthNames[monthIndex];
	return `${day}-${month}-${year}`;
}
const valDay = new Date("2023/02/14 UTC")
console.log(toString(valDay))
