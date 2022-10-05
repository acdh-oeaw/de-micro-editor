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

    // function to triggers on click of the rendered element
    textFeatures() {

        // get session cookie with configartion json
        let data = "conf_annotation_slider";
        let options = JSON.parse(sessionStorage.getItem(data));

        // get current url parameters
        let url = new URL(window.location.href);
        let hash = url.hash;
        let urlParam = new URLSearchParams(url.search);

        // get id of rendered html element. opt value of custom element is used as ID.
        let id = this.getAttribute("id");
        if (!id) {
            console.log("ID of annotation slider custom child element not found. \
            Make sure the annotation-slider element holds the attribute 'opt' with \
            a defined string value.");
        }

        // configuration holds an array with variants with at least one variant object.
        // to match the custom element with the configuration the opt value must match.
        let variant = options.variants.find((v) => v.opt === id);
        if (!variant) {
            console.log("No variant found! Please define a variant object that contains \
            and 'opt' key holding a string value that matches the 'opt' value of custom \
            element 'annotation#slider'.");
        }

        let style = options.span_element;
        let active = options.active_class;

        // variants are either single-feature or all-features
        // single-features manipulate the DOM based on a given class
        // all-features control all other single-feature variants
        // one to control them all (well could be several to control them all)

        // in control all other sliders the following defines seperates
        // the all-features variant from others. If one is found it triggers
        // all sliders by clicking on the all-features slider variant
        let all = variant.features.all;
        let variants = options.variants.filter((v) => v.features.all === false);
        let none_variant = options.variants.find((v) => v.features.all === true);
        if (all === true) {

            // the current state of the annoation slider is set bei adding or
            // removing a class e.g. 'active'
            if ( this.classList.contains(active) ) {
                this.classList.remove(active);

                // if current state is active remove class/state
                // find all element classes in DOM and remove CSS class
                variants.forEach((el) => {
                    if (document.getElementById(el.opt).checked === true) {

                        // for all found DOM elements remove color class and css_class
                        // if hide is true hide elements with display:none
                        let color = el.color;
                        let html_class = el.html_class;
                        let css_class = el.css_class;
                        let hide = el.hide;

                        // besides removing marktup the function 'removemarkup()' returns
                        // the number of elements nodes found as string
                        let selected = removeMarkup(html_class, css_class, color, hide, style);

                        // the color class is also removed from the slider element
                        let slider = document.getElementById(el.opt_slider);
                        slider.classList.remove(color);

                        // the data attrib and class is removed from slider element
                        slider.removeAttribute("data");
                        slider.classList.remove("slider-number");

                        // disables the checked value from input element
                        // as well as the class to define the state
                        document.getElementById(el.opt).checked = false;
                        document.getElementById(el.opt).classList.remove(active);

                        // accasses the url params and sets the key to off
                        urlParam.set(el.opt, "off");
                    }
                });

                // the node count also works on the all-features variant
                this.removeAttribute("data");
                this.classList.remove("slider-number");

            } else {

                // same functionality as above but with reversed effect
                // adds markup, count and changes state to active
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

            // if the all-features key is not a boolean it displays a waring in the console.
            console.log(`Type of variant config. "features.all" must be Boolean (true or false)`);

        } else {

            // if variant is a single-feature this part triggers
            // either adds or removes markup (classes) depending on the state of the slider
            let color = variant.color;
            let html_class = variant.html_class;
            let css_class = variant.css_class;
            let hide = variant.hide;

            if ( this.classList.contains(active) ) {

                // state == active (remove state and markup)
                this.classList.remove(active);
                let selected = removeMarkup(html_class, css_class, color, hide, style);
                let slider = document.getElementById(variant.opt_slider);
                slider.classList.remove(color);
                slider.removeAttribute("data");
                slider.classList.remove("slider-number");
                this.classList.remove(color);
                urlParam.set(variant.opt, "off");

            } else {

                // state == not active (add state and markup)
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
                If all or not all annotation-sliders are selected the slider
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

        // current state of the annotation sliders is saved in the url parameters
        // current state is also saved in window history (back/forward browser button)
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
        window.history.pushState(state, '', `?${urlParam}${hash}`);

        // try to find elment holding an ID matching the 'chg_citation' string value
        if (variant.chg_citation) {
            var citation_url = document.getElementById(variant.chg_citation);
        }

        // if an ID was in HTML DOM the element inner html is updated with and updated
        // url holding new url params
        if (citation_url) {
            citation_url.innerHTML = `${location.hostname}${location.pathname}?${urlParam}`;
            citation_url.setAttribute("href", `${window.location.href}`);
        }
    }

    // function to render HTML element inside the custom element
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
