import { writable } from "svelte/store";

type prayerTimes = {
    date: string,
    fajr: string,
    dhuhr: string,
    asr: string,
    maghrib: string,
    isha: string
};

export const prayerTimesStore = writable<prayerTimes>({
    date: '',
    fajr: '',
    dhuhr: '',
    asr: '',
    maghrib: '',
    isha: ''
})