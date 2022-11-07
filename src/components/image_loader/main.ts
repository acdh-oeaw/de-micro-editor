const { paramCheck } = require("../../utils/utils");

export class ImageLoader extends HTMLElement {

    static get observedAttributes() {
        return ["opt", "data-type", "data-source", "pos"];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        let data = "image_loader";
        let storage = sessionStorage.getItem(data);

        // get session storage (not all variables are required)
        let options: {
            name: string  | null | undefined,
            opt: string  | null | undefined,
            title: string  | null | undefined,
            urlparam: string  | null | undefined,
            chg_citation: string  | null | undefined,
            pag_link: string  | null | undefined,
            pag_tab: string  | null | undefined,
            img_size: string  | null | undefined,
            url: string  | null | undefined,
            url_param: string  | null | undefined,
            osd_target: string  | null | undefined,
            img_source: string  | null | undefined,
            img_types: []  | null | undefined,
            active_class:  string  | null | undefined,
            inactive_class:  string  | null | undefined,
            bootstrap_class:  string  | null | undefined,
        } | null | undefined = JSON.parse(storage);

        // define url and param to access images
        let url = paramCheck(options.url, "provide-url");
        let url_param = paramCheck(options.url_param, "provide-url-params (optional)");
        
        let pos = this.getAttribute("pos");
        // check if user set opt attribute
        if (typeof pos !== "string") {
            console.log("No 'opt' attribute in custom element font-family found!");
        }

        let data_type = this.getAttribute("data-type");
        // check if user set opt attribute
        if (typeof data_type !== "string") {
            console.log("No 'opt' attribute in custom element font-family found!");
        }

        let dataSource = this.getAttribute("data-source");
        // check if user set opt attribute
        if (typeof dataSource !== "string") {
            console.log("No 'opt' attribute in custom element font-family found!");
        }

        this.innerHTML = `
            <span id="${data_type}_img_${pos}" data-src="${url}${dataSource}${url_param}">Enable JavaScript to load image!</span>
        `;
    }

}
