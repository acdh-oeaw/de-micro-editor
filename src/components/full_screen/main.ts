const { uptState, paramCheck } = require("../../utils/utils");

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
                name: string | null | undefined,
                variants: [{
                    opt: string | null | undefined,
                    title: string | null | undefined,
                    hide: string | null | undefined,
                    to_hide: string | null | undefined,
                    chg_citation: string | null | undefined,
                    urlparam: string | null | undefined
                }] | null,
                active_class: string | null | undefined,
                render_class: string | null | undefined,
                render_svg: string | null | undefined
            } | null | undefined = JSON.parse(storage);
    
            let url = new URL(window.location.href);
            let urlParam = new URLSearchParams(url.search);

            let id = this.getAttribute("id");

            // variant is found by comparing variant config opt with custom element attr opt
            try {
                var variant_check = options.variants.find((v) => v.opt === id);
            } catch (err) {
                console.log("No option parameters found. Creating default parameters to continue.");
            }
            var variant = paramCheck(variant_check, {opt: id});

            // check for option param or return default value
            var active = paramCheck(options.active_class, "active");

            var hide = paramCheck(variant.hide, "hide-container");

            var hidden = paramCheck(variant.to_hide, "fade");
            
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

            var urlparam = paramCheck(variant.urlparam, "fullscreen");

            if ( urlParam.get(urlparam) == "off" ) {

                urlParam.set(urlparam, "on");
                document.querySelectorAll(`.${hide}`).forEach((el) => {
                    el.classList.add(hidden);
                });
                this.innerHTML = svg_hide;
                this.classList.remove(active);

            } else {                      

                urlParam.set(urlparam, "off");
                document.querySelectorAll(`.${hide}`).forEach((el) => {
                    el.classList.remove(hidden);
                });
                this.innerHTML = svg_show;
                this.classList.add(active); 

            }

            var stateName = paramCheck(variant.opt, "edition-fullscreen");
            var stateParam = urlParam.get(urlparam);
            var state = {
                [stateName]: stateParam
            };

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

    render() {

        let data = "fullsize";
        var options: {
            name: string | null | undefined,
            variants: [{
                opt: string | null | undefined,
                title: string | null | undefined,
                hide: string | null | undefined,
                to_hide: string | null | undefined,
                chg_citation: string | null | undefined,
                urlparam: string | null | undefined
            }] | null,
            active_class: string | null | undefined,
            render_class: string | null | undefined,
            render_svg: string | null | undefined
        } | null | undefined = JSON.parse(sessionStorage.getItem(data));

        let opt = this.getAttribute("opt");
        try {
            var variant_check = options.variants.find((v) => v.opt === opt);
        } catch (err) {
            console.log("No option parameters found. Creating default parameters to continue.");
        }
        var variant = paramCheck(variant_check, {opt: opt});

        var a_class = paramCheck(options.active_class, "nav-link btn btn-round");
        var svg = paramCheck(options.render_svg, "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-fullscreen' viewBox='0 0 16 16'><path d='M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z'/></svg>");
        var opt_title = paramCheck(variant.title, "Full screen on/off");
        var var_opt = paramCheck(variant.opt, "edition-fullscreen");

        this.innerHTML = `
            <small><label style="padding:.2em;">${opt_title}:</label></small>
            <a title="${opt_title}"
                style="cursor:pointer;"
                class="${a_class} active"
                id="${var_opt}"
                data-target="${data}">
                ${svg}
            </a>
        `;
        
    }

    attributeChangedCallback() {
        this.render();
    }

    disconnectedCallback() {
        this.childNodes[3].removeEventListener("click", this.fullScreen);
    }

}