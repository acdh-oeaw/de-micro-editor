const { AnnotationSlider } = require("./src/components/annotation_slider/main");
const { FullSize }  = require("./src/components/full_screen/main");
const { FontSize } = require("./src/components/font_size/main");
const { FontFamily } = require("./src/components/font_family/main");
const { ImageSwitch } = require("./src/components/image_switch/main");
const { ImageLoader } = require("./src/components/image_loader/main");
const { EditionPagination } = require("./src/components/image_loader/pagination");
const { WindowResize } = require("./src/components/image_loader/resize");
const { UrlSearchParamUpdate } = require("./src/components/search_params/main");
const { SetDataCookie } = require("./src/utils/setCookie");

"use strict";

class LoadEditor {

    constructor(options) {

        /*
        define configuration options
        verify if option object is available and has specific key
        if options are not available all key hold default values
        if one or several keys are not available, only these keys will hold default values
        */
        if (options && "aot" in options) {
            if (typeof options.aot == "object") {
                this.conf_aot = options.aot;
            } else {
                this.conf_aot = false
            }
        } else {
            this.conf_aot = {
                title: "Text Annotations",
                variants: [
                    {
                        opt: "text-aot-1",
                        opt_slider: "text-aot-1-slider",
                        title: "Text Annotation 1",
                        color: "red",
                        html_class: "aot-1",
                        css_class: "aot-1-update",
                        hide: false,
                        chg_citation: "citation-url",
                        features: {
                            all: false,
                            class: "single-feature"
                        }
                    }
                ],
                span_element: {
                    css_class: "badge-item"
                },
                active_class: "activated",
                rendered_element: {
                    label_class: "switch",
                    slider_class: "i-slider round"
                }
            }
        }
        if (options && "fs" in options) {
            if (typeof options.fs == "object") {
                this.conf_fs = options.fs;
            } else {
                this.conf_fs = false
            }
        } else {
            this.conf_fs = {
                name: "Change to fullscreen",
                variants:  [
                    {
                        opt: "edition-fullsize",
                        title: "Full screen on/off",
                        urlparam: "fullscreen",
                        chg_citation: "citation-url",
                        hide: {
                            hidden: true,
                            class_to_hide: "hide-reading"
        
                        }
                    }
                ],
                active_class: "active",
                rendered_element: {
                    a_class: "nav-link btn btn-round",
                    svg: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-fullscreen' viewBox='0 0 16 16'><path d='M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z'/></svg>"
                }
            }
        }
        if (options && "fos" in options) {
            if (typeof options.fos == "object") {
                this.conf_fos = options.fos;
            } else {
                this.conf_fos = false
            }
        } else {
            this.conf_fos = {
                name: "Change font size",
                variants:  [
                    {
                        opt: "select-fontsize",
                        title: "Font size",
                        urlparam: "fontsize",
                        chg_citation: "citation-url",
                        sizes: {
                            default: "default",
                            font_size_14: "14",
                            font_size_18: "18",
                            font_size_22: "22",
                            font_size_26: "26"
                        },
                        paragraph: "p",
                        p_class: "yes-index",
                        css_class: "font-size-"
                    }
                ],
                active_class: "active",
                html_class: "custom-select"
            }
        }
        if (options && "ff" in options) {
            if (typeof options.ff == "object") {
                this.conf_ff = options.ff;
            } else {
                this.conf_ff = false
            }
        } else {
            this.conf_ff = {
                name: "Change font family",
                variants:  [
                    {
                        opt: "select-font",
                        title: "Font family",
                        urlparam: "font",
                        chg_citation: "citation-url",
                        fonts: {
                            default: "default",
                            font1: "Times-New-Roman",
                            font2: "Courier-New",
                            font3: "Arial-serif"
                        },
                        paragraph: "p",
                        p_class: "yes-index",
                        css_class: ""
                    }
                ],
                active_class: "active",
                html_class: "custom-select"
            }
        }
        if (options && "is" in options) {
            if (typeof options.is == "object") {
                this.conf_is = options.is;
            } else {
                this.conf_is = false
            }
        } else {
            this.conf_is = {
                name: "enable/disable image viewer",
                variants:  [
                    {
                        opt: "edition-switch",
                        title: "Facsimile on/off",
                        urlparam: "image",
                        chg_citation: "citation-url",
                        fade: "fade",
                        column_small: {
                            "class": "col-md-6",
                            "percent": "50%"
                        },
                        column_full: {
                            "class": "col-md-12",
                            "percent": "100%"
                        },
                        hide: {
                            hidden: true,
                            class_to_hide: "osd-viewer",
                            class_to_show: "text-re",
                            class_parent: "pagination-tab",
                            resize: "resize-hide"
                        },
                        image_size: "1000px"
                    }
                ],
                active_class: "active",
                rendered_element: {
                    a_class: "nav-link btn btn-round",
                    svg: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-image' viewBox='0 0 16 16'><path d='M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'/><path d='M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z'/></svg>"
                }
            }
        }
        if (options && "il" in options) {
            if (typeof options.il == "object") {
                this.conf_il = options.il;
            } else {
                this.conf_il = false
            }
        } else {
            this.conf_il = {
                name: "load images in OSD viewer",
                opt: "image-loader",
                title: "Faksimiles",
                urlparam: "page",
                chg_citation: "citation-url",
                pag_link: ".pagination .nav-tabs .nav-item .nav-link",
                pag_tab: ".pagination-tab.tab-pane",
                img_size: "1000px",
                url: "https://id.acdh.oeaw.ac.at/auden-musulin-papers/",
                url_param: ".jpg?format=iiif",
                osd_target: "container",
                img_source: "container2",
                img_types: ["envelope", "sheet"],
                active_class: "active",
                inactive_class: "fade",
                bootstrap_class: "show",
            }
        }
        if (options && "ep" in options) {
            if (typeof options.ep == "object") {
                this.conf_ep = options.ep;
            } else {
                this.conf_ep = false
            }
        } else {
            this.conf_ep = {
                name: "Page Pagination",
                opt: "edition-pagination",
                title: "Page Pagination",
                urlparam: "page",
                chg_citation: "citation-url",
                pag_link: ".pagination-link",
                pag_tab: ".pagination-tab.tab-pane",
                img_size: "1000px",
                active_class: "active",
                inactive_class: "fade",
                bootstrap_class: "show",
                url: "https://id.acdh.oeaw.ac.at/auden-musulin-papers/",
                url_param: ".jpg?format=iiif",
                osd_target: "container",
                img_source: "container2"
            }
        }
        if (options && "wr" in options) {
            this.conf_wr = options.wr;
        } else {
            this.conf_wr = false;
        }
        if (options && "up" in options) {
            this.conf_up = options.up;
        } else {
            this.conf_up = false;
        }

        // initialize imported functions
        this.up = new UrlSearchParamUpdate();

        // set cookies if config options is available
        if (this.conf_aot) {
            try {
                this.set_cookie_aot = new SetDataCookie("conf_annotation_slider", this.conf_aot).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_fs) {
            try {
                this.set_cookie_fs = new SetDataCookie("conf_fullsize", this.conf_fs).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_fos) {
            try {
                this.set_cookie_fos = new SetDataCookie("conf_fontsize", this.conf_fos).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_ff) {
            try {
                this.set_cookie_ff = new SetDataCookie("conf_font_family", this.conf_ff).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_is) {
            try {
                this.set_cookie_is = new SetDataCookie("conf_image_switch", this.conf_is).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_il) {
            try {
                this.set_cookie_il = new SetDataCookie("conf_image_loader", this.conf_il).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_ep) {
            try {
                this.set_cookie_ep = new SetDataCookie("conf_ed_pagination", this.conf_ep).build();
            } catch (e) {
                console.log(e);
            }
        }

        // defines custom elements and assigns a class
        // renders html node and adds function
        // window onload triggers paramUrl functions
        if (this.conf_ep) {
            try {
                window.customElements.define('edition-pagination', EditionPagination);
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_il) {
            try {
                window.customElements.define('image-loader', ImageLoader);
                if (this.conf_up) {
                    window.onload = this.up.pageUrl();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_aot) {
            try {
                window.customElements.define('annotation-slider', AnnotationSlider);
                if (this.conf_up) {
                    window.onload = this.up.textFeatures();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_fs) {
            try {
                window.customElements.define('full-size', FullSize);
                if (this.conf_up) {
                    window.onload = this.up.fullSreen();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_fos) {
            try {
                window.customElements.define('font-size', FontSize);
                if (this.conf_up) {
                    window.onload = this.up.fontSize();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_ff) {
            try {
                window.customElements.define('font-family', FontFamily);
                if (this.conf_up) {
                    window.onload = this.up.fontFamily();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_is) {
            try {
                window.customElements.define('image-switch', ImageSwitch);
                if (this.conf_up) {
                    window.onload = this.up.viewerSwitch();
                }
                
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_wr) {
            try {
                window.customElements.define('window-resize', WindowResize);
            } catch (e) {
                console.log(e);
            }
        }

        // onpopstate = browser back and forward button to recognize classes
        window.onpopstate = () => {
            if (this.conf_aot && this.conf_up) {
                try {
                    this.up.textFeatures();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.conf_fs && this.conf_up) {
                try {
                    this.up.fullSreen();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.conf_fos && this.conf_up) {
                try {
                    this.up.fontSize();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.conf_ff && this.conf_up) {
                try {
                    this.up.fontFamily();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.conf_is && this.conf_up) {
                try {
                    this.up.viewerSwitch();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.conf_il && this.conf_up) {
                try {
                    this.up.pageUrl();
                } catch (e) {
                    console.log(e);
                }
            }
        }

        window.onload = () => {
                    
            if (window.location.hash == '') {
                return false;
            }
            
            let el = document.querySelector(window.location.hash);
            
            if (el !== null) {
            
                el.scrollIntoView({ behavior: 'smooth' });
                el.style.backgroundColor = "#FFFCA1";
            
            }
        
        }

    }

};

module.exports = LoadEditor;
