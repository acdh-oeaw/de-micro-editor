export class SetDataCookie {

    constructor(name, config) {
        this.name = name;
        this.config = config;
    }

    build() {
        sessionStorage.setItem(this.name, JSON.stringify(this.config));
    }

}