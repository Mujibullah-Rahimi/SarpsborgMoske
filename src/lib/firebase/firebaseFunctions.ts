import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDbInstance } from "./firebase.client";
import type { mccUser } from "../../components/mccUser";
import { fixedIqamahStore, type IqamahTimes } from "$lib/stores/iqamahStore";

// Example Firebase functions
export async function fbGetUserDoc(userUid: string) {
  const db = getDbInstance();
  const res = await getDoc(doc(db, 'users', userUid));

  if (res.exists()) {
    return res.data();
  } else {
    console.log('No such document!');
  }
}

export async function fbAddToUsers(newUser: mccUser) {
  const db = getDbInstance();
  await setDoc(doc(db, 'users', newUser.id), JSON.parse(JSON.stringify(newUser)));
}

export async function fbVerifyEmail(uid: string) {
  const db = getDbInstance();
  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, { emailVerified: true });
}

export async function updateIqamahTimes(updatedTimes: Partial<IqamahTimes>) {
  const db = getDbInstance();
  const iqamahDocRef = doc(db, 'prayertimes', 'iqamahTimes');

  try {
    await updateDoc(iqamahDocRef, updatedTimes);
    console.log('Iqamah times updated successfully');
  } catch (error) {
    console.error('Error updating Iqamah times:', error);
  }
}

export async function getIqamahTimes() {
  const db = getDbInstance();
  const iqamahDocRef = doc(db, 'prayertimes', 'iqamahTimes');
  
  try {
    const docSnapshot = await getDoc(iqamahDocRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data() as IqamahTimes;
      fixedIqamahStore.set(data);
    } else {
      console.log('No fixed Iqamah times found');
    }
  } catch (error) {
    console.error('Error fetching Iqamah times:', error);
  }
}