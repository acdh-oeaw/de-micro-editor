export class ImageSwitch extends HTMLElement {

    "use strict";

    static get observedAttributes() {
        return ["opt"];
    }

    connectedCallback() {
        this.render();
        setTimeout(() => {
            // console.log(this.childNodes[3]);
            this.childNodes[3].addEventListener("click", this.viewerSwitch);
        }, 500);
    }

    viewerSwitch() {
        let data = "conf_image_switch";
        let options = JSON.parse(sessionStorage.getItem(data));
        let url = new URL(window.location.href);
        let urlParam = new URLSearchParams(url.search);
        let id = this.getAttribute("id");
        let variant = options.variants.find((v) => v.opt === id);
        let active = options.active_class;
        let hide = variant.hide.class_to_hide;
        let show = variant.hide.class_to_show;
        let parent = variant.hide.class_parent;
        let resize = variant.hide.resize;
        let citation_url = document.getElementById(variant.chg_citation);
        let urlparam = variant.urlparam;
        if ( urlParam.get(urlparam) == "on" ) {
            urlParam.set(urlparam, "off");
            document.querySelectorAll(`.${hide}`).forEach((el) => {
                el.classList.add("fade");
                el.classList.remove("col-md-6");
                el.style.maxWidth = "100%";
                el.classList.remove(active);
            });
            document.querySelectorAll(`.${show}`).forEach((el) => {
                el.classList.remove("col-md-6");
                el.classList.add("col-md-12");
                el.style.maxWidth = "100%";
                el.classList.remove(active);
            });
            document.querySelectorAll(`.${resize}`).forEach((el) => {
                el.style.display = "none";
            });
            this.classList.remove(active); 
        } else {                      
            urlParam.set(urlparam, "on");
            document.querySelectorAll(`.${hide}`).forEach((el) => {
                el.classList.remove("fade");
                el.classList.add("col-md-6");
                el.style.maxWidth = "50%";
                el.classList.add(active);
            });
            document.querySelectorAll(`.${show}`).forEach((el) => {
                el.classList.add("col-md-6");
                el.classList.remove("col-md-12");
                el.style.maxWidth = "50%";
                el.classList.add(active);
            });
            document.querySelectorAll(`.${resize}`).forEach((el) => {
                el.style.display = "block";
            });
            // works only with one image viewer
            let viewer = document.querySelector(`.${parent}.${active} .${hide}`);
            let facs = viewer.querySelectorAll("*")[0];
            // console.log(facs);
            facs.style.width = `${viewer.offsetWidth}px`;
            facs.style.height = variant.image_size;
            this.classList.add(active);
        }
        var stateName = variant.opt;
        var stateParam = urlParam.get(variant.opt);
        var state = {};
        state[stateName] = stateParam;
        window.history.pushState(state, '', `${location.pathname}?${urlParam}`);
        citation_url.innerHTML = `${location.hostname}${location.pathname}?${urlParam}`;
        citation_url.setAttribute("href", window.location.href);
    }

    render() {
        let data = "conf_image_switch";
        let options = JSON.parse(sessionStorage.getItem(data));
        let opt = this.getAttribute("opt");
        let variant = options.variants.find((v) => v.opt === opt);
        let rendered_element = options.rendered_element;
        let active = options.active_class;
        this.innerHTML = `
            <small><label style="padding:.2em;">${variant.title}:</label></small>
            <a title="${variant.title}"
                class="${rendered_element.a_class} ${active}"
                id="${variant.opt}"
                data-target="${data}">
                ${rendered_element.svg}
            </a>
        `;
    }

    attributeChangedCallback() {
        this.render();
    }

    disconnectedCallback() {
        this.childNodes[3].removeEventListener("click", this.viewerSwitch);
    }

}
