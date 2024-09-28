import { writable } from 'svelte/store';

type storeType = {
    today: string;
    chosenDate: string | null;
};

export const datestore = writable<storeType>({
    today: new Date().toISOString().slice(0,10),
    chosenDate: null
});
