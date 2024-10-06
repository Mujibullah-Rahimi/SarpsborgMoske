export class mccUser {
	/**
	 * @param {string} id
	 * @param {string} firstName
	 * @param {string} lastName
	 * @param {string} email
	 * @param {boolean} emailVerified
	 */
	constructor(id, firstName, lastName, email, emailVerified) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.emailVerified = emailVerified;
	}

	toString() {
		return this.id + ": " + this.firstName + " " + this.lastName + ", " + this.email;
	}
}

export const userConverter = {
	toFirestore: (/** @type {{ id: any; firstName: any; lastName: any; email: any; emailVerified: any; }} */ user) => {
		return {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			emailVerified: user.emailVerified
		};
	},
	fromFirestore: (/** @type {{ data: (arg0: any) => any; }} */ snapshot, /** @type {any} */ options) => {
		const data = snapshot.data(options);
		return new mccUser(data.id, data.firstName, data.lastName, data.email, data.emailVerified);
	}
};