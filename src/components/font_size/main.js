const { uptState } = require("../../utils/utils");

export class FontSize extends HTMLElement {

    "use strict";

    static get observedAttributes() {
        return ["opt"];
    }

    connectedCallback() {
        this.render();
        // console.log(this.childNodes[3]);
        this.childNodes[3].addEventListener("change", this.fontSize);
    }

    fontSize() {
        let data = "conf_fontsize";
        let options = JSON.parse(sessionStorage.getItem(data));
        let url = new URL(window.location.href);
        let urlParam = new URLSearchParams(url.search);
        let id = this.getAttribute("id");
        let variant = options.variants.find((v) => v.opt === id);
        let p_change = variant.paragraph;
        let p_class = variant.p_class;
        let size = variant.sizes;
        let urlparam = variant.urlparam;
        var value = this.value;
        var css_class = variant.css_class;
        if ( urlParam.get(urlparam) !== value.replace(css_class, '') ) {
            urlParam.set(urlparam, value.replace(css_class, ''));
            let paragraph = document.querySelectorAll(`${p_change}.${p_class}`);
            paragraph.forEach((el) => {
                for (let s in size) {
                    if (size[s] !== "default") {
                        el.classList.remove(css_class + size[s]);   
                    }           
                }
                if(value !== "default") {
                    el.classList.add(value);
                }
            });
        }
        var stateName = variant.opt;
        var stateParam = urlParam.get(variant.opt);
        var state = {};
        state[stateName] = stateParam;
        // window.history.pushState(state, '', `${location.pathname}?${urlParam}${location.hash}`);

        let citation_url = document.getElementById(variant.chg_citation);
        let href = `?${urlParam}${location.hash}`;
        uptState({
            "hist": false,
            "cit": citation_url,
            "state": state,
            "href": href
        });

    }

    render() {
        let data = "conf_fontsize";
        let options = JSON.parse(sessionStorage.getItem(data));
        let opt = this.getAttribute("opt");
        let variant = options.variants.find((v) => v.opt === opt);
        let size = variant.sizes;
        let html_class = options.html_class;
        var css_class = variant.css_class;
        let s_html = `
            <small><label style="padding:.2em;">${variant.title}:</label></small>
            <select id="${variant.opt}" data-target="${data}" class="${html_class}">
        `;
        for (let s in size) {
            if (size[s] == "default") {
                var option = `<option value="default" selected='selected'>${size[s].split('-').slice(-1)} px`;
            } else {
                var option = `<option value='${css_class}${size[s]}'>${size[s].split('-').slice(-1)} px`;
            }
            s_html += option;
            s_html += "</option>";
        }
        s_html += "</select>";
        this.innerHTML = s_html;
    }

    attributeChangedCallback() {
        this.render();
    }

    disconnectedCallback() {
        this.childNodes[3].removeEventListener("change", this.fontSize);
    }

}