/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDoc, collection, doc, getDoc, getDocs, QuerySnapshot, setDoc, updateDoc } from "firebase/firestore";
import { getDbInstance } from "./firebase.client"; // Firestore instance import
import { userConverter, type mccUser } from "../../components/mccUser";
import { fixedIqamahStore, type IqamahTimes } from "$lib/stores/iqamahStore";
import { mccSadaqah, sadaqahConverter } from "../../components/mccSadaqah";
import { createToast } from "$lib/stores/toastStore";

export async function fbGetUserDoc(userUid: string) {
    const db = getDbInstance(); // Firestore instance
    const res = await getDoc(doc(db, 'users', userUid));

    if (res.exists()) {
        const user = res.data();
        return user;
    } else {
        console.log('No such document!');
    }
}

export async function fbAddToUsers(newUser: mccUser) {
    const db = getDbInstance(); // Firestore instance
    const string = JSON.stringify(newUser);
    const userObj = JSON.parse(string);
    await setDoc(doc(db, 'users', newUser.id), userObj);
}

export async function fbVerifyEmail(uid: string) {
    const db = getDbInstance(); // Firestore instance
    const userRef = doc(db, 'users', uid);

    await updateDoc(userRef, {
        emailVerified: true
    });
}

export async function updateIqamahTimes(updatedTimes: Partial<IqamahTimes>) {
    const db = getDbInstance(); // Firestore instance
    const iqamahDocRef = doc(db, 'prayertimes', 'iqamahTimes');

    try {
        await updateDoc(iqamahDocRef, updatedTimes);
        console.log('Iqamah times updated successfully');
    } catch (error) {
        console.error('Error updating Iqamah times:', error);
    }
}

export async function getIqamahTimes() {
    const db = getDbInstance(); // Firestore instance
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

export async function getAllSadaqah(): Promise<mccSadaqah[]> {
    try {
        const db = getDbInstance(); 
        const sadaqahCollectionRef = collection(db, 'sadaqah').withConverter(sadaqahConverter);
        
        const querySnapshot: QuerySnapshot<mccSadaqah> = await getDocs(sadaqahCollectionRef);
        const sadaqahList: mccSadaqah[] = [];
        
        querySnapshot.forEach((doc) => {
            sadaqahList.push(doc.data());
        });
        
        return sadaqahList; // Returns an array of mccSadaqah objects
    } catch (error) {
        console.error("Error fetching sadaqah documents: ", error);
        throw new Error("Could not retrieve sadaqah");
    }
}

export async function getSpecificSadaqah(documentName: string) {
    try {
        const db = getDbInstance(); 
        const sadaqahDocRef = doc(db, 'sadaqah', documentName).withConverter(sadaqahConverter);
        const sadaqahDoc = await getDoc(sadaqahDocRef);
        
        if (sadaqahDoc.exists()) {
            return sadaqahDoc.data(); // Returns a single mccSadaqah object
        } else {
            throw new Error("No such sadaqah document!");
        }
    } catch (error) {
        console.error("Error fetching specific sadaqah: ", error);
        throw new Error("Could not retrieve the sadaqah document");
    }
}

export async function addNewSadaqah(sadaqahData: mccSadaqah): Promise<void> {
    try {
        const db = getDbInstance(); 
        const sadaqahCollectionRef = collection(db, 'sadaqah').withConverter(sadaqahConverter);

        await addDoc(sadaqahCollectionRef, sadaqahData);

        createToast("success", "Ny sadaqah ble lagt til!")
    } catch (error) {
        createToast("error", "Noe gikk galt")
        throw new Error("Could not add new sadaqah");
    }
}