
var editor = new LoadEditor({
    aot:  {
        title: "Text Annotations",
        variants: [
            {
                opt: "feature1",
                opt_slider: "feature1-slider",
                title: "Feature 1",
                color: "color-feature1",
                html_class: "html-class-feature1",
                css_class: "css-class-feature1",
                hide: false,
                chg_citation: "citation-url",
                features: {
                    all: false,
                    class: "single-feature"
                }
            },
            {
                opt: "feature2",
                opt_slider: "feature2-slider",
                title: "Feature 2",
                color: "color-feature2",
                html_class: "html-class-feature2",
                css_class: "css-class-feature2",
                hide: true,
                chg_citation: "citation-url",
                features: {
                    all: false,
                    class: "single-feature"
                }
            },
            {
                opt: "feature3",
                opt_slider: "feature3-slider",
                title: "All Features",
                hide: false,
                chg_citation: "citation-url",
                features: {
                    all: true,
                    class: "all-features"
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
    },
    ff: {
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
                    font3: "Arial-serif",
                    font4: "Verdana-serif"
                },
                paragraph: "p",
                p_class: "yes-index",
                css_class: ""
            }
        ],
        active_class: "active",
        html_class: "custom-select"
    },
    fs: {
        name: "Create full size mode",
        variants:  [
            {
                opt: "edition-fullsize1",
                title: "Full screen on/off",
                urlparam: "fullscreen",
                chg_citation: "citation-url",
                hide: "hide-container1",
                to_hide: "fade"
            },
            {
                opt: "edition-fullsize2",
                title: "Full screen on/off",
                urlparam: "fullscreen",
                chg_citation: "citation-url",
                hide: "hide-container2",
                to_hide: "fade"
            },
            {
                opt: "edition-fullsize3",
                title: "Full screen on/off",
                urlparam: "fullscreen",
                chg_citation: "citation-url",
                hide: "hide-container3",
                to_hide: "fade"
            },
            {
                opt: "edition-fullsize4",
                title: "Full screen on/off",
                urlparam: "fullscreen",
                chg_citation: "citation-url",
                hide: "hide-container4",
                to_hide: "fade"
            },
            {
                opt: "edition-fullsize5",
                title: "Full screen on/off",
                urlparam: "fullscreen",
                chg_citation: "citation-url",
                hide: "hide-container5",
                to_hide: "fade"
            }
        ],
        active_class: "active",
        render_class: "nav-link btn btn-round",
        render_svg: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-fullscreen' viewBox='0 0 16 16'><path d='M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z'/></svg>"
    },
    fos: {
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
                    font_size_26: "26",
                    font_size_32: "32"
                },
                paragraph: "p",
                p_class: "yes-index-2",
                css_class: "font-size-"
            }
        ],
        active_class: "active",
        html_class: "custom-select"
    },
    is: {
        name: "enable/disable right window",
        variants:  [
            {
                opt: "edition-switch1",
                title: "Hide Right Window",
                urlparam: "right-window",
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
                    class_to_hide: "is-hide-container1",
                    class_to_show: "is-show-container1",
                    class_parent: "is-hide-show-wrapper",
                    resize: "resize-hide"
                },
                image_size: "1000px"
            }
        ],
        active_class: "active",
        rendered_element: {
            a_class: "nav-link btn btn-round",
            svg: "ON / OFF"
        }
    },
    // il: {
    //     name: "load images in OSD viewer",
    //     opt: "image-loader",
    //     title: "Faksimiles",
    //     urlparam: "page",
    //     chg_citation: "citation-url",
    //     pag_link: ".pagination .nav-tabs .nav-item .nav-link",
    //     pag_tab: ".pagination-tab.tab-pane",
    //     img_size: "1000px",
    //     url: "https://id.acdh.oeaw.ac.at/auden-musulin-papers/",
    //     url_param: ".jpg?format=iiif",
    //     osd_target: "container",
    //     img_source: "container2",
    //     img_types: ["envelope", "sheet"],
    //     active_class: "active",
    //     inactive_class: "fade",
    //     bootstrap_class: "show",
    // },
    // ep: {
    //     name: "Page Pagination",
    //     opt: "edition-pagination",
    //     title: "Page Pagination",
    //     urlparam: "page",
    //     chg_citation: "citation-url",
    //     pag_link: ".pagination-link",
    //     pag_tab: ".pagination-tab.tab-pane",
    //     img_size: "1000px",
    //     active_class: "active",
    //     inactive_class: "fade",
    //     bootstrap_class: "show",
    //     url: "https://id.acdh.oeaw.ac.at/auden-musulin-papers/",
    //     url_param: ".jpg?format=iiif",
    //     osd_target: "container",
    //     img_source: "container2"
    // },
    wr: false,
    up: true
});
