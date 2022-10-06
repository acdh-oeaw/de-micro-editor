const { uptState } = require("../../utils/utils");

export class FontFamily extends HTMLElement {

    "use strict";

    static get observedAttributes() {
        return ["opt"];
    }

    connectedCallback() {
        this.render();
        // console.log(this.childNodes[3]);
        this.childNodes[3].addEventListener("change", this.fontFamily);
    }

    fontFamily() {
        let data = "conf_font_family";
        let options = JSON.parse(sessionStorage.getItem(data));
        let url = new URL(window.location.href);
        let urlParam = new URLSearchParams(url.search);
        let id = this.getAttribute("id");
        let variant = options.variants.find((v) => v.opt === id);
        let p_change = variant.paragraph;
        let p_class = variant.p_class;
        let family = variant.fonts;
        let urlparam = variant.urlparam;
        var value = this.value;
        if ( urlParam.get(urlparam) !== value ) {
            urlParam.set(urlparam, value);
            let paragraph = document.querySelectorAll(`${p_change}.${p_class}`);
            paragraph.forEach((el) => {
                for (let s in family) {
                    if (family[s] !== "default") {
                        el.classList.remove(family[s].toLowerCase());   
                    }           
                }
                if(value !== "default") {
                    el.classList.add(value.toLowerCase());
                }
            });
        }
        var stateName = variant.opt;
        var stateParam = urlParam.get(variant.opt);
        var state = {};
        state[stateName] = stateParam;

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
        let data = "conf_font_family";
        let options = JSON.parse(sessionStorage.getItem(data));
        let opt = this.getAttribute("opt");
        let variant = options.variants.find((v) => v.opt === opt);
        let family = variant.fonts;
        let html_class = options.html_class;
        var css_class = variant.css_class;
        let s_html = `
            <small><label style="padding:.2em;">${variant.title}:</label></small>
            <select id="${variant.opt}" data-target="${data}" class="${html_class}">
        `;
        for (let s in family) {
            if (family[s] == "default") {
                var option = `<option value="default" selected='selected'>${family[s].replace('-', ' ')}`;
            } else {
                var option = `<option value='${css_class}${family[s]}'>${family[s].replace('-', ' ')}`;
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
        this.childNodes[2].removeEventListener("change", this.fontFamily);
    }

}