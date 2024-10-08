export class mccSadaqah {
    /**
     * @param {string} tittel
     * @param {string} beskrivelse
     * @param {string} link
     * @param {string} vipps
     * @param {string} kontonummer
     */
    constructor(tittel, beskrivelse, link,vipps, kontonummer ) {
        this.tittel = tittel;
        this.beskrivelse = beskrivelse;
        this.link = link;
        this.vipps = vipps;
        this.kontonummer = kontonummer;
    }

    toString() {
        return this.tittel + " " + this.beskrivelse + ", " + this.link;
    }
}

export const sadaqahConverter = {
    toFirestore: (/** @type {{  tittel: any; beskrivelse: any; link: any; vipps: any; kontonummer: any; }} */ user) => {
        return {
            tittel: user.tittel,
            beskrivelse: user.beskrivelse,
            link: user.link,
            vipps: user.vipps,
            kontonummer: user.kontonummer
        };
    },
    fromFirestore: (/** @type {{ data: (arg0: any) => any; }} */ snapshot, /** @type {any} */ options) => {
        const data = snapshot.data(options);
        return new mccSadaqah(data.tittel, data.beskrivelse, data.link, data.vipps, data.kontonummer);
    }
};