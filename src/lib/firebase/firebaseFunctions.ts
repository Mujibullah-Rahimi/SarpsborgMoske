/* eslint-disable @typescript-eslint/no-unused-vars */
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "./firebase.client";
import type { mccUser } from "../../components/mccUser";
import { fixedIqamahStore, type IqamahTimes } from "$lib/stores/iqamahStore";

export async function fbGetUserDoc(userUid: string) {
    const res = await getDoc(doc(db, 'users', userUid));

    if (res.exists()) {
        const user = res.data();
        return user;
    } else {
        console.log('No such document!');
    }
}

export async function fbAddToUsers(newUser: mccUser) {
    const string = JSON.stringify(newUser);
    const userObj = JSON.parse(string);
    const res = await setDoc(doc(db, 'users', newUser.id), userObj);
}

// export async function fbAddToNewsletter(email: string){
//     let subscriber = new mccSubscriber(email, email);
//     let string = JSON.stringify(subscriber);
//     let subscriberObj = JSON.parse(string);
//     try {
//         await setDoc(doc(db, 'newsletterlist', subscriberObj.id), subscriberObj).then(() => {
//             createToast('success', 'Subscribed!')
//         })
//     } catch (error) {
//         createToast('error', 'Subscribtion failed')
//         console.log('fbAddToUsers',error)
//     }
// }

export async function fbVerifyEmail(uid :string) {
    const userRef = doc(db, 'users', uid);

    await updateDoc(userRef, {
        emailVerified : true
    });
}

export async function updateIqamahTimes(updatedTimes: Partial<IqamahTimes>) { 
    const iqamahDocRef = doc(db, 'prayertimes', 'iqamahTimes');

    try {
        await updateDoc(iqamahDocRef, updatedTimes);
        console.log('Iqamah times updated successfully');
    } catch (error) {
        console.error('Error updating Iqamah times:', error);
    }
}

export async function getIqamahTimes() {
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