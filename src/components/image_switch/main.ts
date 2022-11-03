const { uptState, paramCheck } = require("../../utils/utils");

export class ImageSwitch extends HTMLElement {

    static get observedAttributes() {
        return ["opt"];
    }

    connectedCallback() {
        this.render();
        // console.log(this.childNodes[3]);
        this.childNodes[3].addEventListener("click", this.viewerSwitch);
    }

    viewerSwitch() {
        let data = "image_switch";

        let id = this.getAttribute("id");
        // check if user set opt attribute
        if (typeof id !== "string") {
            console.log("No 'opt' attribute in custom element font-family found!");
        }

        let storage = sessionStorage.getItem(data);
        
        if (storage) {

            let options: {
                name: string | null | undefined,
                variants:  [
                    {
                        opt:  string | null | undefined,
                        title:  string | null | undefined,
                        urlparam:  string | null | undefined,
                        chg_citation:  string | null | undefined,
                        fade:  string | null | undefined,
                        column_small: {
                            class:  string | null | undefined,
                            percent:  string | null | undefined,
                        } | null | undefined,
                        column_full: {
                            class:  string | null | undefined,
                            percent:  string | null | undefined,
                        } | null | undefined,
                        hide: {
                            hidden: true,
                            class_to_hide:  string | null | undefined,
                            class_to_show:  string | null | undefined,
                            class_parent:  string | null | undefined,
                            resize:  string | null | undefined,
                        } | null | undefined,
                        image_size:  string | null | undefined,
                    }
                ],
                active_class:  string | null | undefined,
                rendered_element: {
                    a_class:  string | null | undefined,
                    svg:  string | null | undefined
                } | null | undefined
            } | null | undefined = JSON.parse(storage);

            if (!options) {
                alert("Please turn on cookies to display content!")
            }

            let url = new URL(location.href);
            let urlParam = new URLSearchParams(url.search);

            // variant is found by comparing variant config opt with custom element attr opt
            try {
                var variant_check = options.variants.find((v) => v.opt === id);
            } catch (err) {
                console.log("No option parameters found. Creating default parameters to continue.");
            }
            var variant = paramCheck(variant_check, {opt: id});


            // check for option param or return default value
            var active = paramCheck(options.active_class, "active");

            // check if sizes object with font sizes is not null or undefined
            try {
                var hide_check = variant.hide;
            } catch (err) {
                console.log("Font family object not found. Creating default parameters.");
            }
            let hide_checked = paramCheck(hide_check, {
                hidden: true,
                class_to_hide: "osd-viewer",
                class_to_show: "text-re",
                class_parent: "pagination-tab",
                resize: "resize-hide"
            });

            // get classes from params for container to hide and show
            let hide = paramCheck(hide_checked.class_to_hide, "hide-container1");
            let show = paramCheck(variant.hide.class_to_show, "show-container1");
            let resize = paramCheck(variant.hide.resize, "resize-hide");

            // get class for wrapper of hide show container
            let parent = paramCheck(variant.hide.class_parent, "hide-show-wrapper");

            // get urlparam key
            var urlparam = paramCheck(variant.urlparam, "image");

            // get fade class
            let fade = paramCheck(variant.fade, "fade");

            // get classes and style for hide show container resizing
            let column_small = [paramCheck(variant.column_small["class"], "col-md-6"), paramCheck(variant.column_small["percent"], "50%")];
            let column_full = [paramCheck(variant.column_full["class"], "col-md-6"), paramCheck(variant.column_full["percent"], "50%")];
          

            if ( urlParam.get(urlparam) == "on" ) {

                urlParam.set(urlparam, "off");
                document.querySelectorAll(`.${hide}`).forEach((el: HTMLElement) => {
                    el.classList.add(fade);
                    el.classList.remove(column_small[0]);
                    el.style.maxWidth = column_full[1];
                    el.classList.remove(active);
                });
                document.querySelectorAll(`.${show}`).forEach((el: HTMLElement) => {
                    el.classList.remove(column_small[0]);
                    el.classList.add(column_full[0]);
                    el.style.maxWidth = column_full[1];
                    el.classList.remove(active);
                });
                document.querySelectorAll(`.${resize}`).forEach((el: HTMLElement) => {
                    el.style.display = "none";
                });
                this.classList.remove(active); 

            } else {    

                urlParam.set(urlparam, "on");
                document.querySelectorAll(`.${hide}`).forEach((el: HTMLElement) => {
                    el.classList.remove(fade);
                    el.classList.add(column_small[0]);
                    el.style.maxWidth = column_small[1];
                    el.classList.add(active);
                });
                document.querySelectorAll(`.${show}`).forEach((el: HTMLElement) => {
                    el.classList.add(column_small[0]);
                    el.classList.remove(column_full[0]);
                    el.style.maxWidth = column_small[1];
                    el.classList.add(active);
                });
                document.querySelectorAll(`.${resize}`).forEach((el: HTMLElement) => {
                    el.style.display = "block";
                });

                // works only with one image viewer
                let viewer = (document.querySelector(`.${parent}.${active} .${hide}`) as HTMLElement);
                let facs = (viewer.querySelectorAll("*")[0] as HTMLElement);

                // console.log(facs);
                facs.style.width = `${viewer.offsetWidth}px`;
                facs.style.height = variant.image_size;
                this.classList.add(active);
            }

            var stateName = variant.opt;
            var stateParam = urlParam.get(variant.opt);
            var state = {
                [stateName]: stateParam
            };

            // get citation url class and update citation
            let citation_url_str = paramCheck(variant.chg_citation, "citation-url");
            let citation_url = document.getElementById(citation_url_str);

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
        let data = "image_switch";
        let storage = sessionStorage.getItem(data);

        let options: {
            name: string | null | undefined,
            variants:  [
                {
                    opt:  string | null | undefined,
                    title:  string | null | undefined,
                    urlparam:  string | null | undefined,
                    chg_citation:  string | null | undefined,
                    fade:  string | null | undefined,
                    column_small: {
                        class:  string | null | undefined,
                        percent:  string | null | undefined,
                    } | null | undefined,
                    column_full: {
                        class:  string | null | undefined,
                        percent:  string | null | undefined,
                    } | null | undefined,
                    hide: {
                        hidden: true,
                        class_to_hide:  string | null | undefined,
                        class_to_show:  string | null | undefined,
                        class_parent:  string | null | undefined,
                        resize:  string | null | undefined,
                    } | null | undefined,
                    image_size:  string | null | undefined,
                }
            ],
            active_class:  string | null | undefined,
            rendered_element: {
                a_class:  string | null | undefined,
                svg:  string | null | undefined
            } | null | undefined
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
        var variant = paramCheck(variant_check, {opt: opt});

        // check if sizes object with font sizes is not null or undefined
        try {
            var render_check = options.rendered_element;
        } catch (err) {
            console.log("Sizes obj not found. Creating default parameters.");
        }
        let rendered_element = paramCheck(render_check, {
            a_class: "nav-link btn btn-round",
            svg: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-image' viewBox='0 0 16 16'><path d='M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'/><path d='M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z'/></svg>"
        });

        let active = paramCheck(options.active_class, "active");
        let var_title = paramCheck(variant.title, "Facsimile on/off");

        this.innerHTML = `
            <small><label style="padding:.2em;">${var_title}:</label></small>
            <a title="${var_title}"
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
