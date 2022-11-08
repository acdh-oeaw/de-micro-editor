const { addMarkup, removeMarkup, uptState, paramCheck } = require("../../utils/utils");

export class AnnotationSlider extends HTMLElement {

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
        let data = "annotation_slider";
        let storage = sessionStorage.getItem(data);
        if (storage) {

            let options: {
                title: string | null | undefined,
                variants: [
                    {
                        opt:  string | null | undefined,
                        opt_slider:  string | null | undefined,
                        title:  string | null | undefined,
                        color:  string | null | undefined,
                        html_class:  string | null | undefined,
                        css_class:  string | null | undefined,
                        hide:  boolean | null | undefined,
                        chg_citation:  string | null | undefined,
                        features: {
                            all:  boolean | null | undefined,
                            class:  string | null | undefined,
                        }
                    }
                ] | null | undefined,
                span_element: {
                    css_class: string | null | undefined,
                } | null | undefined,
                active_class: string | null | undefined,
                rendered_element: {
                    label_class: string | null | undefined,
                    slider_class: string | null | undefined,
                } | null | undefined,
            } | null | undefined = JSON.parse(storage);


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
            // variant is found by comparing variant config opt with custom element attr opt
            try {
                var variant_check = options.variants.find((v) => v.opt === id);
            } catch (err) {
                console.log("No option parameters found. Creating default parameters to continue.");
            }
            // variant as selected in UI
            let variant = paramCheck(variant_check, {
                opt: id,
                features: {
                    all: false,
                    class: "single-feature"
                }
            });
            if (!variant) {
                console.log("No variant found! Please define a variant object that contains \
                and 'opt' key holding a string value that matches the 'opt' value of custom \
                element 'annotation#slider'.");
            }


            // use try/catch to verify if object exists in options
            try {
                var features_check = variant.features;
            } catch (err) {
                console.log("Features object in variant not found. Creating default parameters.")
            }
            // check if features params of UI variant are available
            var features = paramCheck(features_check, {
                all: false,
                class: "single-feature"
            })


            // use try/catch to verify if object exists in options
            try {
                var variants_check = options.variants.filter((v) => v.features.all === false);
            } catch (err) {
                console.log("No option parameters found. Creating default parameters to continue.");
            }
            // all variants except all features
            var variants = paramCheck(variants_check, [{
                opt: id,
                features: {
                    all: false,
                    class: "single-feature"
                }
            }]);


            // use try/catch to verify if object exists in options
            try {
                var none_variant_check = options.variants.find((v) => v.features.all === true);
            } catch (err) {
                console.log("No option parameters found. Creating default parameters to continue.");
            }
            // all-features variant
            var none_variant = paramCheck(none_variant_check, {
                opt: "text-features",
                features: {
                    all: true,
                    class: "all-features"
                }
            });


            // use try/catch to verify if object exists in options
            try {
                var style_check = options.span_element;
            } catch (err) {
                console.log("style obj not found. Creating default parameters.");
            }
            var style = paramCheck(style_check, {
                css_class: "badge-item"
            })

            var active = paramCheck(options.active_class, "active");

            // variants are either single-feature or all-features
            // single-features manipulate the DOM based on a given class
            // all-features control all other single-feature variants
            // one to control them all (well could be several to control them all)

            // in control all other sliders the following defines seperates
            // the all-features variant from others. If one is found it triggers
            // all sliders by clicking on the all-features slider variant
            var all = features.all;

            if (all === true) {

                // the current state of the annoation slider is set bei adding or
                // removing a class e.g. 'active'
                if ( this.classList.contains(active) ) {
                    this.classList.remove(active);

                    // if current state is active remove class/state
                    // find all element classes in DOM and remove CSS class
                    variants.forEach((el: any) => {

                        if ((document.getElementById(el.opt) as HTMLInputElement).checked === true) {

                            // for all found DOM elements remove color class and css_class
                            // if hide is true hide elements with display:none
                            var color = paramCheck(el.color, `color-${el.opt}`);
                            let html_class = paramCheck(el.html_class, `html-class-${el.opt}`);
                            let css_class = paramCheck(el.css_class, `css-class-${el.opt}`);
                            let hide = paramCheck(el.hide, false);

                            // besides removing marktup the function 'removemarkup()' returns
                            // the number of elements nodes found as string
                            let selected = removeMarkup(html_class, css_class, color, hide, style);

                            // the color class is also removed from the slider element
                            var slider_str = paramCheck(el.opt_slider, `${el.opt}-slider`);

                            try {
                                let slider = (document.getElementById(slider_str) as HTMLElement);
                                slider.classList.remove(color);

                                // the data attrib and class is removed from slider element
                                slider.removeAttribute("data");
                                slider.classList.remove("slider-number");
                            } catch (err) {
                                console.log(`slider class ${slider_str} not found!`);
                            }

                            // disables the checked value from input element
                            // as well as the class to define the state
                            (document.getElementById(el.opt) as HTMLInputElement).checked = false;
                            (document.getElementById(el.opt) as HTMLInputElement).classList.remove(active);

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
                    var count = 0;
                    this.classList.add(active);

                    variants.forEach((el: any) => {

                        if ((document.getElementById(el.opt) as HTMLInputElement).checked === false) {

                            var color = paramCheck(el.color, `color-${el.opt}`);
                            let html_class = paramCheck(el.html_class, `html-class-${el.opt}`);
                            let css_class = paramCheck(el.css_class, `css-class-${el.opt}`);
                            let hide = paramCheck(el.hide, false);
                            var selected = addMarkup(html_class, css_class, color, hide, style);
                            var slider_str = paramCheck(el.opt_slider, `${el.opt}-slider`);

                            try {
                                let slider = (document.getElementById(slider_str) as HTMLElement);

                                slider.classList.add(color);
                                slider.setAttribute("data", selected);
                                slider.classList.add("slider-number");
                            } catch (err) {
                                console.log(`slider class ${slider_str} not found!`);
                            }

                            (document.getElementById(el.opt) as HTMLInputElement).checked = true;
                            (document.getElementById(el.opt) as HTMLInputElement).classList.add(active);
                            urlParam.set(el.opt, "on");
                            count += parseInt(selected);

                        }
                    });

                    this.setAttribute("data", String(count));
                    this.classList.add("slider-number");
                }

            } else if (typeof all !== "boolean") {

                // if the all-features key is not a boolean it displays a waring in the console.
                console.log(`Type of variant config. "features.all" must be Boolean (true or false)`);

            } else {

                // if variant is a single-feature this part triggers
                // either adds or removes markup (classes) depending on the state of the slider
                var color = paramCheck(variant.color, `color-${variant.opt}`);
                var html_class = paramCheck(variant.html_class, `html-class-${variant.opt}`);
                var css_class = paramCheck(variant.css_class, `css-class-${variant.opt}`);
                var hide = paramCheck(variant.hide, false);
                var slider_str = paramCheck(variant.opt_slider, `${variant.opt}-slider`);

                if ( this.classList.contains(active) ) {

                    // state == active (remove state and markup)
                    this.classList.remove(active);
                    let selected = removeMarkup(html_class, css_class, color, hide, style);

                    try {
                        let slider = (document.getElementById(slider_str) as HTMLElement);
                        slider.classList.remove(color);
                        slider.removeAttribute("data");
                        slider.classList.remove("slider-number");
                    } catch (err) {
                        console.log(`slider class ${slider_str} not found!`);
                    }
                    
                    this.classList.remove(color);
                    urlParam.set(variant.opt, "off");

                } else {

                    // state == not active (add state and markup)
                    this.classList.add(active);
                    let selected = addMarkup(html_class, css_class, color, hide, style);

                    try {
                        let slider = (document.getElementById(slider_str) as HTMLElement);
                        slider.classList.add(color);
                        slider.setAttribute("data", selected);
                        slider.classList.add("slider-number");
                    } catch (err) {
                        console.log(`slider class ${slider_str} not found!`);
                    }
                    
                    this.classList.add(color);
                    urlParam.set(variant.opt, "on");

                }

                /*
                    If all or not all annotation-sliders are selected the slider
                    link will automatically be switched on or off.
                */
                let variants_checked = document.querySelectorAll(`input.${features.class}:checked`);
                if (variants_checked.length === variants.length) {

                    (document.getElementById(none_variant.opt) as HTMLInputElement).checked = true;
                    (document.getElementById(none_variant.opt) as HTMLInputElement).classList.add(active);

                } else {

                    (document.getElementById(none_variant.opt) as HTMLInputElement).checked = false;
                    (document.getElementById(none_variant.opt) as HTMLInputElement).classList.remove(active);

                }
                
            }

            // current state of the annotation sliders is saved in the url parameters
            // current state is also saved in window history (back/forward browser button)
            var stateName = variant.opt;
            if (stateName !== "text-features") {
                var stateParam = urlParam.get(variant.opt);
                var state = {
                    [stateName]: stateParam
                };
            } else {
                var state = {
                    [stateName]: "on/off"
                };
            }

            // try to find elment holding an ID matching the 'chg_citation' string value
            // get citation url key and HTMLElement
            var citation_url_str = paramCheck(variant.chg_citation, "citation-url");
            var citation_url = document.getElementById(citation_url_str);

            let href = `?${urlParam}${location.hash}`;
            uptState({
                "hist": false,
                "cit": citation_url,
                "state": state,
                "href": href
            });
        }
    }

    // function to render HTML element inside the custom element
    render() {
        let data = "annotation_slider";
        let storage = sessionStorage.getItem(data);

        let options: {
            title: string | null | undefined,
            variants: [
                {
                    opt:  string | null | undefined,
                    opt_slider:  string | null | undefined,
                    title:  string | null | undefined,
                    color:  string | null | undefined,
                    html_class:  string | null | undefined,
                    css_class:  string | null | undefined,
                    hide:  boolean | null | undefined,
                    chg_citation:  string | null | undefined,
                    features: {
                        all:  boolean | null | undefined,
                        class:  string | null | undefined,
                    }
                }
            ] | null | undefined,
            span_element: {
                css_class: string | null | undefined,
            } | null | undefined,
            active_class: string | null | undefined,
            rendered_element: {
                label_class: string | null | undefined,
                slider_class: string | null | undefined,
            } | null | undefined,
        } | null | undefined = JSON.parse(storage);

        let opt = this.getAttribute("opt");
        // check if user set opt attribute
        if (typeof opt !== "string") {
            console.log("No 'opt' attribute in custom element font-family found!");
        }

        // variant is found by comparing variant config opt with custom element attr opt
        try {
            var variant_check = options.variants.find((v) => v.opt === opt);
        } catch (err) {
            console.log("No option parameters found. Creating default parameters to continue.");
        }
        var variant = paramCheck(variant_check, {
            opt: opt,
            features: {
                class: "single-feature",
                all: false
            }
        });

        try {
            var features_check = variant.features;
        } catch (err) {
            console.log("Features object in variant not found. Creating default parameters.")
        }
        let features = paramCheck(features_check, {
            all: false,
            class: "single-feature"
        })

        let title = paramCheck(variant.title, "Text Feature");
        let opt_slider = paramCheck(variant.opt_slider, `${opt}-slider`);

        // check if sizes object with font sizes is not null or undefined
        try {
            var rendered_element_check = options.rendered_element;
        } catch (err) {
            console.log("Hide object not found. Creating default parameters.");
        }
        let rendered_element = paramCheck(rendered_element_check, {
            label_class: "switch",
            slider_class: "i-slider round"
        });

        let render_class = paramCheck(rendered_element.label_class, "switch");
        let slider_class = paramCheck(rendered_element.slider_class, "i-slider round");

        this.innerHTML = `
            <label>${title}</label>
            <label class="${render_class}">
                <input title="${title}"
                    type="checkbox"
                    id="${opt}"
                    data-target="${data}"
                    class="${features.class}"/>
                <span id="${opt_slider}" class="${slider_class}"></span>
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
