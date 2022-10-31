const { uptState } = require("../../utils/utils");

export class FullSize extends HTMLElement {

    static get observedAttributes() {
        return ["opt"];
    }

    connectedCallback() {
        this.render();
        // console.log(this.childNodes[3]);
        this.childNodes[3].addEventListener("click", this.fullScreen);
    }

    fullScreen() {

        let data = "fullsize";

        // get config by accessing sessions storage
        let storage: string | null = sessionStorage.getItem(data);

        if (storage) {

            var options: {
                name: string | null,
                variants: [{
                    opt: string | null,
                    title: string | null,
                    hide: {
                        hidden: string,
                        class_to_hide: string
                    } | null,
                    chg_citation: string | null,
                    urlparam: string | null
                }] | null,
                active_class: string | null,
                rendered_element: {
                    a_class: string | null,
                    svg: string | null
                } | null
            } | null = JSON.parse(storage);
    
            let url = new URL(window.location.href);
            let urlParam = new URLSearchParams(url.search);

            let id = this.getAttribute("id");
            let variant = options.variants.find((v) => v.opt === id);

            if (variant) {

                if (variant.hide) {

                    if (options.active_class) {
                        var active = options.active_class;
                    } else {
                        var active = "active"
                    }

                    if (variant.hide.class_to_hide) {
                        var hide = variant.hide.class_to_hide;
                    } else {
                        var hide = "hide-container"
                    }

                    if (variant.hide.hidden) {
                        var hidden = variant.hide.hidden;
                    } else {
                        var hidden = "fade";
                    }
                    
                    var svg_show = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
                            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                    `;
                    var svg_hide = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                            <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
                        </svg>
                    `;

                }

                if (variant.urlparam) {
                    var urlparam = variant.urlparam;
                } else {
                    var urlparam = "fullscreen";
                }

                if ( urlParam.get(urlparam) == "off" ) {

                    urlParam.set(urlparam, "on");
                    document.querySelectorAll(`.${hide}`).forEach((el) => {
                        el.classList.add(hidden);
                        options.rendered_element.svg = svg_hide;
                    });
                    this.classList.remove(active);

                } else {                      

                    urlParam.set(urlparam, "off");
                    document.querySelectorAll(`.${hide}`).forEach((el) => {
                        el.classList.remove(hidden);
                        options.rendered_element.svg = svg_show;
                    });
                    this.classList.add(active); 

                }

                if (variant.opt) {
                    var stateName = variant.opt;
                } else {
                    var stateName = "edition-fullscreen";
                }
                
                var stateParam = urlParam.get(urlparam);
                var state = {
                    [stateName]: stateParam
                };
                //state[stateName] = stateParam;

                if (variant.chg_citation) {
                    var citation_url = document.getElementById(variant.chg_citation);
                } else {
                    var citation_url = document.getElementById("citation-url");
                }

                let href = `?${urlParam}${location.hash}`;
                uptState({
                    "hist": false,
                    "cit": citation_url,
                    "state": state,
                    "href": href
                });

            }
   
        }

    }

    render() {

        let data = "fullsize";
        var options: {
            name: string | null,
            variants: [{
                opt: string | null,
                title: string | null,
                hide: {
                    hidden: string,
                    class_to_hide: string
                } | null,
                chg_citation: string | null,
                urlparam: string | null
            }] | null,
            active_class: string | null,
            rendered_element: {
                a_class: string | null,
                svg: string | null
            } | null
        } | null = JSON.parse(sessionStorage.getItem(data));

        let opt = this.getAttribute("opt");
        let variant = options.variants.find((v) => v.opt === opt);

        if (variant) {

            if (options.rendered_element && options.rendered_element.a_class && options.rendered_element.svg) {
                var rendered_element = options.rendered_element;
            } else {
                console.log("key: rendered element must be an object holding keys 'a_class' and 'svg' of type string: Default parameters added.");
                var rendered_element = {
                    a_class: "nav-link btn btn-round",
                    svg: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-fullscreen' viewBox='0 0 16 16'><path d='M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z'/></svg>"
                };
            }

            if (variant.title) {
                var opt_title = variant.title;
            } else {
                var opt_title = "Full screen on/off";
            }

            if (variant.opt) {
                var var_opt = variant.opt;
            } else {
                var var_opt = "edition-fullscreen";
            }

            this.innerHTML = `
                <small><label style="padding:.2em;">${opt_title}:</label></small>
                <a title="${opt_title}"
                    class="${rendered_element.a_class} active"
                    id="${var_opt}"
                    data-target="${data}">
                    ${rendered_element.svg}
                </a>
            `;
        }
        
    }

    attributeChangedCallback() {
        this.render();
    }

    disconnectedCallback() {
        this.childNodes[3].removeEventListener("click", this.fullScreen);
    }

}