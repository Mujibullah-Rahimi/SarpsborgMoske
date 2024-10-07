/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { derived } from 'svelte/store';
import { mccUser } from '../../../components/mccUser';
import { goto } from '$app/navigation';
import { fbGetUserDoc, fbAddToUsers } from '$lib/firebase/firebaseFunctions';
import { createToast } from '../../../components/Toast/toastStore';
import { authStore } from '$lib/stores/authStore';
import {
	browserSessionPersistence,
	signInWithEmailAndPassword,
	signOut,
	sendEmailVerification,
	onAuthStateChanged,
	setPersistence
} from 'firebase/auth';
import { getAuthInstance } from '$lib/firebase/firebase.client';

const auth = getAuthInstance();

export const authHandlers = {
	login: async (email: string, password: string) => {
		return await setPersistence(auth, browserSessionPersistence).then(() => {
			return signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					createToast('success', 'Innlogging vellykket');
					return userCredential; // Return the UserCredential object
				})
				.catch((error) => {
					createToast('error', 'Ugyldig epost eller passord');
					throw error; // Throw the error to be caught in loginUser
				});
		});
	},
	logout: async () => {
		await signOut(auth).then(() => {
			createToast('success', 'Du er nå logget ut');
		});
	}
};

export const isLoggedIn = derived(authStore, ($authStore) => $authStore.isLoggedIn);

export async function logoutUser() {
	await authHandlers.logout();
	authStore.update((curr: any) => ({
		...curr,
		isLoggedIn: false,
		currentUser: null,
		mccUser: null
	}));
	goto('/');
}

export async function loginUser(email: string, password: string) {
	try {
		const userCredential = await authHandlers.login(email, password);

		if (userCredential) {
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					if (!user.emailVerified) {
						sendEmailVerification(user); // Send verification email if not verified
					}

					const firestoreUser = await fbGetUserDoc(user.uid);

					authStore.update((curr: any) => ({
						...curr,
						isVerified: user.emailVerified,
						isLoggedIn: true,
						currentUser: user, // This is the Firebase User object, including uid
						mccUser: firestoreUser // This is the additional Firestore data
					}));

					goto(`/dashboard/${user.uid}`);
				}
			});
		}
	} catch (error) {
		console.error(error);
	}
}

export { authStore };
