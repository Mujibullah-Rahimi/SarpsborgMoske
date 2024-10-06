import { writable } from 'svelte/store';

type toastType = {
    empty: boolean;
    type: string | null;
    message: string | null;
};

export const toastStore = writable<toastType>({
    empty: true,
    type: null,
    message: null
});

let timer: NodeJS.Timeout | null = null; // Variable to store the timer reference

export function createToast(newType: string, newMessage: string) {
    toastStore.update(() => {
        return { empty: false, type: newType, message: newMessage };
    });

    // Clear previous timer if exists
    if (timer) {
        clearTimeout(timer);
    }

    // Set a new timer
    timer = setTimeout(destroyToast, 3000);
}

function destroyToast() {
    toastStore.update(() => {
        return { empty: true, type: null, message: null };
    });
}