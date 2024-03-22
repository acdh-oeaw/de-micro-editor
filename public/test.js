import { LoadEditor } from "../dist/index";

new LoadEditor({
  aot: {
    title: "Text Annotations",
    variants: [
      {
        opt: "feature1",
        title: "All features 1",
        color: "color-feature1",
        html_class: "html-class-feature1",
        css_class: "css-class-feature1",
        default: true,
        hide: {
          hidden: true,
          class: "html-class-feature15",
        },
        features: {
          all: true,
          class: "features-1",
        },
      },
      {
        opt: "feature2",
        title: "Feature 2",
        color: "color-feature2",
        html_class: "html-class-feature2",
        css_class: "css-class-feature2",
        hide: false,
        features: {
          all: false,
          class: "features-1",
        },
      },
      {
        opt: "feature3",
        title: "All Features 2",
        color: "color-feature3",
        html_class: "html-class-feature3",
        css_class: "css-class-feature3",
        features: {
          all: true,
          class: "features-2",
        },
      },
      {
        opt: "feature4",
        title: "Feature 4",
        color: "color-feature4",
        html_class: "html-class-feature4",
        css_class: "css-class-feature4",
        features: {
          all: false,
          class: "features-2",
        },
      },
    ],
  },
  ff: {
    name: "Change font family",
    variants: [
      {
        opt: "select-font",
        title: "Font family",
        fonts: {
          default: "default",
          font1: "Times-New-Roman",
          font2: "Courier-New",
          font3: "Arial-serif",
          font4: "Verdana-serif",
        },
        paragraph: "p",
        p_class: "yes-index",
      },
    ],
  },
  fs: {
    name: "Create full size mode",
    variants: [
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
      },
    ],
  },
  fos: {
    name: "Change font size",
    variants: [
      {
        opt: "select-fontsize",
        title: "Font size",
        sizes: {
          default: "default",
          font_size_14: "14",
          font_size_18: "18",
          font_size_22: "22",
          font_size_26: "26",
          font_size_32: "32",
        },
        paragraph: "p",
        p_class: "yes-index-2",
      },
    ],
  },
  wr: false,
  up: true,
  lang: {
    title: "Multi Language Support",
    variants: [
      {
        opt: "de",
        title: "German",
        class: "multi-lang nav-link pointer",
        map: {
          "index-en.html": "index.html",
          "index.html": "index.html",
          "index-fr.html": "index.html",
        },
      },
      {
        opt: "en",
        title: "English",
        class: "multi-lang nav-link pointer",
        map: {
          "index.html": "index-en.html",
          "index-en.html": "index-en.html",
          "index-fr.html": "index-en.html",
        },
      },
      {
        opt: "fr",
        title: "French",
        class: "multi-lang nav-link pointer",
        map: {
          "index.html": "index-fr.html",
          "index-fr.html": "index-fr.html",
          "index-en.html": "index-fr.html",
        },
      },
    ],
    active_class: "lang_active",
  },
});
