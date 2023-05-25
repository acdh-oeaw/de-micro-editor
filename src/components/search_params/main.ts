const {
  addMarkup,
  removeMarkup,
  uptState,
  hideLoading,
  paramCheck,
} = require("../../utils/utils");
const OpenSeadragon = require("openseadragon");

export class UrlSearchParamUpdate {
  fullSreen() {
    // get custom element and access opt attribute
    let el = document.getElementsByTagName("full-size");
    let opt = el[0].getAttribute("opt");
    if (typeof opt !== "string") {
      console.log("No 'opt' attribute in custom element font-size found!");
    }

    // config name is predfined in index.ts
    let data = "fullsize";

    // get config by accessing sessions storage
    let storage: string | null = sessionStorage.getItem(data);

    if (storage) {
      var options:
        | {
            name: string | null | undefined;
            variants:
              | [
                  {
                    opt: string | null | undefined;
                    title: string | null | undefined;
                    hide: string | null | undefined;
                    to_hide: string | null | undefined;
                    chg_citation: string | null | undefined;
                    urlparam: string | null | undefined;
                  }
                ]
              | null;
            active_class: string | null | undefined;
            render_class: string | null | undefined;
            render_svg: string | null | undefined;
          }
        | null
        | undefined = JSON.parse(storage);

      if (!options) {
        alert("Please turn on cookies to display content!");
      }

      // to manipulate url parameters construct url by getting current url
      let url: any = new URL(location.href);
      let urlParam: any = new URLSearchParams(url.search);

      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check = options.variants.find((v) => v.opt === opt);
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      var variant = paramCheck(variant_check, { opt: opt });

      // if variant obj contains urlparam string check urlparams parameters
      var urlparam = paramCheck(variant.urlparam, "fullscreen");

      // check for option param or return default value
      var active = paramCheck(options.active_class, "active");

      var hide = paramCheck(variant.hide, "hide-container");

      var hidden = paramCheck(variant.to_hide, "fade");

      if (urlParam.get(urlparam) == null) {
        urlParam.set(urlparam, "off");
      }

      if (!["on", "off"].includes(urlParam.get(urlparam))) {
        console.log(
          `fullscreen=${urlParam.get(urlparam)} is not a selectable option.`
        );
        urlParam.set(urlparam, "off");
      }

      if (urlParam.get(urlparam) == "off") {
        document.querySelectorAll(`.${hide}`).forEach((el) => {
          el.classList.remove(hidden);
          let svg_show = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
                                            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                                        </svg>
                                    `;
          let btn = document.getElementById(opt);
          btn.innerHTML = svg_show;
          btn.classList.remove(active);

          /* if value is off it should not be part of the urlsearchparams */
          urlParam.delete(urlparam);
        });
      }

      if (urlParam.get(urlparam) == "on") {
        document.querySelectorAll(`.${hide}`).forEach((el) => {
          el.classList.add(hidden);
          let svg_hide = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                                            <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
                                        </svg>
                                    `;
          let btn = document.getElementById(opt);
          btn.innerHTML = svg_hide;
          btn.classList.add(active);
        });
      }

      var citation_url_str = paramCheck(variant.chg_citation, "citation-url");
      var citation_url = document.getElementById(citation_url_str);
      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: true,
        cit: citation_url,
        state: false,
        href: href,
      });
    }
  }

  fontSize() {
    // get element to access opt attribute
    // opt required to connect to specific custom element
    let el = document.getElementsByTagName("font-size");
    var id = el[0].getAttribute("opt");

    // check if user set opt attribute
    if (typeof id !== "string") {
      console.log("No 'opt' attribute in custom element font-size found!");
    }

    // string fontsize is variable to access session cookies
    let data = "fontsize";
    let storage: string | null = sessionStorage.getItem(data);

    if (storage) {
      // define options object and parse session cookie as json
      var options:
        | {
            name: string | null | undefined;
            variants:
              | [
                  {
                    opt: string | null | undefined;
                    title: string | null | undefined;
                    urlparam: string | null | undefined;
                    sizes:
                      | {
                          default: string | null | undefined;
                          font_size_14: string | null | undefined;
                          font_size_18: string | null | undefined;
                          font_size_22: string | null | undefined;
                          font_size_26: string | null | undefined;
                        }
                      | null
                      | undefined;
                    paragraph: string | null | undefined;
                    p_class: string | null | undefined;
                    css_class: string | null | undefined;
                  }
                ]
              | null
              | undefined;
            active_class: string | null | undefined;
            html_class: string | null | undefined;
          }
        | null
        | undefined = JSON.parse(storage);

      if (!options) {
        alert("Please turn on cookies to display content!");
      }

      // get url and urlparams to manipulate and update
      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);

      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check = options.variants;
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      var variants = paramCheck(variant_check, [{ opt: id }]);

      for (let v in variants) {
        // get urlparam key
        var urlparam = paramCheck(variants[v].urlparam, "fontsize");

        // get citation url key and HTMLElement
        var citation_url_str = paramCheck(
          variants[v].chg_citation,
          "citation-url"
        );
        var citation_url = document.getElementById(citation_url_str);

        // define paragraph HTML element name
        let p_change = paramCheck(variants[v].paragraph, "p");
        // define class to change font sizes (not all paragraphs might need to be changed)
        let p_class = paramCheck(variants[v].p_class, "yes-index");

        // check if sizes object with font sizes is not null or undefined
        try {
          var size_check = variants[v].sizes;
        } catch (err) {
          console.log("Sizes obj not found. Creating default parameters.");
        }
        let size = paramCheck(size_check, {
          default: "default",
          font_size_14: "14",
          font_size_18: "18",
          font_size_22: "22",
          font_size_26: "26",
        });

        // define font size name before size
        var css_class = paramCheck(variants[v].css_class, "font-size-");

        // check for null value in url params
        if (urlParam.get(urlparam) == null) {
          urlParam.set(urlparam, "default");
        }

        // check if provided urlparam value is selectable
        if (!Object.values(size).includes(urlParam.get(urlparam))) {
          console.log(
            `${urlparam}=${urlParam.get(urlparam)} is not a selectable option.`
          );
          urlParam.set(urlparam, "default");
        } else {
          // if valid urlparam is found change font sizes of paragraphs
          let paragraph = document.querySelectorAll(`${p_change}.${p_class}`);

          var new_value =
            urlParam.get(urlparam) !== "default"
              ? css_class + urlParam.get(urlparam)
              : urlParam.get(urlparam);

          // change select option value based on provided url param
          var select = document.getElementById(
            variants[v].opt
          ) as HTMLSelectElement;
          select.value = new_value;

          // finally, changing selected paragraph font size
          paragraph.forEach((el) => {
            for (let s in size) {
              if (size[s] !== "default") {
                el.classList.remove(css_class + size[s]);
              }
            }
            if (new_value !== "default") {
              el.classList.add(new_value);
            }
          });
        }
      }

      /* if value is off it should not be part of the urlsearchparams */
      if (urlParam.get(urlparam) == "default") {
        urlParam.delete(urlparam);
      }

      // change browser history state
      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: true,
        cit: citation_url,
        state: false,
        href: href,
      });
    }
  }

  fontFamily() {
    let el = document.getElementsByTagName("font-family");
    let id = el[0].getAttribute("opt");
    // check if user set opt attribute
    if (typeof id !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }

    let data = "font_family";
    let storage = sessionStorage.getItem(data);

    if (storage) {
      let options:
        | {
            name: string | null | undefined;
            variants:
              | [
                  {
                    opt: string | null | undefined;
                    title: string | null | undefined;
                    urlparam: string | null | undefined;
                    chg_citation: string | null | undefined;
                    fonts:
                      | {
                          default: string | null | undefined;
                          font1: string | null | undefined;
                          font2: string | null | undefined;
                          font3: string | null | undefined;
                        }
                      | null
                      | undefined;
                    paragraph: string | null | undefined;
                    p_class: string | null | undefined;
                    css_class: string | null | undefined;
                  }
                ]
              | null
              | undefined;
            active_class: string | null | undefined;
            html_class: string | null | undefined;
          }
        | null
        | undefined = JSON.parse(storage);

      if (!options) {
        alert("Please turn on cookies to display content!");
      }

      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);

      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check = options.variants;
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      var variants = paramCheck(variant_check, [{ opt: id }]);

      for (let v in variants) {
        // get urlparam key
        var urlparam = paramCheck(variants[v].urlparam, "font");

        // get citation url key and HTMLElement
        var citation_url_str = paramCheck(
          variants[v].chg_citation,
          "citation-url"
        );
        var citation_url = document.getElementById(citation_url_str);

        // define paragraph HTML element name
        let p_change = paramCheck(variants[v].paragraph, "p");
        // define class to change font sizes (not all paragraphs might need to be changed)
        let p_class = paramCheck(variants[v].p_class, "yes-index");

        // check if sizes object with font sizes is not null or undefined
        try {
          var family_check = variants[v].fonts;
        } catch (err) {
          console.log(
            "Font family object not found. Creating default parameters."
          );
        }
        let family = paramCheck(family_check, {
          default: "default",
          font1: "Times-New-Roman",
          font2: "Courier-New",
          font3: "Arial-serif",
        });

        if (urlParam.get(urlparam) == null) {
          urlParam.set(urlparam, "default");
        }

        if (!Object.values(family).includes(urlParam.get(urlparam))) {
          console.log(
            `font=${urlParam.get(urlparam)} is not a selectable option.`
          );
          urlParam.set(urlparam, "default");
        } else {
          let paragraph = document.querySelectorAll(`${p_change}.${p_class}`);
          if (urlParam.get(urlparam) !== "default") {
            var new_value = urlParam.get(urlparam);
          } else {
            var new_value = urlParam.get(urlparam);
          }

          // change select option value based on provided url param
          var select = document.getElementById(
            variants[v].opt
          ) as HTMLSelectElement;
          select.value = new_value;

          // finally, change font-size of selected paragraphs
          paragraph.forEach((el) => {
            for (let f in family) {
              if (family[f] !== "default") {
                el.classList.remove(family[f].toLowerCase());
              }
            }
            if (new_value !== "default") {
              el.classList.add(new_value.toLowerCase());
            }
          });
        }
      }

      /* if value is off it should not be part of the urlsearchparams */
      if (urlParam.get(urlparam) == "default") {
        urlParam.delete(urlparam);
      }

      // update browser history state
      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: true,
        cit: citation_url,
        state: false,
        href: href,
      });
    }
  }

  viewerSwitch() {
    let el = document.getElementsByTagName("image-switch");
    let opt = el[0].getAttribute("opt");
    // check if user set opt attribute
    if (typeof opt !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }

    let data = "image_switch";
    let storage = sessionStorage.getItem(data);

    if (storage) {
      let options:
        | {
            name: string | null | undefined;
            variants: [
              {
                opt: string | null | undefined;
                title: string | null | undefined;
                urlparam: string | null | undefined;
                chg_citation: string | null | undefined;
                fade: string | null | undefined;
                column_small:
                  | {
                      class: string | null | undefined;
                      percent: string | null | undefined;
                    }
                  | null
                  | undefined;
                column_full:
                  | {
                      class: string | null | undefined;
                      percent: string | null | undefined;
                    }
                  | null
                  | undefined;
                hide:
                  | {
                      hidden: true;
                      class_to_hide: string | null | undefined;
                      class_to_show: string | null | undefined;
                      class_parent: string | null | undefined;
                      resize: string | null | undefined;
                    }
                  | null
                  | undefined;
                image_size: string | null | undefined;
              }
            ];
            active_class: string | null | undefined;
            rendered_element:
              | {
                  a_class: string | null | undefined;
                  svg: string | null | undefined;
                }
              | null
              | undefined;
          }
        | null
        | undefined = JSON.parse(storage);

      if (!options) {
        alert("Please turn on cookies to display content!");
      }

      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);

      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check = options.variants.find((v) => v.opt === opt);
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      var variant = paramCheck(variant_check, { opt: opt });

      // check for option param or return default value
      var active = paramCheck(options.active_class, "active");

      // check if sizes object with font sizes is not null or undefined
      try {
        var hide_check = variant.hide;
      } catch (err) {
        console.log("Hide object not found. Creating default parameters.");
      }
      let hide_checked = paramCheck(hide_check, {
        hidden: true,
        class_to_hide: "hide-container1",
        class_to_show: "show-container1",
        class_parent: "hide-show-wrapper",
        resize: "resize-hide",
      });

      // get classes from params for container to hide and show
      let hidden = paramCheck(hide_checked.hidden, true);
      let hide = paramCheck(hide_checked.class_to_hide, "hide-container1");
      let show = paramCheck(hide_checked.class_to_show, "show-container1");
      let resize = paramCheck(hide_checked.resize, "resize-hide");

      // get class for wrapper of hide show container
      let parent = paramCheck(hide_checked.class_parent, "hide-show-wrapper");

      // get urlparam key
      var urlparam = paramCheck(variant.urlparam, "image");

      // get fade class
      let fade = paramCheck(variant.fade, "fade");

      // check if sizes object with font sizes is not null or undefined
      try {
        var small_check = variant.column_small;
      } catch (err) {
        console.log("Hide object not found. Creating default parameters.");
      }
      let column_small_check = paramCheck(small_check, {
        class: "col-md-6",
        percent: "50%",
      });

      // check if sizes object with font sizes is not null or undefined
      try {
        var large_check = variant.column_full;
      } catch (err) {
        console.log("Hide object not found. Creating default parameters.");
      }
      let column_full_checked = paramCheck(large_check, {
        class: "col-md-12",
        percent: "100%",
      });

      // get classes and style for hide show container resizing
      let column_small = [
        paramCheck(column_small_check.class, "col-md-6"),
        paramCheck(column_small_check.percent, "50%"),
      ];
      let column_full = [
        paramCheck(column_full_checked.class, "col-md-12"),
        paramCheck(column_full_checked.percent, "100%"),
      ];

      // check if urlparam value is null and set to default
      if (urlParam.get(urlparam) == null) {
        urlParam.set(urlparam, "on");
      }

      // if urlparam value is not valid set to default
      if (!["on", "off"].includes(urlParam.get(urlparam))) {
        console.log(
          `image=${urlParam.get(urlparam)} is not a selectable option.`
        );
        urlParam.set(urlparam, "on");
      }

      // if urlparam value is 'on' show container
      if (urlParam.get(urlparam) == "on") {
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
          el.classList.remove(fade);
        });
        document.getElementById(opt).classList.add(active);

        /* if value is off it should not be part of the urlsearchparams */
        urlParam.delete(urlparam);
      }

      // if urlparam value is 'off' hide container
      if (urlParam.get(urlparam) == "off") {
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
          el.classList.add(fade);
        });

        // works only with one image viewer
        try {
          var viewer = document.querySelector(
            `.${parent}.${active} .${hide}`
          ) as HTMLElement;
        } catch (err) {
          console.log(
            `HTML class elements .${parent}.${active} .${hide} not found. Please make sure your HTML site contains them.`
          );
        }

        try {
          var facs = viewer.querySelectorAll("*")[0] as HTMLElement;
          // set style height and width
          // get iamge_size from params
          // let image_size = paramCheck(variant.image_size, "500px");
          facs.style.width = `${viewer.offsetWidth}px`;
          facs.style.height = `${viewer.offsetHeight}px`;
        } catch (err) {
          console.log(
            `HTML class elements .${parent}.${active} .${hide} not found. Please make sure your HTML site contains them.`
          );
        }

        // remove active class
        document.getElementById(opt).classList.remove(active);
      }

      // get citation url class and update citation
      let citation_url_str = paramCheck(variant.chg_citation, "citation-url");
      let citation_url = document.getElementById(citation_url_str);

      // update browser history state
      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: true,
        cit: citation_url,
        state: false,
        href: href,
      });
    }
  }

  textFeatures() {
    let data = "annotation_slider";

    let storage = sessionStorage.getItem(data);
    if (storage) {
      let options:
        | {
            title: string | null | undefined;
            variants:
              | [
                  {
                    opt: string | null | undefined;
                    opt_slider: string | null | undefined;
                    title: string | null | undefined;
                    color: string | null | undefined;
                    html_class: string | null | undefined;
                    css_class: string | null | undefined;
                    hide: {
                      hidden: boolean;
                      class: string;
                    } | null;
                    chg_citation: string | null | undefined;
                    features: {
                      all: boolean | null | undefined;
                      class: string | null | undefined;
                    };
                  }
                ]
              | null
              | undefined;
            span_element:
              | {
                  css_class: string | null | undefined;
                }
              | null
              | undefined;
            active_class: string | null | undefined;
            rendered_element:
              | {
                  label_class: string | null | undefined;
                  slider_class: string | null | undefined;
                }
              | null
              | undefined;
          }
        | null
        | undefined = JSON.parse(storage);

      if (!options) {
        alert(`Please turn on cookies to display content.\n
                    Or check if configuration files path match data-target and data-path property.`);
      }

      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);

      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_all_check = options.variants.filter(
          (v) => v.features.all === true
        );
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      let variantAll = paramCheck(variant_all_check, [
        {
          opt: "text-features",
          features: {
            all: true,
            class: "all-features",
          },
        },
      ]);

      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check = options.variants.filter(
          (v) => v.features.all === false
        );
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      let allVariants = document.getElementsByTagName("annotation-slider");
      let allVariantsObjs = [];
      for (let i in allVariants) {
        try {
          var attrOpt = allVariants[i].getAttribute("opt");
        } catch (err) {
          // console.log(err);
        }
        if (attrOpt) {
          allVariantsObjs.push({
            opt: attrOpt,
            features: {
              all: false,
              class: "single-feature",
            },
          });
        }
      }
      let variants: any = paramCheck(variant_check, allVariantsObjs);

      // try {
      //     var features_check = variants.features;
      // } catch (err) {
      //     console.log("Features object in variant not found. Creating default parameters.")
      // }
      // let features = paramCheck(features_check, {
      //     all: false,
      //     class: "single-feature"
      // })

      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check_bool = options.variants.filter(
          (v) => typeof v.features.all !== "boolean"
        );
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      let wrg_ft = paramCheck(variant_check_bool, []);
      if (wrg_ft) {
        for (let w of wrg_ft) {
          console.log(
            `Type of variant ${w} config. "features.all" must be boolean (true or false)`
          );
        }
      }

      // check if sizes object with font sizes is not null or undefined
      try {
        var span_check = options.span_element;
      } catch (err) {
        console.log("Hide object not found. Creating default parameters.");
      }
      let span_checked = paramCheck(span_check, {
        css_class: "badge-item",
      });

      // get params from options
      let style = paramCheck(span_checked, "badge-item");
      let active = paramCheck(options.active_class, "active");

      // set count to verify state of sliders
      let count_active = 0;
      let count = 0;
      var optAll = paramCheck(variantAll[0].opt, `text-features`);
      for (let v in variants) {
        let opt = paramCheck(variants[v].opt, `any-feature-${v}`);
        let color = paramCheck(variants[v].color, `color-${opt}`);
        let html_class = paramCheck(
          variants[v].html_class,
          `html-class-${opt}`
        );
        let css_class = paramCheck(variants[v].css_class, `css-class-${opt}`);
        let opt_slider = paramCheck(variants[v].opt_slider, `${opt}-slider`);
        let hide = paramCheck(variants[v].hide, false);

        if (urlParam.get(opt) === null) {
          // urlParam.set(opt, "off");
          let selected = removeMarkup(
            html_class,
            css_class,
            color,
            hide,
            style
          );

          try {
            let slider = document.getElementById(opt_slider) as HTMLElement;
            slider.classList.remove(color);
            slider.removeAttribute("data");
            slider.classList.remove("slider-number");
          } catch (err) {
            console.log(`slider class ${opt_slider} not found!`);
          }

          if (
            (document.getElementById(opt) as HTMLInputElement).checked === true
          ) {
            (document.getElementById(opt) as HTMLInputElement).checked = false;
            (document.getElementById(opt) as HTMLInputElement).classList.remove(
              active
            );
          }
        } else if (!["on", "off"].includes(urlParam.get(opt))) {
          console.log(
            `${opt}=${urlParam.get(opt)} is not a selectable option.`
          );
          urlParam.set(opt, "off");

          let selected = removeMarkup(
            html_class,
            css_class,
            color,
            hide,
            style
          );

          try {
            let slider = document.getElementById(opt_slider) as HTMLElement;
            slider.classList.remove(color);
            slider.removeAttribute("data");
            slider.classList.remove("slider-number");
          } catch (err) {
            console.log(`slider class ${opt_slider} not found!`);
          }

          if (
            (document.getElementById(opt) as HTMLInputElement).checked === true
          ) {
            (document.getElementById(opt) as HTMLInputElement).checked = false;
            (document.getElementById(opt) as HTMLInputElement).classList.remove(
              active
            );
          }
        } else if (urlParam.get(opt) === "on") {
          count_active += 1;

          let selected = addMarkup(html_class, css_class, color, hide, style);

          try {
            let slider = document.getElementById(opt_slider) as HTMLElement;
            slider.setAttribute("data", selected);
            count += parseInt(selected);
            slider.classList.add("slider-number");
            slider.classList.add(color);
          } catch (err) {
            console.log(`slider class ${opt_slider} not found!`);
          }

          if (
            (document.getElementById(opt) as HTMLInputElement).checked === false
          ) {
            (document.getElementById(opt) as HTMLInputElement).checked = true;
            (document.getElementById(opt) as HTMLInputElement).classList.add(
              active
            );
          }
        } else if (urlParam.get(opt) === "off") {
          let selected = removeMarkup(
            html_class,
            css_class,
            color,
            hide,
            style
          );

          try {
            let slider = document.getElementById(opt_slider) as HTMLElement;
            slider.classList.remove(color);
            slider.removeAttribute("data");
            slider.classList.remove("slider-number");
          } catch (err) {
            console.log(`slider class ${opt_slider} not found!`);
          }

          if (
            (document.getElementById(opt) as HTMLInputElement).checked === true
          ) {
            (document.getElementById(opt) as HTMLInputElement).checked = false;
            (document.getElementById(opt) as HTMLInputElement).classList.remove(
              active
            );
          }

          /* default value e.g. off should not be added to url */
          urlParam.delete(opt);
        }

        let citation_url_str = paramCheck(
          variants[v].chg_citation,
          "citation-url"
        );
        if (citation_url_str) {
          var citation_url = document.getElementById(citation_url_str);
        }
      }

      if (String(count_active) === String(variants.length)) {
        if (
          (document.getElementById(optAll) as HTMLInputElement).checked ===
          false
        ) {
          try {
            let slider_all = document.getElementById(
              optAll
            ) as HTMLInputElement;
            slider_all.checked = true;
            slider_all.classList.add(active);
            slider_all.classList.add("slider-number");
            slider_all.setAttribute("data", String(count));
          } catch (err) {
            console.log(`slider class ${optAll} not found!`);
          }
        }
      } else {
        if (
          (document.getElementById(optAll) as HTMLInputElement).checked === true
        ) {
          try {
            let slider_all = document.getElementById(
              optAll
            ) as HTMLInputElement;
            slider_all.checked = false;
            slider_all.classList.remove(active);
            slider_all.removeAttribute("data");
            slider_all.classList.remove("slider-number");
          } catch (err) {
            console.log(`slider class ${optAll} not found!`);
          }
        }
      }

      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: true,
        cit: citation_url,
        state: false,
        href: href,
      });
    }
  }

  pageUrl() {
    // get session cookies as parameters
    let data = "image_loader";
    let storage = sessionStorage.getItem(data);

    if (storage) {
      let options:
        | {
            name: string | null | undefined;
            opt: string | null | undefined;
            title: string | null | undefined;
            urlparam: string | null | undefined;
            chg_citation: string | null | undefined;
            pag_link: string | null | undefined;
            pag_tab: string | null | undefined;
            img_size: string | null | undefined; // to be deprecated
            url: string | null | undefined;
            url_param: string | null | undefined;
            osd_target: string | null | undefined;
            img_source: string | null | undefined;
            img_types: [] | null | undefined;
            active_class: string | null | undefined;
            inactive_class: string | null | undefined;
            bootstrap_class: string | null | undefined;
          }
        | null
        | undefined = JSON.parse(storage);

      // get url params
      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);
      var urlparam = paramCheck(options.urlparam);
      var _current = urlParam.get(urlparam);

      // const item = document.querySelector('.pagination .nav-tabs .nav-item .nav-link.active');
      // const href = item.getAttribute('href').replace('#', '');
      if (_current == null) {
        urlParam.set(urlparam, "1");
        _current = urlParam.get(urlparam);
      }

      // set all nav links to inactive
      let pag_link = paramCheck(options.pag_link, ".pagination-link");
      let active = paramCheck(options.active_class, "active");
      let inactive = paramCheck(options.inactive_class, "fade");
      let bootstrap_class = paramCheck(options.bootstrap_class, "show");
      let pag_tab = paramCheck(options.pag_tab, ".pagination-tab.tab-pane");

      // deactivate all tabs
      let tabs = document.querySelectorAll(`${pag_tab}[data-tab="paginate"]`);
      tabs.forEach(function (el: HTMLElement) {
        el.classList.remove(active);
        el.classList.add(inactive);
      });

      // deactivate pagination linksshow metadata
      let link = document.querySelectorAll(`${pag_link}`);
      let pgOpt: any = [];
      link.forEach(function (el: HTMLElement) {
        el.classList.remove(active);
        el.classList.remove(bootstrap_class);
        let el_id = el.getAttribute("id");
        if (el_id) {
          let idn = el_id.split("_");
          let idNo = idn[idn.length - 1];
          pgOpt.push(idNo);
        }
      });

      // check if page url param is valid
      if (!pgOpt.includes(_current)) {
        console.log(`${urlparam}=${_current} is not a selectable option.`);
        urlParam.set(urlparam, "1");
        _current = urlParam.get(urlparam);
      }

      // activate tab base on urlparams
      let tab = document.getElementById(`paginate-${_current}`) as HTMLElement;
      tab.classList.remove(inactive);
      tab.classList.add(active);
      tab.classList.add(bootstrap_class);

      // get all nav tabs matching href tabs based on urlparams and set to active
      let linkActive = document.querySelectorAll(
        `${pag_link}[href="#paginate-${_current}"]`
      );
      linkActive.forEach(function (el: HTMLElement) {
        el.classList.add(active);
        el.classList.add(bootstrap_class);
      });

      // create OSD container
      // check if sizes object with font sizes is not null or undefined
      try {
        var type_check = options.img_types;
      } catch (err) {
        console.log("Hide object not found. Creating default parameters.");
      }
      let type_checked = paramCheck(type_check, ["type1", "type2"]);

      // get class where osd img are inserted
      let opt_osd_target = paramCheck(options.osd_target, "container");
      let opt_img_source = paramCheck(options.img_source, "container2");
      let opt_image_size = paramCheck(options.img_size, "500px"); // to be deprecated

      // find correct image type
      let i = 0;
      while (i < type_checked.length) {
        if (
          document.getElementById(
            `${type_checked[i]}_${opt_osd_target}_${_current}`
          )
        ) {
          var _image_type = type_checked[i];
        }
        i++;
      }

      let _osd_container_id = `${_image_type}_${opt_osd_target}_${_current}`;
      let _osd_container_id2 = `${_image_type}_${opt_img_source}_${_current}`;
      let osd_container = document.getElementById(
        _osd_container_id
      ) as HTMLElement;
      let osd_container_2 = document.getElementById(
        _osd_container_id2
      ) as HTMLElement;

      /* ancestor wrapper of osd viewer */
      let osd_container_2_img = document.getElementById(
        `img-resize-${_current}`
      );

      /* wrapper sibling of resize container to get correct height */
      let test_container_height = document.getElementById(
        `text-resize-${_current}`
      ).offsetHeight;

      if (osd_container_2 && !osd_container_2_img.classList.contains("fade")) {
        osd_container.style.height = `${test_container_height}px`;
        let image = document.getElementById(`${_image_type}_img_${_current}`);

        let image_src = image.getAttribute("data-src");
        let image_url = { type: "image", url: image_src };

        let viewer = OpenSeadragon({
          id: _osd_container_id,
          prefixUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.0.0/images/",
          tileSources: image_url,
          // Initial rotation angle
          // degrees: 90,
          // Show rotation buttons
          showRotationControl: true,
          // Enable touch rotation on tactile devices
          gestureSettingsTouch: {
            pinchRotate: true,
          },
        });

        // hides static images
        osd_container_2.remove();

        // hide loading spinner if image fully loaded status changes
        // see issue: https://github.com/openseadragon/openseadragon/issues/1262
        viewer.addHandler("open", function () {
          let tiledImage = viewer.world.getItemAt(0);
          if (tiledImage.getFullyLoaded()) {
            hideLoading(_osd_container_id);
          } else {
            tiledImage.addOnceHandler("fully-loaded-change", function () {
              let spinnerID2 = "spinner_" + _osd_container_id;
              if (document.getElementById(spinnerID2)) {
                document.getElementById(spinnerID2).remove();
              }
            });
          }
        });
      }

      // get citation url class and update citation
      let citation_url_str = paramCheck(options.chg_citation, "citation-url");
      let citation_url = document.getElementById(citation_url_str);

      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: true,
        cit: citation_url,
        state: false,
        href: href,
      });
    }
  }

  multiLanguage() {
    // get session cookie with configartion json
    const data = "multi_language";
    const storage = sessionStorage.getItem(data);
    if (storage) {
      const options:
        | {
            title: string | null | undefined;
            variants:
              | [
                  {
                    opt: string | null | undefined;
                    title: string | null | undefined;
                    class: string | null | undefined;
                    map: object | null | undefined;
                  }
                ]
              | null
              | undefined;
            active_class: string | null | undefined;
          }
        | null
        | undefined = JSON.parse(storage);

      /* get current ur */
      var url = new URL(document.location.href);

      /* get current url parameters */
      var urlParam = new URLSearchParams(url.search);

      /* check if active class was defined or set to default class */
      var active = paramCheck(options.active_class, "lang_active");

      /* create array of all configured user languages  */
      var userLang = [];
      for (let x of options.variants) {
        userLang.push(x.opt);
      }

      /* ############################################### */
      /*  verifying if urlparam set is valid */
      /* ############################################### */
      if (urlParam.get("lang") == null) {
        /* get current browser language */
        var lang = navigator.language;
        /* check if browser language is in configuration options */
        var langUpdate = userLang.includes(lang.split("-")[0])
          ? lang.split("-")[0]
          : "en";
        urlParam.set("lang", langUpdate);
      } else if (!userLang.includes(urlParam.get("lang"))) {
        /* check if urlparam set fits to configuration options */
        urlParam.set("lang", "en");
        var langUpdate = "en";
        console.log(`lang urlparameter does not fit webpage configuration.
                    set to default language.`);
      } else {
        /* get urlparam set */
        var langUpdate = urlParam.get("lang");
      }

      // use try/catch to verify if object exists in options
      try {
        var variants_check = options.variants.filter(
          (v) => v.opt !== langUpdate
        );
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }

      // all variants except current clicked
      var variants = paramCheck(variants_check, [
        {
          opt: langUpdate,
        },
      ]);

      // configuration holds an array with variants with at least one variant object.
      // to match the custom element with the configuration the opt value must match.
      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check = options.variants.find((v) => v.opt === langUpdate);
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }

      // variant as selected in UI
      let variant = paramCheck(variant_check, {
        opt: langUpdate,
      });
      if (!variant) {
        console.log(
          "No variant found! Please define a variant object that contains \
                  and 'opt' key holding a string value that matches the 'opt' value of custom \
                  element 'annotation#slider'."
        );
      }

      /* remove active class from variants not clicked */
      variants.forEach((el: any) => {
        document.getElementById(`ml_${el.opt}`).classList.remove(active);
      });

      /* set current clicked variant active with class and change state of urlparam */
      let current = document.getElementById(`ml_${variant.opt}`);
      current.classList.add(active);

      /* check if language mappings is available */
      var map = paramCheck(variant.map, { "index.html": "index-en.html" });

      if (map) {
        /* must be replaced in production
          get pathname and specific filename
          set new path based on mappings from mappings json
          key in mappings = filename */
        let path = location.pathname.split("/");
        let newPath =
          path.length == 3 && path[2].length > 0
            ? map[path[2]]
            : path.length == 2 && path[1].length > 0
            ? map[path[1]]
            : map["index.html"];

        if (newPath) {
          // current state of the annotation sliders is saved in the url parameters
          // current state is also saved in window history (back/forward browser button)
          var state = {
            lang: variant.opt,
          };

          let href = `${newPath}?${urlParam}${location.hash}`;
          uptState({
            hist: true,
            state: state,
            href: href,
          });
        }
      }
    }
  }
}
