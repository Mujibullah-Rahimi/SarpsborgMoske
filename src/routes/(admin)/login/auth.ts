/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { derived } from 'svelte/store';
import { auth } from '$lib/firebase/firebase.client';
import {
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendEmailVerification,
	sendPasswordResetEmail,
	setPersistence,
	signInWithEmailAndPassword,
	signOut,
	updatePassword
} from 'firebase/auth';
import { mccUser } from '../../../components/mccUser';
import { type User } from 'firebase/auth';
import { goto } from '$app/navigation';
import { fbGetUserDoc, fbAddToUsers} from '$lib/firebase/firebaseFunctions';
import { createToast } from '../../../components/Toast/toastStore';
import { authStore } from '$lib/stores/authStore';

export const authHandlers = {
	signup: async (/** @type {string} */ email: string, /** @type {string} */ password: string) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},
	login: async (email: string, password: string) => {
		return await setPersistence(auth, browserSessionPersistence).then(() => {
			return signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					createToast('success', 'Innlogging vellyket');
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
	},
	resetPassword: async (/** @type {string} */ email: string) => {
		await sendPasswordResetEmail(auth, email);
	},
	updatePassword: async (user: User, password: string) => {
		await updatePassword(user, password);
	},
	verifyEmail: async (user: User) => {
		await sendEmailVerification(user);
	}
};

export const isLoggedIn = derived(authStore, ($authStore) => $authStore.isLoggedIn);

export function logoutUser() {
	authHandlers.logout().then(() => {
		authStore.update((curr: any) => {
			return { ...curr, isLoggedIn: false, currentUser: null, mccUser: null };
		});
	});
	goto('/');
}

export async function loginUser(email: string, password: string) {
	try {
		const userCredential = await authHandlers.login(email, password);
		
		if (userCredential) {
			// Wait for the user state to change
			const unsubscribe = auth.onAuthStateChanged(async (user) => {
				if (user) {
					if (!user.emailVerified) {
						sendEmailVerification(user); // Send verification email if not verified
					}

					// Fetch user document from Firestore (this is mccUser data)
					const firestoreUser = await fbGetUserDoc(user.uid); 

					// Update the authStore with user information
					authStore.update((curr: any) => ({
						...curr,
						isVerified: user.emailVerified,
						isLoggedIn: true,
						currentUser: user, // This is the Firebase User object, including uid
						mccUser: firestoreUser // This is the additional Firestore data
					}));

					// Ensure user UID is available before navigating
					goto(`/dashboard/${user.uid}`);
				}
			});
		}
	} catch (error) {
		console.error(error);
	}
}

export async function signUpUser(
	email: string,
	password: string,
	firstname: string,
	lastname: string
) {
	await authHandlers.signup(email, password).then((res: any) => {
		if (auth.currentUser !== null) {
			const user: mccUser = new mccUser(auth.currentUser.uid, firstname, lastname, email, false);
			const register = fbAddToUsers(user).then((res: any) => {
				loginUser(email, password);
			});

			authHandlers.verifyEmail(auth.currentUser);
		}
	});
}


	export { authStore };
