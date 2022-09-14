const { addMarkup, removeMarkup } = require("../../utils/utils");

export class AnnotationSlider extends HTMLElement {

    "use strict";

    static get observedAttributes() {
        return ["opt"];
    }

    connectedCallback() {
        this.render();
        this.childNodes[3].childNodes[1].addEventListener("click", this.textFeatures);
        // console.log(this.childNodes[3].childNodes[1]);
    }

    textFeatures() {
        let data = "conf_annotation_slider";
        let options = JSON.parse(sessionStorage.getItem(data));
        let url = new URL(window.location.href);
        let urlParam = new URLSearchParams(url.search);
        let id = this.getAttribute("id");
        let variant = options.variants.find((v) => v.opt === id); 
        if (variant.chg_citation) {
            var citation_url = document.getElementById(variant.chg_citation);
        }
        let all = variant.features.all;
        let variants = options.variants.filter((v) => v.features.all === false);
        let none_variant = options.variants.find((v) => v.features.all === true);
        let style = options.span_element;
        let active = options.active_class;
        if (all === true) {
            if ( this.classList.contains(active) ) {
                this.classList.remove(active);
                variants.forEach((el) => {
                    if (document.getElementById(el.opt).checked === true) {
                        let color = el.color;
                        let html_class = el.html_class;
                        let css_class = el.css_class;
                        let hide = el.hide;
                        let selected = removeMarkup(html_class, css_class, color, hide, style);
                        let slider = document.getElementById(el.opt_slider);
                        slider.classList.remove(color);
                        slider.removeAttribute("data");
                        slider.classList.remove("slider-number");
                        document.getElementById(el.opt).checked = false;
                        document.getElementById(el.opt).classList.remove(active);
                        urlParam.set(el.opt, "off");
                    }
                });
                this.removeAttribute("data");
                this.classList.remove("slider-number");
            } else {
                let count = 0;
                this.classList.add(active);
                variants.forEach((el) => {
                    if (document.getElementById(el.opt).checked === false) {
                        let color = el.color;
                        let html_class = el.html_class;
                        let css_class = el.css_class;
                        let hide = el.hide;
                        let selected = addMarkup(html_class, css_class, color, hide, style);
                        let slider = document.getElementById(el.opt_slider);
                        slider.classList.add(color);
                        slider.setAttribute("data", selected);
                        slider.classList.add("slider-number");
                        document.getElementById(el.opt).checked = true;
                        document.getElementById(el.opt).classList.add(active);
                        urlParam.set(el.opt, "on");
                        count += parseInt(selected);
                    }
                });
                this.setAttribute("data", count);
                this.classList.add("slider-number");
            }
        } else if (typeof all !== "boolean") {
            console.log(`Type of variant config. "features.all" must be Boolean (true or false)`);
        } else {
            // const opt = variant.opt;
            let color = variant.color;
            let html_class = variant.html_class;
            let css_class = variant.css_class;
            let hide = variant.hide;
            if ( this.classList.contains(active) ) {
                this.classList.remove(active);
                let selected = removeMarkup(html_class, css_class, color, hide, style);
                let slider = document.getElementById(variant.opt_slider);
                slider.classList.remove(color);
                slider.removeAttribute("data");
                slider.classList.remove("slider-number");
                this.classList.remove(color);
                urlParam.set(variant.opt, "off");
            } else {
                this.classList.add(active);
                let selected = addMarkup(html_class, css_class, color, hide, style);
                let slider = document.getElementById(variant.opt_slider);
                slider.classList.add(color);
                slider.setAttribute("data", selected);
                slider.classList.add("slider-number");
                this.classList.add(color);
                urlParam.set(variant.opt, "on");
            }
            /*
                If all or not all text features are selected the original text features
                link will automatically be switched on or off.
            */
                let variants_checked = document.querySelectorAll(`input.${variant.features.class}:checked`);
            if (variants_checked.length === variants.length) {
                document.getElementById(none_variant.opt).checked = true;
                document.getElementById(none_variant.opt).classList.add(active);
            } else {
                document.getElementById(none_variant.opt).checked = false;
                document.getElementById(none_variant.opt).classList.remove(active);
            }
            
        }
        var stateName = variant.opt;
        if (stateName !== "text-features") {
            var stateParam = urlParam.get(variant.opt);
            var state = {};
            state[stateName] = stateParam;
        } else {
            var state = {};
            for (const [ key, value ] of urlParam) {
                state[key] = value;
            } 
        }        
        // window.history.replaceState(state, '', `?${urlParam}`);
        window.history.pushState(state, '', `?${urlParam}`);
        if (citation_url) {
            citation_url.innerHTML = `${location.hostname}${location.pathname}?${urlParam}`;
            citation_url.setAttribute("href", window.location.href);
        }
    }

    render() {
        let data = "conf_annotation_slider";
        let options = JSON.parse(sessionStorage.getItem(data));
        const opt = this.getAttribute("opt");
        const variant = options.variants.find((v) => v.opt === opt);
        const title = variant.title;
        const opt_slider = variant.opt_slider;
        const rendered_element = options.rendered_element;
        this.innerHTML = `
            <label>${title}</label>
            <label class="${rendered_element.label_class}">
                <input title="${title}"
                    type="checkbox"
                    id="${opt}"
                    data-target="${data}"
                    class="${variant.features.class}"/>
                <span id="${opt_slider}" class="${rendered_element.slider_class}"></span>
            </label>
        `;
    }

    attributeChangedCallback() {
        this.render();
    }

    disconnectedCallback() {
        this.childNodes[3].childNodes[1].removeEventListener("click", this.textFeatures);
    }
}
