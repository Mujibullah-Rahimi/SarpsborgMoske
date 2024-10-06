import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { getDbInstance } from '$lib/firebase/firebase.client'; // Import the lazy-load function for Firestore
import { fixedIqamahStore, type IqamahTimes } from '$lib/stores/iqamahStore';

// Real-time listener for Iqamah times in Firestore
export function listenToIqamahTimes() {
    // Get the Firestore instance lazily
    const db = getDbInstance();

    const iqamahDocRef = doc(db, 'prayertimes', 'iqamahTimes');

    // Listen to real-time changes from Firestore
    onSnapshot(iqamahDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
            const data = docSnapshot.data() as IqamahTimes; // Cast to IqamahTimes
            fixedIqamahStore.set(data); // Update the Svelte store with the new data
        } else {
            console.log('No fixed Iqamah times found');
        }
    });
}

// Manual fetch function for Iqamah times (non-real-time)
export async function getIqamahTimesOnce() {
    const db = getDbInstance(); // Lazy-load Firestore instance
    const iqamahDocRef = doc(db, 'prayertimes', 'iqamahTimes');

    try {
        const docSnapshot = await getDoc(iqamahDocRef);
        if (docSnapshot.exists()) {
            const data = docSnapshot.data() as IqamahTimes;
            fixedIqamahStore.set(data); // Update the Svelte store with the fetched data
        } else {
            console.log('No fixed Iqamah times found');
        }
    } catch (error) {
        console.error('Error fetching Iqamah times:', error);
    }
}