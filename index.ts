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

    aot: object | boolean;
    fs: object | boolean;
    fos: object | boolean;
    ff: object | boolean;
    is: object | boolean;
    il: object | boolean;
    ep: object | boolean;
    wr: object | boolean;
    up: object | boolean;
    upc: any;


    constructor(options: {
        aot: object | boolean,
        fs: object | boolean,
        fos: object | boolean,
        ff: object | boolean,
        is: object | boolean,
        il: object | boolean,
        ep: object | boolean,
        wr: object | boolean,
        up: object | boolean
    }) {

        /*
        define configuration options
        verify if option object is available and has specific key
        if options are not available all key hold default values
        if one or several keys are not available, only these keys will hold default values
        */
        if (options && "aot" in options) {
            this.aot = options.aot;
        } else {
            this.aot = {
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
            this.fs = options.fs;
        } else {
            this.fs = {
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
            this.fos = options.fos;
        } else {
            this.fos = {
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
            this.ff = options.ff;
        } else {
            this.ff = {
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
            this.is = options.is;
        } else {
            this.is = {
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
            this.il = options.il;
        } else {
            this.il = {
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
            this.ep = options.ep;
        } else {
            this.ep = {
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
            this.wr = options.wr;
        } else {
            this.wr = false;
        }
        if (options && "up" in options) {
            this.up = options.up;
        } else {
            this.up = false;
        }

        // initialize imported functions
        this.upc = new UrlSearchParamUpdate();

        // set cookies if config options is available
        if (this.aot) {
            try {
                new SetDataCookie("annotation_slider", this.aot).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.fs) {
            try {
                new SetDataCookie("fullsize", this.fs).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.fos) {
            try {
                new SetDataCookie("fontsize", this.fos).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.ff) {
            try {
                new SetDataCookie("font_family", this.ff).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.is) {
            try {
                new SetDataCookie("image_switch", this.is).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.il) {
            try {
                new SetDataCookie("image_loader", this.il).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.ep) {
            try {
                new SetDataCookie("ed_pagination", this.ep).build();
            } catch (e) {
                console.log(e);
            }
        }

        // defines custom elements and assigns a class
        // renders html node and adds function
        // window onload triggers paramUrl functions
        if (this.ep) {
            try {
                window.customElements.define('edition-pagination', EditionPagination);
            } catch (e) {
                console.log(e);
            }
        }
        if (this.il) {
            try {
                window.customElements.define('image-loader', ImageLoader);
                if (this.up) {
                    window.onload = this.upc.pageUrl();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.aot) {
            try {
                window.customElements.define('annotation-slider', AnnotationSlider);
                if (this.up) {
                    window.onload = this.upc.textFeatures();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.fs) {
            try {
                window.customElements.define('full-size', FullSize);
                if (this.up) {
                    window.onload = this.upc.fullSreen();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.fos) {
            try {
                window.customElements.define('font-size', FontSize);
                if (this.up) {
                    window.onload = this.upc.fontSize();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.ff) {
            try {
                window.customElements.define('font-family', FontFamily);
                if (this.up) {
                    window.onload = this.upc.fontFamily();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.is) {
            try {
                window.customElements.define('image-switch', ImageSwitch);
                if (this.up) {
                    window.onload = this.upc.viewerSwitch();
                }
                
            } catch (e) {
                console.log(e);
            }
        }
        if (this.wr) {
            try {
                window.customElements.define('window-resize', WindowResize);
            } catch (e) {
                console.log(e);
            }
        }

        // onpopstate = browser back and forward button to recognize classes
        window.onpopstate = () => {
            if (this.aot && this.up) {
                try {
                    this.upc.textFeatures();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.fs && this.up) {
                try {
                    this.upc.fullSreen();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.fos && this.up) {
                try {
                    this.upc.fontSize();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.ff && this.up) {
                try {
                    this.upc.fontFamily();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.is && this.up) {
                try {
                    this.upc.viewerSwitch();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.il && this.up) {
                try {
                    this.upc.pageUrl();
                } catch (e) {
                    console.log(e);
                }
            }
        }

        window.onload = () => {
                    
            if (window.location.hash == '') {

                return false;

            } else {

                var el: any = document.querySelector(window.location.hash);
            
                if (el !== null) {
                
                    el.scrollIntoView({ behavior: 'smooth' });
                    el.style.backgroundColor = "#FFFCA1";

                    setTimeout(function() {

                        el.style.backgroundColor = "transparent";
    
                    }, 10000);
                
                }

            }
            
        }

    }

}

module.exports = LoadEditor;
