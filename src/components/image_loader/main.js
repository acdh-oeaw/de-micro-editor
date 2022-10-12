export class ImageLoader extends HTMLElement {

    "use strict";

    static get observedAttributes() {
        return ["opt", "data-type", "data-source", "pos"];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        let data = "conf_image_loader";
        let options = JSON.parse(sessionStorage.getItem(data));
        let url = options.url;
        let url_param = options.url_param;
        let pos = this.getAttribute("pos");
        let data_type = this.getAttribute("data-type");
        let dataSource = this.getAttribute("data-source");
        this.innerHTML = `
            <span id="${data_type}_img_${pos}" data-src="${url}${dataSource}${url_param}">Enable JavaScript to load image!</span>
        `;
    }

}
