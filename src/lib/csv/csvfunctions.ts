

export async function loadCsvData(link : string) {
	const response = await fetch(link);
	const csvData = await response.text(); // Get CSV content as text

	return parseCsv(csvData);
}

function parseCsv(data : string) {
	const rows = data.split('\n'); // Split by line
	return rows.map((row) => row.split(',')); // Split each row by commas (assuming CSV is comma-separated)
}

