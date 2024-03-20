// @ts-noncheck
import {
  uptState,
  addMarkup,
  removeMarkup,
  hideLoading,
} from "../../utils/utils";
import type {
  FullScreenType,
  FontSizeType,
  FontVariant,
  FontFamilyType,
  ImageSwitchType,
  AnnotationType,
  Variant,
  PageUrlType,
  MultiLanguageType,
  FullScreenVariant,
} from "../../utils/types";
// @ts-ignore
import { OpenSeadragon } from "openseadragon";

export class UrlSearchParamUpdate {
  fullSreen() {
    // get custom element and access opt attribute
    let el = document.getElementsByTagName(
      "full-size"
    ) as HTMLCollectionOf<Element>;
    let opt: string = el[0].getAttribute("opt");
    if (typeof opt !== "string") {
      console.log("No 'opt' attribute in custom element font-size found!");
    }

    // session storage key
    // get config by accessing sessions storage cookies
    let data: string = "fullsize";
    let storage: string | null = sessionStorage.getItem(data);
    if (storage) {
      var options: FullScreenType = JSON.parse(storage);
      if (!options) {
        alert("Please turn on cookies to display content!");
      }

      // to manipulate url parameters construct url by getting current url
      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);

      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check: FullScreenVariant = options.variants.find(
          (v: any) => v.opt === opt
        );
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      var variant = variant_check
        ? variant_check
        : {
            opt: opt,
          };

      // if variant obj contains urlparam string check urlparams parameters
      var urlparam = variant.urlparam ? variant.urlparam : "fullscreen";

      // check for option param or return default value
      var active = options.active_class ? options.active_class : "active";
      var hide = variant.hide ? variant.hide : "hide-container";
      var hidden = variant.to_hide ? variant.to_hide : "fade";

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
        let hide_class: NodeListOf<Element> = document.querySelectorAll(
          `.${hide}`
        );
        [...hide_class].forEach((el: any) => {
          el.classList.remove(hidden);
          let svg_show: string = `<svg xmlns="http://www.w3.org/2000/svg"
                               width="16"
                               height="16"
                               fill="currentColor"
                               class="bi bi-fullscreen"
                               viewBox="0 0 16 16">
                            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                          </svg>`;
          let btn = document.getElementById(opt) as HTMLElement;
          btn.innerHTML = svg_show;
          btn.classList.remove(active);

          /* if value is off it should not be part of the urlsearchparams */
          urlParam.delete(urlparam);
        });
      }

      if (urlParam.get(urlparam) == "on") {
        let hide_class: NodeListOf<Element> = document.querySelectorAll(
          `.${hide}`
        );
        [...hide_class].forEach((el: any) => {
          el.classList.add(hidden);
          let svg_hide = `<svg xmlns="http://www.w3.org/2000/svg"
                               width="16"
                               height="16"
                               fill="currentColor"
                               class="bi bi-fullscreen-exit"
                               viewBox="0 0 16 16">
                            <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
                          </svg>`;
          let btn = document.getElementById(opt) as HTMLElement;
          btn.innerHTML = svg_hide;
          btn.classList.add(active);
        });
      }

      // citation-url is an HTMLElement that is used to update the citation
      var citation_url_str = variant.chg_citation
        ? variant.chg_citation
        : "citation-url";
      var citation_url = document.getElementById(
        citation_url_str
      ) as HTMLElement;

      // update browser history state
      let href: string = `?${urlParam}${location.hash}`;
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
    let el = document.getElementsByTagName(
      "font-size"
    ) as HTMLCollectionOf<Element>;
    var id: string = el[0].getAttribute("opt");

    // check if user set opt attribute
    if (typeof id !== "string") {
      console.log("No 'opt' attribute in custom element font-size found!");
    }

    // string fontsize is variable to access session cookies
    let data = "fontsize";
    let storage: string | null = sessionStorage.getItem(data);

