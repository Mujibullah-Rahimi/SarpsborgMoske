


import { datestore } from './dateStore';

export const getChosenDate = (): Date | null => {
	let date: string | null = null; // Initialize as null since it can be null

	// Subscribe to extract the value from the store synchronously
	datestore.subscribe((curr) => {
		date =  curr.chosenDate; // Assign the store's `chosenDate` to the `date` variable (can be null)
	})(); // Immediately unsubscribe

	return date; // Return the extracted date (either Date or null)
};


export const incrementDate = (): Date => {
	const currentChosenDate = getChosenDate() || new Date(); // Fallback to today if null

	// Create a new Date instance and increment it
	const newDate = new Date(currentChosenDate);
	newDate.setDate(newDate.getDate() + 1); // Increment the date by 1 day
    const formattedNewDate = newDate.toISOString().slice(0,10);
	
	datestore.update((cur) => {
		return { ...cur, chosenDate:formattedNewDate }; // Update the store with the new incremented date
	});
	return newDate;
};


export const decrementDate = (): Date => {
	const currentChosenDate = getChosenDate() || new Date(); // Fallback to today if null

	// Create a new Date instance and increment it
	const newDate = new Date(currentChosenDate);
	newDate.setDate(newDate.getDate() - 1); // Decrement the date by 1 day
    const formattedNewDate = newDate.toISOString().slice(0,10);
	
	datestore.update((cur) => {
		return { ...cur, chosenDate: formattedNewDate }; // Update the store with the new decremented date
	});
	return newDate; 
};

