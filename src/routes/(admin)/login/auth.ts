
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { derived } from 'svelte/store';
import { mccUser } from '../../../components/mccUser';
import { goto } from '$app/navigation';
import { fbGetUserDoc, fbAddToUsers } from '$lib/firebase/firebaseFunctions';
import { createToast } from '../../../components/Toast/toastStore';
import { authStore } from '$lib/stores/authStore';

// Lazy-load Firebase modules on-demand
async function loadFirebaseAuth() {
	const { getAuth, browserSessionPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword, sendEmailVerification, onAuthStateChanged, setPersistence } = await import('firebase/auth');
	const { getAuthInstance } = await import('$lib/firebase/firebase.client'); // Assuming you have lazy-loaded auth in your firebase.client.ts
	return {
		auth: getAuthInstance(),
		browserSessionPersistence,
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword,
		signOut,
		sendPasswordResetEmail,
		updatePassword,
		sendEmailVerification,
		onAuthStateChanged,
		setPersistence
	};
}

export const authHandlers = {
	signup: async (email: string, password: string) => {
		const { auth, createUserWithEmailAndPassword } = await loadFirebaseAuth();
		await createUserWithEmailAndPassword(auth, email, password);
	},
	login: async (email: string, password: string) => {
		const { auth, setPersistence, browserSessionPersistence, signInWithEmailAndPassword } = await loadFirebaseAuth();
		return await setPersistence(auth, browserSessionPersistence).then(() => {
			return signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					createToast('success', 'Innlogging vellykket');
					return userCredential;
				})
				.catch((error) => {
					createToast('error', 'Ugyldig epost eller passord');
					throw error;
				});
		});
	},
	logout: async () => {
		const { auth, signOut } = await loadFirebaseAuth();
		await signOut(auth).then(() => {
			createToast('success', 'Du er nå logget ut');
		});
	},
	resetPassword: async (email: string) => {
		const { auth, sendPasswordResetEmail } = await loadFirebaseAuth();
		await sendPasswordResetEmail(auth, email);
	},
	updatePassword: async (user: any, password: string) => {
		const { updatePassword } = await loadFirebaseAuth();
		await updatePassword(user, password);
	},
	verifyEmail: async (user: any) => {
		const { sendEmailVerification } = await loadFirebaseAuth();
		await sendEmailVerification(user);
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
			const { auth, onAuthStateChanged, sendEmailVerification } = await loadFirebaseAuth();

			// Wait for the user state to change
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
				if (user) {
					if (!user.emailVerified) {
						sendEmailVerification(user);
					}

					const firestoreUser = await fbGetUserDoc(user.uid);

					authStore.update((curr: any) => ({
						...curr,
						isVerified: user.emailVerified,
						isLoggedIn: true,
						currentUser: user,
						mccUser: firestoreUser
					}));

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
	const { auth } = await loadFirebaseAuth();

	await authHandlers.signup(email, password).then(async () => {
		if (auth.currentUser) {
			const user: mccUser = new mccUser(auth.currentUser.uid, firstname, lastname, email, false);
			await fbAddToUsers(user);
			await loginUser(email, password);
			authHandlers.verifyEmail(auth.currentUser);
		}
	});
}

export { authStore };
