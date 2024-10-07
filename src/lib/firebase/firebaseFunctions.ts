/* eslint-disable @typescript-eslint/no-unused-vars */
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { fixedIqamahStore, type IqamahTimes } from "$lib/stores/iqamahStore";
import type { mccUser } from "../../components/mccUser";

// Lazy-load Firestore instance within the functions
export async function fbGetUserDoc(userUid: string) {
    const { getDbInstance } = await import('./firebase.client'); // Dynamic import
    const db = getDbInstance(); // Get Firestore instance lazily
    const res = await getDoc(doc(db, 'users', userUid));

    if (res.exists()) {
        const user = res.data();
        return user;
    } else {
        console.log('No such document!');
    }
}

export async function fbAddToUsers(newUser: mccUser) {
    const { getDbInstance } = await import('./firebase.client'); // Dynamic import
    const db = getDbInstance(); // Get Firestore instance lazily
    const string = JSON.stringify(newUser);
    const userObj = JSON.parse(string);
    await setDoc(doc(db, 'users', newUser.id), userObj);
}

export async function fbVerifyEmail(uid: string) {
    const { getDbInstance } = await import('./firebase.client'); // Dynamic import
    const db = getDbInstance(); // Get Firestore instance lazily
    const userRef = doc(db, 'users', uid);

    await updateDoc(userRef, {
        emailVerified: true
    });
}

export async function updateIqamahTimes(updatedTimes: Partial<IqamahTimes>) {
    const { getDbInstance } = await import('./firebase.client'); // Dynamic import
    const db = getDbInstance(); // Get Firestore instance lazily
    const iqamahDocRef = doc(db, 'prayertimes', 'iqamahTimes');

    try {
        await updateDoc(iqamahDocRef, updatedTimes);
        console.log('Iqamah times updated successfully');
    } catch (error) {
        console.error('Error updating Iqamah times:', error);
    }
}

export async function getIqamahTimes() {
    const { getDbInstance } = await import('./firebase.client'); // Dynamic import
    const db = getDbInstance(); // Get Firestore instance lazily
    const iqamahDocRef = doc(db, 'prayertimes', 'iqamahTimes');
    
    try {
        const docSnapshot = await getDoc(iqamahDocRef);
        if (docSnapshot.exists()) {
            const data = docSnapshot.data() as IqamahTimes; // Cast to IqamahTimes
            fixedIqamahStore.set(data); // Update the Svelte store with the new data
        } else {
            console.log('No fixed Iqamah times found');
        }
    } catch (error) {
        console.error('Error fetching Iqamah times:', error);
    }
}