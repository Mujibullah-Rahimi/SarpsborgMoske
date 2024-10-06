import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '$lib/firebase/firebase.client';
import { fixedIqamahStore, type IqamahTimes } from '$lib/stores/iqamahStore';

// Real-time listener for Iqamah times in Firestore
export function listenToIqamahTimes() {
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