    if (storage) {
      // define options object and parse session cookie as json
      var options: FontSizeType = JSON.parse(storage);

      if (!options) {
        alert("Please turn on cookies to display content!");
      }

      // get url and urlparams to manipulate and update
      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);

      // variant is found by comparing variant config opt with custom element attr opt
      var variants = options.variants ? options.variants : [{ opt: id }];
      [...variants].forEach((v: FontVariant) => {
        // get urlparam key
        var urlparam = v.urlparam ? v.urlparam : "fontsize";

        // get citation url key and HTMLElement
        var citation_url_str = v.chg_citation ? v.chg_citation : "citation-url";
        var citation_url = document.getElementById(
          citation_url_str
        ) as HTMLElement;

        // define paragraph HTML element name
        let p_change = v.paragraph ? v.paragraph : "p";
        // define class to change font sizes (not all paragraphs might need to be changed)
        let p_class = v.p_class ? v.p_class : "yes-index";

        // check if sizes object with font sizes is not null or undefined
        let size = v.sizes
          ? v.sizes
          : {
              default: "default",
              font_size_14: "14",
              font_size_18: "18",
              font_size_22: "22",
              font_size_26: "26",
            };

        // define font size name before size
        var css_class = v.css_class ? v.css_class : "font-size-";

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
          let paragraph = document.querySelectorAll(
            `${p_change}.${p_class}`
          ) as NodeListOf<Element>;

          var new_value: string =
            urlParam.get(urlparam) !== "default"
              ? css_class + urlParam.get(urlparam)
              : urlParam.get(urlparam);

          // change select option value based on provided url param
          var select = document.getElementById(v.opt) as HTMLSelectElement;
          select.value = new_value;

          // finally, changing selected paragraph font size
          [...paragraph].forEach((el) => {
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
      let options: FontFamilyType = JSON.parse(storage);

      if (!options) {
        alert("Please turn on cookies to display content!");
      }

      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);

      // variant is found by comparing variant config opt with custom element attr opt
      var variants = options.variants ? options.variants : [{ opt: id }];
      [...variants].forEach((v: FontVariant) => {
        // get urlparam key
        var urlparam = v.urlparam ? v.urlparam : "font";

        // get citation url key and HTMLElement
        var citation_url_str = v.chg_citation ? v.chg_citation : "citation-url";
        var citation_url = document.getElementById(
          citation_url_str
        ) as HTMLElement;

        // define paragraph HTML element name
        let p_change = v.paragraph ? v.paragraph : "p";
        // define class to change font sizes (not all paragraphs might need to be changed)
        let p_class = v.p_class ? v.p_class : "yes-index";

        // check if sizes object with font sizes is not null or undefined
        let family = v.fonts
          ? v.fonts
          : {
              default: "default",
              font1: "Times-New-Roman",
              font2: "Courier-New",
              font3: "Arial-serif",
            };

        if (urlParam.get(urlparam) == null) {
          urlParam.set(urlparam, "default");
        }

        if (!Object.values(family).includes(urlParam.get(urlparam))) {
          console.log(
            `font=${urlParam.get(urlparam)} is not a selectable option.`
          );
          urlParam.set(urlparam, "default");
        } else {
          let paragraph = document.querySelectorAll(
            `${p_change}.${p_class}`
          ) as NodeListOf<Element>;

          if (urlParam.get(urlparam) !== "default") {
            var new_value: string = urlParam.get(urlparam);
          } else {
            var new_value: string = urlParam.get(urlparam);
          }

          // change select option value based on provided url param
          var select = document.getElementById(v.opt) as HTMLSelectElement;
          select.value = new_value;

          // finally, change font-size of selected paragraphs
          [...paragraph].forEach((el) => {
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
        /* if value is off it should not be part of the urlsearchparams */
        if (urlParam.get(urlparam) == "default") {
          urlParam.delete(urlparam);
        }

        // update browser history state
        let href: string = `?${urlParam}${location.hash}`;
        uptState({
          hist: true,
          cit: citation_url,
          state: false,
          href: href,
        });
      });
    }
  }

  viewerSwitch() {
    let el = document.querySelectorAll("image-switch") as NodeListOf<Element>;
    let opt: string = el[0].getAttribute("opt");
    // check if user set opt attribute
    if (typeof opt !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }

    let data: string = "image_switch";
    let storage: string = sessionStorage.getItem(data);

    if (storage) {
      let options: ImageSwitchType = JSON.parse(storage);
      if (!options) {
        alert("Please turn on cookies to display content!");
      }

      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);

      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check = options.variants.find((v: any) => v.opt === opt);
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      var variant = variant_check
        ? variant_check
        : {
            opt: opt,
          };

      // check for option param or return default value
      var active = options.active_class ? options.active_class : "active";

      // check if sizes object with font sizes is not null or undefined
      let hide_checked = variant.hide
        ? variant.hide
        : {
            hidden: true,
            class_to_hide: "hide-container1",
            class_to_show: "show-container1",
            class_parent: "hide-show-wrapper",
            resize: "resize-hide",
          };

      // get classes from params for container to hide and show
      let hidden = hide_checked.hidden ? hide_checked.hidden : true;
      let hide = hide_checked.class_to_hide
        ? hide_checked.class_to_hide
        : "hide-container1";
      let show = hide_checked.class_to_show
        ? hide_checked.class_to_show
        : "show-container1";
      let resize = hide_checked.resize ? hide_checked.resize : "resize-hide";

      // get class for wrapper of hide show container
      let parent = hide_checked.class_parent
        ? hide_checked.class_parent
        : "hide-show-wrapper";

      // get urlparam key
      var urlparam = variant.urlparam ? variant.urlparam : "image";

      // get fade class
      let fade = variant.fade ? variant.fade : "fade";

      // check if sizes object with font sizes is not null or undefined
      let column_small_check = variant.column_small
        ? variant.column_small
        : {
            class: "col-md-6",
            percent: "50%",
          };

      // check if sizes object with font sizes is not null or undefined
      let column_full_checked = variant.column_full
        ? variant.column_full
        : {
            class: "col-md-12",
            percent: "100%",
          };

      // get classes and style for hide show container resizing
      let column_small: any[] = [
        column_small_check.class ? column_small_check.class : "col-md-6",
        column_small_check.percent ? column_small_check.percent : "50%",
      ];
      let column_full: any[] = [
        column_full_checked.class ? column_full_checked.class : "col-md-12",
        column_full_checked.percent ? column_full_checked.percent : "100%",
      ];

      // check if urlparam value is null and set to default
      if (urlParam.get(urlparam) == null) {
        urlParam.set(urlparam, "off");
      }

      // if urlparam value is not valid set to default
      if (!["on", "off"].includes(urlParam.get(urlparam))) {
        console.log(
          `image=${urlParam.get(urlparam)} is not a selectable option.`
        );
        urlParam.delete(urlparam);
      }

      // if urlparam value is 'on' show container
      if (urlParam.get(urlparam) == "on") {
        let hide_elements = document.querySelectorAll(
          `.${hide}`
        ) as NodeListOf<HTMLElement>;
        [...hide_elements].forEach((el: HTMLElement) => {
          el.classList.remove(fade);
          el.classList.add(column_small[0]);
          el.style.maxWidth = column_small[1];
          el.classList.add(active);
        });

        let show_elements = document.querySelectorAll(
          `.${show}`
        ) as NodeListOf<HTMLElement>;
        [...show_elements].forEach((el: HTMLElement) => {
          el.classList.add(column_small[0]);
          el.classList.remove(column_full[0]);
          el.style.maxWidth = column_small[1];
          el.classList.add(active);
        });
        let resize_elements = document.querySelectorAll(
          `.${resize}`
        ) as NodeListOf<HTMLElement>;
        [...resize_elements].forEach((el: HTMLElement) => {
          el.classList.remove(fade);
        });
        let checkbox = document.getElementById(opt) as HTMLElement;
        checkbox.classList.add(active);
      }

      // if urlparam value is 'off' hide container
      if (urlParam.get(urlparam) == "off") {
        let hide_elements = document.querySelectorAll(
          `.${hide}`
        ) as NodeListOf<HTMLElement>;
        [...hide_elements].forEach((el: HTMLElement) => {
          el.classList.add(fade);
          el.classList.remove(column_small[0]);
          el.style.maxWidth = column_full[1];
          el.classList.remove(active);
        });

        let show_elements = document.querySelectorAll(
          `.${show}`
        ) as NodeListOf<HTMLElement>;
        [...show_elements].forEach((el: HTMLElement) => {
          el.classList.remove(column_small[0]);
          el.classList.add(column_full[0]);
          el.style.maxWidth = column_full[1];
          el.classList.remove(active);
        });

        let resize_elements = document.querySelectorAll(
          `.${resize}`
        ) as NodeListOf<HTMLElement>;
        [...resize_elements].forEach((el: HTMLElement) => {
          el.classList.add(fade);
        });

        // works only with one image viewer
        // try {
        //   var viewer = document.querySelector(
        //     `.${parent}.${active} .${hide}`
        //   ) as HTMLElement;
        // } catch (err) {
        //   console.log(
        //     `HTML class elements .${parent}.${active} .${hide} not found. Please make sure your HTML site contains them.`
        //   );
        // }

        // try {
        //   var facs = viewer.querySelectorAll("*")[0] as HTMLElement;
        //   // set style height and width
        //   // get iamge_size from params
        //   // let image_size = paramCheck(variant.image_size, "500px");
        //   facs.style.width = `${viewer.offsetWidth}px`;
        //   facs.style.height = `${viewer.offsetHeight}px`;
        // } catch (err) {
        //   console.log(
        //     `HTML class elements .${parent}.${active} .${hide} not found. Please make sure your HTML site contains them.`
        //   );
        // }

        // remove active class
        let checkbox = document.getElementById(opt) as HTMLElement;
        checkbox.classList.remove(active);

        /* if value is off it should not be part of the urlsearchparams */
        urlParam.delete(urlparam);
      }

      // get citation url class and update citation
      let citation_url_str = variant.chg_citation
        ? variant.chg_citation
        : "citation-url";
      let citation_url = document.getElementById(
        citation_url_str
      ) as HTMLElement;

      // update browser history state
      let href: string = `?${urlParam}${location.hash}`;
      uptState({
        hist: true,
        cit: citation_url,
        state: false,
        href: href,
      });
    }
  }

  textFeatures() {
    // get key for session storage and access coockies
    let data = "annotation_slider";
    let storage = sessionStorage.getItem(data);
    if (storage) {
      let options: AnnotationType = JSON.parse(storage);

      if (!options) {
        alert(`WARNING 1 - search_params/main: Please turn on cookies to display content.\n
              Or check if configuration files path match data-target and data-path property.`);
      }

      // define url and urlparams to manipulate and update
      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);

      // ########################################################################
      // before using any config parameters check if they are defined
      // if not create default parameters to continue
      // ########################################################################

      // variantAll is the group leader that controls the others
      // it is determent by setting the features.all key to true and
      // by sharing the same features.class in your config file
      try {
        var variant_all_check = options.variants.filter(
          (v: any) => v.features.all === true
        );
      } catch (err) {
        console.log(
          `WARNING 2 - search_params/main: No option parameters found. Creating default \n
           parameters to continue.`
        );
      }
      let variantAll = variant_all_check
        ? variant_all_check
        : [
            {
              opt: "text-features",
              features: {
                all: true,
                class: "all-features",
              },
            },
          ];

      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check = options.variants.filter(
          (v: any) => v.features.all === false
        );
      } catch (err) {
        console.log(
          `WARNING 3 - search_params/main: No option parameters found.\n
           Creating default parameters to continue.`
        );
      }
      let allVariants: NodeListOf<Element> =
        document.querySelectorAll("annotation-slider");

      var allVariantsObjs: Array<Variant> = [];
      [...allVariants].forEach((el: any) => {
        try {
          var attrOpt: string = el.getAttribute("opt");
        } catch (err) {
          console.log(`WARNING 4 - search_params/main: No variants found.
                      add custom html element <annotation-slider> to your html file.`);
        }
        if (attrOpt.length > 0) {
          allVariantsObjs.push({
            opt: attrOpt,
            features: {
              all: false,
              class: "single-feature",
            },
          });
        }
      });
      let variants = variant_check ? variant_check : allVariantsObjs;

      // in case user config input for features.all is not a boolean value
      // return Warning 6
      try {
        var variant_check_bool = options.variants.filter(
          (v: Variant) => typeof v.features.all !== "boolean"
        );
      } catch (err) {
        console.log(
          `WARNING 5 - search_params/main: No option parameters found.\n
           Creating default parameters to continue.`
        );
      }
      let wrg_ft: Array<Variant> = variant_check_bool ? variant_check_bool : [];
      if (wrg_ft) {
        for (let w of wrg_ft) {
          console.log(
            `WARNING 6 - search_params/main: Type of variant ${w} config.\n
            "features.all" must be boolean (true or false)`
          );
        }
      }

      // check if span_element object is provided
      // set to default params of not
      let style = options.span_element
        ? options.span_element
        : {
            css_class: "badge-item",
          };

      let active = options.active_class ? options.active_class : "active";

      // set count to verify state of sliders
      let count_active: {
        [key: string]: number;
      } = {};

      // create general count for all sliders for each provided html element found
      // that is connected to the slider via variants.html_class
      let count: number = 0;

      // ##############################################################################################
      // task result 1: add markup to html element,
      //                add active class to checkbox,
      //                add data attribute to slider
      // task result 2: remove markup from html element,
      //                remove active class from checkbox,
      //                remove data attribute from slider
      // ****general task****: loop through all variants and check variant.opt against urlparam value
      // task 1: allowed values = 'on' or 'off' -> task result 1 or 2
      // task 2: values other than 'on' or 'off' are not selectable -> return warning -> task result 2
      // task 3: if value is null check if variant has default value true:
      // * if null and default: true -> task result 1
      // * if null and default: false -> task result 2
      // ##############################################################################################
      [...variants].forEach((v: Variant, idx) => {
        // paramCheck verifies if config is avaliable
        // if not default parameters are created
        let opt = v.opt ? v.opt : `any-feature-${idx}`;
        let opt_class = v.features.class ? v.features.class : `class-${opt}`;
        let color = v.color ? v.color : `color-${opt}`;
        let html_class = v.html_class ? v.html_class : `html-class-${opt}`;
        let css_class = v.css_class ? v.css_class : `css-class-${opt}`;
        let opt_slider = v.opt_slider ? v.opt_slider : `${opt}-slider`;
        let hide = v.hide ? v.hide : { hidden: true, class: "hide" };
        if (urlParam.get(opt) === null) {
          // ##############################################
          // check if urlparam is null
          // if true also check if variant default is true
          // ##############################################
          if (v.default === true) {
            // if default is true
            // count active sliders of each given features.class
            if (count_active.hasOwnProperty(opt_class)) {
              count_active[opt_class] += 1;
            } else {
              count_active[opt_class] = 1;
            }
            // add markup to html elemet
            let selected = addMarkup(html_class, css_class, color, hide, style);
            try {
              let slider = document.getElementById(opt_slider) as HTMLElement;
              slider.setAttribute("data", selected);
              count += parseInt(selected);
              slider.classList.add("slider-number");
              slider.classList.add(color);
              urlParam.set(opt, "on");
            } catch (err) {
              console.log(`slider class ${opt_slider} not found!`);
            }

            // update checkbox: add active class and checked attribute
            let checkbox = document.getElementById(opt) as HTMLInputElement;
            if (checkbox.checked === false) {
              checkbox.checked = true;
              checkbox.classList.add(active);
            }
          } else {
            // if default is false
            // remove markup from html element
            let selected = removeMarkup(
              html_class,
              css_class,
              color,
              hide,
              style
            );

            // update slider: remove color, data, slider-number class
            try {
              let slider = document.getElementById(opt_slider) as HTMLElement;
              slider.classList.remove(color);
              slider.removeAttribute("data");
              slider.classList.remove("slider-number");
            } catch (err) {
              console.log(
                `WARNING 7 - search_params/main: slider class ${opt_slider} not found!`
              );
            }

            // update checkbox: remove active class and checked attribute
            let checkbox = document.getElementById(opt) as HTMLInputElement;
            if (checkbox.checked === true) {
              checkbox.checked = false;
              checkbox.classList.remove(active);
            }
          }
        } else if (!["on", "off"].includes(urlParam.get(opt))) {
          // ########################################################
          // if urlparam is not null and not on or off return warning
          // ########################################################
          console.log(
            `${opt}=${urlParam.get(opt)} is not a selectable option.`
          );
          urlParam.delete(opt);

          // add markup to html element
          let selected = removeMarkup(
            html_class,
            css_class,
            color,
            hide,
            style
          );

          // update slider: remove color, data, slider-number class
          try {
            let slider = document.getElementById(opt_slider) as HTMLElement;
            slider.classList.remove(color);
            slider.removeAttribute("data");
            slider.classList.remove("slider-number");
          } catch (err) {
            console.log(
              `WARNING 8 - search_params/main: slider class ${opt_slider} not found!`
            );
          }

          // update checkbox: remove active class and checked attribute
          let checkbox = document.getElementById(opt) as HTMLInputElement;
          if (checkbox.checked === true) {
            checkbox.checked = false;
            checkbox.classList.remove(active);
          }
        } else if (urlParam.get(opt) === "on") {
          // ##############################################
          // ############ if urlparam is on ###############
          // ##############################################

          // count active sliders of each given features.class
          if (count_active.hasOwnProperty(opt_class)) {
            count_active[opt_class] += 1;
          } else {
            count_active[opt_class] = 1;
          }

          // remove markup from html element
          let selected = addMarkup(html_class, css_class, color, hide, style);

          // update slider: add color, data, slider-number class
          try {
            let slider = document.getElementById(opt_slider) as HTMLElement;
            slider.setAttribute("data", selected);
            count += parseInt(selected);
            slider.classList.add("slider-number");
            slider.classList.add(color);
          } catch (err) {
            console.log(
              `WARNING 9 - search_params/main: slider class ${opt_slider} not found!`
            );
          }

          // update checkbox: add active class and checked attribute
          let checkbox = document.getElementById(opt) as HTMLInputElement;
          if (checkbox.checked === false) {
            checkbox.checked = true;
            checkbox.classList.add(active);
          }
        } else if (urlParam.get(opt) === "off") {
          // ##############################################
          // ######### urlparam value is off ##############
          // ##############################################

          // remove markup from html element
          let selected = removeMarkup(
            html_class,
            css_class,
            color,
            hide,
            style
          );

          // update slider: remove color, data, slider-number class
          try {
            let slider = document.getElementById(opt_slider) as HTMLElement;
            slider.classList.remove(color);
            slider.removeAttribute("data");
            slider.classList.remove("slider-number");
          } catch (err) {
            console.log(
              `WARNING 10 - search_params/main: slider class ${opt_slider} not found!`
            );
          }

          // update checkbox: remove active class and checked attribute
          let checkbox = document.getElementById(opt) as HTMLInputElement;
          if (checkbox.checked === true) {
            checkbox.checked = false;
            checkbox.classList.remove(active);
          }

          /* default value e.g. off should not be added to url */
          urlParam.delete(opt);
        }

        let citation_url_str = v.chg_citation ? v.chg_citation : "citation-url";
        if (citation_url_str) {
          var citation_url = document.getElementById(citation_url_str);
        }
        // ########################################################################
        // uptState changes the browser history state to reflect the current state
        // of all variants (html elements, slider, checkbox) and their urlparams
        let href: string = `?${urlParam}${location.hash}`;
        uptState({
          hist: true,
          cit: citation_url,
          state: false,
          href: href,
        });
      });

      // ####################################################################################
      // handling features.all slider to receive active or inactive status
      // algorithm:
      // if all group variants are active turn group leader active -> task result 1
      // if none or not all variants are active turn group leader inactive -> task result 2
      [...variantAll].forEach((el) => {
        let optAll = el.opt ? el.opt : `all-features`;
        var feat_leader = document.getElementById(optAll) as HTMLInputElement;
        var feat_leader_class = el.features.class;
        var variants_features_class = variants.filter(
          (v) => v.features.class === feat_leader_class
        );
        if (
          count_active[feat_leader_class] === variants_features_class.length
        ) {
          if (feat_leader.checked === false) {
            feat_leader.checked = true;
            feat_leader.classList.add(active);
            feat_leader.classList.add("slider-number");
            feat_leader.setAttribute("data", String(count));
          }
        } else {
          if (feat_leader.checked === true) {
            feat_leader.checked = false;
            feat_leader.classList.remove(active);
            feat_leader.removeAttribute("data");
            feat_leader.classList.remove("slider-number");
          }
        }
      });
    }
  }

  pageUrl() {
    // get session cookies as parameters
    let data = "image_loader";
    let storage = sessionStorage.getItem(data);

    if (storage) {
      let options: PageUrlType = JSON.parse(storage);

      // get url params
      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);
      var urlparam = options.urlparam ? options.urlparam : "page";
      var _current = urlParam.get(urlparam);

      // const item = document.querySelector('.pagination .nav-tabs .nav-item .nav-link.active');
      // const href = item.getAttribute('href').replace('#', '');
      if (_current == null) {
        let default_pagination = document
          .querySelector("edition-pagination")
          .getAttribute("pos");
        urlParam.set(urlparam, default_pagination);
        _current = urlParam.get(urlparam);
      }

      // set all nav links to inactive
      let pag_link = options.pag_link ? options.pag_link : ".pagination-link";
      let active = options.active_class ? options.active_class : "active";
      let inactive = options.inactive_class ? options.inactive_class : "fade";
      let bootstrap_class = options.bootstrap_class
        ? options.bootstrap_class
        : "show";
      let pag_tab = options.pag_tab
        ? options.pag_tab
        : ".pagination-tab.tab-pane";

      // deactivate all tabs
      let tabs: NodeListOf<HTMLElement> = document.querySelectorAll(
        `${pag_tab}[data-tab="paginate"]`
      );
      [...tabs].forEach(function (el: HTMLElement) {
        el.classList.remove(active);
        el.classList.add(inactive);
      });

      // deactivate pagination linksshow metadata
      let link: NodeListOf<HTMLElement> = document.querySelectorAll(
        `${pag_link}`
      );
      let pgOpt: any = [];
      [...link].forEach(function (el: HTMLElement) {
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
        let default_pagination = document
          .querySelector("edition-pagination")
          .getAttribute("pos");
        console.log(`${urlparam}=${_current} is not a selectable option.`);
        urlParam.set(urlparam, default_pagination);
        _current = urlParam.get(urlparam);
      }

      // activate tab base on urlparams
      let tab = document.getElementById(`paginate-${_current}`) as HTMLElement;
      tab.classList.remove(inactive);
      tab.classList.add(active);
      tab.classList.add(bootstrap_class);

      // get all nav tabs matching href tabs based on urlparams and set to active
      let linkActive: NodeListOf<HTMLElement> = document.querySelectorAll(
        `${pag_link}[href="#paginate-${_current}"]`
      );
      [...linkActive].forEach(function (el: HTMLElement) {
        el.classList.add(active);
        el.classList.add(bootstrap_class);
      });

      // create OSD container
      // check if sizes object with font sizes is not null or undefined
      try {
        var type_check: [] = options.img_types;
      } catch (err) {
        console.log("Hide object not found. Creating default parameters.");
      }
      let type_checked = type_check ? type_check : ["type1", "type2"];

      // get class where osd img are inserted
      let opt_osd_target = options.osd_target
        ? options.osd_target
        : "container";
      let opt_img_source = options.img_source
        ? options.img_source
        : "container2";
      let opt_image_size = options.img_size ? options.img_size : "500px"; // to be deprecated

      // find correct image type
      let i: number = 0;
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
      ) as HTMLElement;

      /* wrapper sibling of resize container to get correct height */
      let test_container_height = document.getElementById(
        `text-resize-${_current}`
      ).offsetHeight as number;

      if (osd_container_2 && !osd_container_2_img.classList.contains("fade")) {
        osd_container.style.height = `${test_container_height}px`;
        let image = document.getElementById(
          `${_image_type}_img_${_current}`
        ) as HTMLElement;

        let image_src: string = image.getAttribute("data-src");
        let image_url: object = { type: "image", url: image_src };

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
      let citation_url_str = options.chg_citation
        ? options.chg_citation
        : "citation-url";
      let citation_url = document.getElementById(
        citation_url_str
      ) as HTMLElement;

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
      const options: MultiLanguageType = JSON.parse(storage);

      /* get current ur */
      var url = new URL(document.location.href);

      /* get current url parameters */
      var urlParam = new URLSearchParams(url.search);

      /* check if active class was defined or set to default class */
      var active = options.active_class ? options.active_class : "lang_active";

      /* create array of all configured user languages  */
      var userLang: any[] = [];
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
        var langUpdate: string = urlParam.get("lang");
      }

      // use try/catch to verify if object exists in options
      try {
        var variants_check = options.variants.filter(
          (v: any) => v.opt !== langUpdate
        );
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }

      // all variants except current clicked
      var variants = variants_check
        ? variants_check
        : [
            {
              opt: langUpdate,
            },
          ];

      // configuration holds an array with variants with at least one variant object.
      // to match the custom element with the configuration the opt value must match.
      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check = options.variants.find(
          (v: any) => v.opt === langUpdate
        );
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }

      // variant as selected in UI
      let variant = variant_check
        ? variant_check
        : {
            opt: langUpdate,
          };

      if (!variant) {
        console.log(
          "No variant found! Please define a variant object that contains \
                  and 'opt' key holding a string value that matches the 'opt' value of custom \
                  element 'annotation#slider'."
        );
      }

      /* remove active class from variants not clicked */
      [...variants].forEach((el) => {
        document.getElementById(`ml_${el.opt}`).classList.remove(active);
      });

      /* set current clicked variant active with class and change state of urlparam */
      let current = document.getElementById(`ml_${variant.opt}`) as HTMLElement;
      current.classList.add(active);

      /* check if language mappings is available */
      var map = variant.map
        ? variant.map
        : {
            "index.html": "index-en.html",
          };

      if (map) {
        /* must be replaced in production
          get pathname and specific filename
          set new path based on mappings from mappings json
          key in mappings = filename */
        let path: string[] = location.pathname.split("/");
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

          let href: string = `${newPath}?${urlParam}${location.hash}`;
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
