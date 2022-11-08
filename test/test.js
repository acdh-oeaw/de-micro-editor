
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
                features: {
                    all: false,
                    class: "all-features"
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
                features: {
                    all: false,
                    class: "all-features"
                }
            },
            {
                opt: "feature3",
                opt_slider: "feature3-slider",
                title: "All Features",
                color: "color-feature3",
                features: {
                    all: true,
                    class: "all-features"
                }
            }
        ]
    },
    ff: {
        name: "Change font family",
        variants:  [
            {
                opt: "select-font",
                title: "Font family",
                fonts: {
                    default: "default",
                    font1: "Times-New-Roman",
                    font2: "Courier-New",
                    font3: "Arial-serif",
                    font4: "Verdana-serif"
                },
                paragraph: "p",
                p_class: "yes-index"
            }
        ]
    },
    fs: {
        name: "Create full size mode",
        variants:  [
            {
                opt: "edition-fullsize1",
                title: "Full screen on/off",
                hide: "hide-container1",
            },
            {
                opt: "edition-fullsize2",
                title: "Full screen on/off",
                hide: "hide-container2",
            },
            {
                opt: "edition-fullsize3",
                title: "Full screen on/off",
                hide: "hide-container3",
            },
            {
                opt: "edition-fullsize4",
                title: "Full screen on/off",
                hide: "hide-container4",
            },
            {
                opt: "edition-fullsize5",
                title: "Full screen on/off",
                hide: "hide-container5",
            }
        ]
    },
    fos: {
        name: "Change font size",
        variants:  [
            {
                opt: "select-fontsize",
                title: "Font size",
                sizes: {
                    default: "default",
                    font_size_14: "14",
                    font_size_18: "18",
                    font_size_22: "22",
                    font_size_26: "26",
                    font_size_32: "32"
                },
                paragraph: "p",
                p_class: "yes-index-2"
            }
        ]
    },
    is: {
        name: "enable/disable right window",
        variants:  [
            {
                opt: "edition-switch1",
                title: "Hide Right Window",
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
