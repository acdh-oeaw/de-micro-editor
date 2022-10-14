export class SetDataCookie {

    name: string;
    config: object;

    constructor(name: string, config: object) {
        this.name = name;
        this.config = config;
    }

    build() {
        sessionStorage.setItem(this.name, JSON.stringify(this.config));
    }

}