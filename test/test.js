const { LoadEditor } = require("../src/main");

var annot =  {
    title: "Text Annotations",
    variants: [
        {
            opt: "deleted",
            opt_slider: "deleted-slider",
            title: "Deleted",
            color: "red",
            html_class: "del",
            css_class: "strikethrough",
            hide: true,
            chg_citation: "citation-url",
            features: {
                all: false,
                class: "single-feature"
            }
        },
        {
            opt: "underlined",
            opt_slider: "underlined-slider",
            title: "Underlined",
            color: "blue",
            html_class: "hi-underline",
            css_class: ["underline", "italic"],
            hide: false,
            chg_citation: "citation-url",
            features: {
                all: false,
                class: "single-feature"
            }
        },
        {
            opt: "whitespace",
            opt_slider: "whitespace-slider",
            title: "Original white spaces",
            color: "green",
            html_class: "space",
            css_class: "whitespace",
            hide: false,
            chg_citation: 1,
            features: {
                all: false,
                class: "single-feature"
            }
        },
        {
            opt: "unclear",
            opt_slider: "unclear-slider",
            title: "Unclear",
            color: "grey",
            html_class: "abbr",
            css_class: "unclear",
            hide: false,
            chg_citation: "citation-url",
            features: {
                all: false,
                class: "single-feature"
            }
        },
        {
            opt: "text-features",
            opt_slider: "text-features-slider",
            title: "Original text features",
            color: "grey",
            html_class: "undefined",
            css_class: "undefined",
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
};
var family = {
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
};
var fullscreen = {
    name: "Create full size mode",
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
};
var fontsize = {
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
};
var img_switch = {
    name: "enable/disable image viewer",
    variants:  [
        {
            opt: "edition-switch",
            title: "Facsimile on/off",
            urlparam: "image",
            chg_citation: "citation-url",
            hide: {
                hidden: true,
                class_to_hide: "osd-viewer",
                class_to_show: "text-re",
                class_parent: "pagination-tab",
                resize: "resize-hide"
            }
        }
    ],
    active_class: "active",
    rendered_element: {
        a_class: "nav-link btn btn-round",
        svg: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-image' viewBox='0 0 16 16'><path d='M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'/><path d='M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z'/></svg>"
    }
};

var editor = new LoadEditor(annot, fullscreen, fontsize, family, img_switch);
editor.cookie();
editor.build();

function testIfCookie() {
    let cookie = localStorage.getItem("conf_annotation_slider");
    if (cookie) {
        return "Test passed";
    } else {
        return "Test failed";
    }
}

testIfCookie();
