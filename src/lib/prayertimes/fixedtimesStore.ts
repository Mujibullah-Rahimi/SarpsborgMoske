import { writable } from "svelte/store";

type prayerTimes = {
    fajr: string,
    dhuhr: string,
    asr: string,
    maghrib: string,
    isha: string
};

export const prayerTimesStore = writable<prayerTimes>({
    fajr: '',
    dhuhr: '',
    asr: '',
    maghrib: '',
    isha: ''
})