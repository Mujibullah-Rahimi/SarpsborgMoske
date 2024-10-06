import { writable } from 'svelte/store';

export type IqamahTime = {
	type: 'relative' | 'fixed';
	iqamah: number | string;
};

export type IqamahTimes = {
	fajr: IqamahTime;
	dhuhr: IqamahTime;
	asr: IqamahTime;
	maghrib: IqamahTime;
	isha: IqamahTime;
	jumuah: IqamahTime;
};

export const fixedIqamahStore = writable<IqamahTimes>({
	fajr: { type: 'relative', iqamah: '00:00' },
	dhuhr: { type: 'fixed', iqamah: '00:00' },
	asr: { type: 'relative', iqamah: '00:00' },
	maghrib: { type: 'fixed', iqamah: '00:00' },
	isha: { type: 'relative', iqamah: '00:00' },
	jumuah: { type: 'fixed', iqamah: '00:00' }
});
