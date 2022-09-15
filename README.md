# Digital Edition Micro-Editor

## Introduction
The package offers building blocks for manipulating text annotation options of Digital Editions. It comes with binary on/off features to highlight text with css classes.
Furthermore, a build in OSD image viewer offers better representation of facsimiles. The Micro-Editor comes with some more options like: choosing font family and font size as well as full-screen mode and image switch `(on/off)`.

## Projects currently using the package

* [AMP](https://amp.acdh.oeaw.ac.at/amp-transcript__0022.html)
* [Freud HKA](https://freud-digital.github.io/frd-static/sfe-1904-002.html?break=off&person=off&place=off&keyword=off&dream=off&text-variant=off&editorial-notes=off&fullscreen=off&fontsize=default&font=default)

## Installation
`npm install de-micro-editor`

In JS:

`const { LoadEditor } = require("de-micro-editor");`

or

`import { LoadEditor } from "de-micro-editor";`

In HTML:

`<script src="https://unpkg.com/de-micro-editor@0.1.0/dist/de-editor.min.js"></script>`

## Custom Elements (HTML)
The package renders 7 different custom elements and creates event listeners to triggers defined functions. Each custom element takes an attribute `opt` which connects the element with a specific configurations parameter variant (see configuration description below). The window-resize element also takes an attribute `pos` which specifies a specific window to resize. The edition-pagination element uses attributes like `pos facs and data-type` to access window, element ids like images and data-type for further specification. The last two attributes are optional.

```
<annotation-slider opt="break"></annotation-slider>

<font-family opt="select-font"></font-family>

<font-size opt="select-fontsize"></font-size> 

<full-size opt="edition-fullsize"></full-size> 

<image-switch opt="edition-switch"></image-switch>

<window-resize opt="resizing" pos="1"></window-resize>

<edition-pagination 
    opt="edition-pagination"
    pos="1" 
    facs="id" 
    data-type="envelope">
</edition-pagination>
```

## Initialize Load Editor
```
var editor = new LoadEditor({...});
```

## Configuration Options
### class aot
Options for element annotation-slider. If a configuration is present it loads parameters and stores it as session cookies. Default: null. 
### Example of class aot:
All string values can be replaced and the "variants array" can hold multiple objects.
```
aot: {
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
    ],
    # additional css class for visualizing text
    span_element: {
        css_class: "badge-item"
    },
    # class to define state of the custom element
    active_class: "activated",
    # css class for HTML switch to turn on/off options
    rendered_element: {
        label_class: "switch",
        slider_class: "i-slider round"
},
```
### class ff
```
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
                font3: "Arial-serif"
            },
            paragraph: "p",
            p_class: "yes-index",
            css_class: ""
        }
    ],
    active_class: "active",
    html_class: "custom-select"
},
```

### class fs
```
fs: {
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
},
```

### class fos
```
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
                font_size_26: "26"
            },
            paragraph: "p",
            p_class: "yes-index",
            css_class: "font-size-"
        }
    ],
    active_class: "active",
    html_class: "custom-select"
},
```

### class is
```
is: {
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
},
```

### class il
```
il: {
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
},
```

### class ep
```
ep: {
    name: "Page Pagination",
    opt: "edition-pagination",
    title: "Page Pagination",
    urlparam: "page",
    chg_citation: "citation-url",
    pag_link: ".pagination .nav-tabs .nav-item .nav-link",
    pag_tab: ".pagination-tab.tab-pane",
    img_size: "1000px",
    active_class: "active",
    inactive_class: "fade",
    bootstrap_class: "show",
    url: "https://id.acdh.oeaw.ac.at/auden-musulin-papers/",
    url_param: ".jpg?format=iiif",
    osd_target: "container",
    img_source: "container2"
},
```
