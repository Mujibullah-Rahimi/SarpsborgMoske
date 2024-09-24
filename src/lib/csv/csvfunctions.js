// Helper function to parse the CSV file content
/**
 * @param {string} data
 */
export function parseCsv(data) {
    const rows = data.split('\n'); // Split by line
    return rows.map(row => row.split(',')); // Split each row by commas (assuming CSV is comma-separated)
}

// Helper function to convert DD.MM.YYYY to YYYY-MM-DD
/**
 * @param {{ split: (arg0: string) => [any, any, any]; }} dateStr
 */
export function convertDateToISO(dateStr) {
    const [day, month, year] = dateStr.split('.');
    return `${year}-${month}-${day}`; // Returns in YYYY-MM-DD format
}

// Function to load CSV file content
/**
 * @param {string | URL | Request} path
 */
export async function loadCsvData(path) {
    const response = await fetch(path); // Pass in the path to the CSV file
    const csvData = await response.text(); // Get CSV content as text
    return parseCsv(csvData);
}

// Function to find today's prayer times based on the current date
/**
 * @param {any[]} data
 * @param {string} today
 */
export function getTodaysPrayerTimes(data, today) {
    // Find the row with today's date in DD.MM.YYYY format in the first column
    const todayRow = data.find(row => {
        const rowDateISO = convertDateToISO(row[0]); // Convert DD.MM.YYYY to YYYY-MM-DD
        return rowDateISO === today;
    });

    // If today's row is found, return the prayer times object
    if (todayRow) {
        return {
            date: todayRow[0],
            fajr: todayRow[1],
            dhuhr: todayRow[2],
            asr: todayRow[3],
            maghrib: todayRow[4],
            isha: todayRow[5]
        };
    }

    return null; // Return null if no data found for today's date
}

// Function to add minutes to a time string (e.g., "05:12")
/**
 * @param {string} timeStr
 * @param {number} minutesToAdd
 */
export function addMinutesToTime(timeStr, minutesToAdd) {
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