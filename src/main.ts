import "../src/css/micro-editor.css";
import "../src/style.css";
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
  is: {
    name: "enable/disable right window",
    variants: [
      {
        opt: "edition-switch1",
        title: "Hide Right Window",
        hide: {
          class_to_hide: "is-hide-container1",
          class_to_show: "is-show-container1",
        },
        column_full: {
          class: "col-md-12",
          percent: "100%",
        },
        column_small: {
          class: "col-md-6",
          percent: "50",
        },
      },
    ],
    rendered_element: {
      a_class: "nav-link btn btn-round",
      svg: "ON / OFF",
    },
  },
  // il: {
  //   name: "load images in OSD viewer",
  //   opt: "image-loader",
  //   title: "Faksimiles",
  //   urlparam: "page",
  //   chg_citation: "citation-url",
  //   pag_link: ".pagination .nav-tabs .nav-item .nav-link",
  //   pag_tab: ".pagination-tab.tab-pane",
  //   img_size: "1000px",
  //   url: "https://id.acdh.oeaw.ac.at/auden-musulin-papers/",
  //   url_param: ".jpg?format=iiif",
  //   osd_target: "container",
  //   img_source: "container2",
  //   img_types: ["envelope", "sheet"],
  //   active_class: "active",
  //   inactive_class: "fade",
  //   bootstrap_class: "show",
  // },
  // ep: {
  //   name: "Page Pagination",
  //   opt: "edition-pagination",
  //   title: "Page Pagination",
  //   urlparam: "page",
  //   chg_citation: "citation-url",
  //   pag_link: ".pagination-link",
  //   pag_tab: ".pagination-tab.tab-pane",
  //   img_size: "1000px",
  //   active_class: "active",
  //   inactive_class: "fade",
  //   bootstrap_class: "show",
  //   url: "https://id.acdh.oeaw.ac.at/auden-musulin-papers/",
  //   url_param: ".jpg?format=iiif",
  //   osd_target: "container",
  //   img_source: "container2",
  // },
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

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<div class="page">
  <div
    class="container hide-container1 hide-container2 hide-container3 hide-container4"
  >
    <nav id="start-anker">
      <ul>
        <li>
          <a href="#start-anker">Start</a>
        </li>
        <li>
          <a href="#aot">Annotation Slider</a>
        </li>
        <li>
          <a href="#ff">Select Font</a>
        </li>
        <li>
          <a href="#fos">Font Size</a>
        </li>
        <li>
          <a href="#is">Hide/Show Window</a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="container hide-container2 hide-container3 hide-container4">
    <div class="codebox">
      <a href="https://codepen.io/linxOD/pen/MWXbPVw" target="_blank">
        View Complete Example on CodePen
      </a>
    </div>
  </div>
  <div class="container hide-container2 hide-container3 hide-container4">
    <div class="codebox">
      <a href="https://codepen.io/linxOD/pen/OJEbowx" target="_blank">
        View Code on CodePen
      </a>
    </div>
    <div id="aot">
      <ul>
        <li>
          <full-size opt="edition-fullsize1"></full-size>
        </li>
        <li>
          <annotation-slider opt="feature3"></annotation-slider>
        </li>
        <li>
          <annotation-slider opt="feature1"></annotation-slider>
        </li>
        <li>
          <annotation-slider opt="feature2"></annotation-slider>
        </li>
        <li>
          <annotation-slider
            opt="feature4"
            onclick="myFunction()"
          ></annotation-slider>
        </li>
        <li>
          <multi-language opt="en"></multi-language>
        </li>
        <li>
          <multi-language opt="de"></multi-language>
        </li>
        <li>
          <multi-language opt="fr"></multi-language>
        </li>
      </ul>
    </div>
    <div class="paragraph">
      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,<br
          class="html-class-feature4"
        />
        sed diam nonumy eirmod
        <span class="html-class-feature1"
          >tempor <span class="html-class-feature15">invidunt</span> ut
          labore et <span class="html-class-feature2">dolore</span> magna
          aliquyam erat, sed diam voluptua.<br
            class="html-class-feature4"
          />
          At vero eos et accusam</span
        >
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
        sit amet, consetetur sadipscing elitr, sed diam
        <span class="html-class-feature2">nonumy</span> eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
        At vero eos et accusam et justo duo dolores et ea rebum.<br
          class="html-class-feature4"
        />
        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
        dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
        takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum
        <span class="html-class-feature1">iriure</span> dolor in hendrerit
        in vulputate velit esse molestie consequat,<br
          class="html-class-feature4"
        />
        vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan
        et iusto odio dignissim qui blandit
        <span class="html-class-feature1">praesent</span> luptatum zzril
        delenit augue duis dolore te feugait nulla facilisi.<br
          class="html-class-feature4"
        />
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit,<br
          class="html-class-feature4"
        />
        sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
        aliquam erat volutpat.<br class="html-class-feature4" />

        Ut wisi enim ad
        <span class="html-class-feature2">minim veniam</span>,<br
          class="html-class-feature4"
        />
        quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
        aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in
        hendrerit in vulputate velit esse molestie consequat, vel illum
        dolore eu feugiat nulla
        <span class="html-class-feature2">facilisis</span> at vero eros et
        accumsan et iusto odio dignissim qui blandit praesent luptatum zzril
        delenit augue duis dolore te feugait nulla facilisi.<br
          class="html-class-feature4"
        />

        Nam liber tempor cum soluta nobis eleifend option
        <span class="html-class-feature1">congue</span> nihil imperdiet
        doming id quod mazim placerat facer possim assum.<br
          class="html-class-feature4"
        />
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit,<br
          class="html-class-feature4"
        />
        sed diam nonummy nibh euismod tincidunt ut
        <span class="html-class-feature2"
          >laoreet dolore magna aliquam erat volutpat</span
        >.<br class="html-class-feature4" />
        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
        suscipit<br class="html-class-feature4" />
        lobortis nisl ut aliquip ex ea commodo consequat.<br
          class="html-class-feature4"
        />

        Duis autem vel eum iriure dolor in hendrerit in
        <span class="html-class-feature1">vulputate</span> velit esse
        molestie consequat,<br class="html-class-feature4" />
        vel illum dolore eu feugiat nulla facilisis.<br
          class="html-class-feature4"
        />
      </p>
    </div>
  </div>
  <div class="container hide-container1 hide-container3 hide-container4">
    <div class="codebox">
      <a href="https://codepen.io/linxOD/pen/ZERBqyY" target="_blank">
        View Code on CodePen
      </a>
    </div>
    <div id="ff">
      <ul>
        <li>
          <full-size opt="edition-fullsize2"></full-size>
        </li>
        <li>
          <font-family opt="select-font"></font-family>
        </li>
      </ul>
    </div>
    <div class="paragraph">
      <p class="yes-index">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
        erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
        et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
        et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
        accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
        no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
        dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
        dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in
        vulputate velit esse molestie consequat, vel illum dolore eu feugiat
        nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
        blandit praesent luptatum zzril delenit augue duis dolore te feugait
        nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing
        elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
        magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
        nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
        ex ea commodo consequat. Duis autem vel eum iriure dolor in
        hendrerit in vulputate velit esse molestie consequat, vel illum
        dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
        odio dignissim qui blandit praesent luptatum zzril delenit augue
        duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta
        nobis eleifend option congue nihil imperdiet doming id quod mazim
        placerat facer possim assum. Lorem ipsum dolor sit amet,
        consectetuer adipiscing elit, sed diam nonummy nibh euismod
        tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
        enim ad minim veniam, quis nostrud exerci tation ullamcorper
        suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis
        autem vel eum iriure dolor in hendrerit in vulputate velit esse
        molestie consequat, vel illum dolore eu feugiat nulla facilisis.
      </p>
    </div>
  </div>
  <div class="container hide-container1 hide-container2 hide-container4">
    <div class="codebox">
      <a href="https://codepen.io/linxOD/pen/rNKWqyV" target="_blank">
        View Code on CodePen
      </a>
    </div>
    <div id="fos">
      <ul>
        <li>
          <full-size opt="edition-fullsize3"></full-size>
        </li>
        <li>
          <font-size opt="select-fontsize"></font-size>
        </li>
      </ul>
    </div>
    <div class="paragraph">
      <p class="yes-index-2">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
        erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
        et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
        et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
        accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
        no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
        dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
        dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in
        vulputate velit esse molestie consequat, vel illum dolore eu feugiat
        nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
        blandit praesent luptatum zzril delenit augue duis dolore te feugait
        nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing
        elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
        magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
        nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
        ex ea commodo consequat. Duis autem vel eum iriure dolor in
        hendrerit in vulputate velit esse molestie consequat, vel illum
        dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto
        odio dignissim qui blandit praesent luptatum zzril delenit augue
        duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta
        nobis eleifend option congue nihil imperdiet doming id quod mazim
        placerat facer possim assum. Lorem ipsum dolor sit amet,
        consectetuer adipiscing elit, sed diam nonummy nibh euismod
        tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
        enim ad minim veniam, quis nostrud exerci tation ullamcorper
        suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis
        autem vel eum iriure dolor in hendrerit in vulputate velit esse
        molestie consequat, vel illum dolore eu feugiat nulla facilisis.
      </p>
    </div>
  </div>
</div>
`;
