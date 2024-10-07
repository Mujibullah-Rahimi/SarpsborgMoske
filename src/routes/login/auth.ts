/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { derived } from 'svelte/store';
import { goto } from '$app/navigation';
import { fbGetUserDoc} from '$lib/firebase/firebaseFunctions';
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
import { createToast } from '$lib/stores/toastStore';

const auth = getAuthInstance();

export const authHandlers = {
	login: async (email: string, password: string) => {
		return await setPersistence(auth, browserSessionPersistence).then(async () => {
			try {
				const userCredential = await signInWithEmailAndPassword(auth, email, password);
				createToast('success', 'Innlogging vellykket');
				return userCredential;
			} catch (error) {
				createToast('error', 'Ugyldig epost eller passord');
				throw error; // Throw the error to be caught in loginUser
			}
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
	goto('/login');
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

