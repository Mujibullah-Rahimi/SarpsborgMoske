import type { User } from "firebase/auth";
import { writable } from "svelte/store";
import type { mccUser } from "../../components/mccUser";

type authStoreType = {
	userToken: string | null;
	isVerified: boolean;
	isLoggedIn: boolean;
	currentUser: User | null; // Firebase User
	mccUser: mccUser | null;  // Firestore user data
};

export const authStore = writable<authStoreType>({
	userToken: '',
	isVerified: false,
	isLoggedIn: false,
	currentUser: null,  // Firebase User object with uid
	mccUser: null       // Firestore data like firstname, lastname, etc.
});