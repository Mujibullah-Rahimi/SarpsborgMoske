import { writable } from 'svelte/store';

// Initialize the current date
const today = new Date();

// Create a writable store with today's date
export const chosendate = writable(today);

// Optional: Function to update the date to tomorrow or any other date
export const updateDate = (/** @type {string | number | Date} */ newDate) => {
    chosendate.set(new Date(newDate));
};

// Example of how to increment the date by one day (e.g., for tomorrow)
export const incrementDate = () => {
    chosendate.update(currentDate => {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay;
    });
};
export const decrementDate = () => {
    chosendate.update(currentDate => {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() - 1);
        return nextDay;
    });
};