const { uptState, paramCheck } = require("../../utils/utils");

export class UrlSearchParamUpdate {
  fullSreen() {
    // import types from utils.types.ts
    const { FullScreenType } = require("../../utils/types");

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
      var options: typeof FullScreenType = JSON.parse(storage);
      if (!options) {
        alert("Please turn on cookies to display content!");
      }

      // to manipulate url parameters construct url by getting current url
      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);

      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check: (typeof FullScreenType.variants)[0] =
          options.variants.find((v: any) => v.opt === opt);
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      var variant: (typeof FullScreenType.variants)[0] = paramCheck(
        variant_check,
        {
          opt: opt,
        }
      );

      // if variant obj contains urlparam string check urlparams parameters
      var urlparam: string = paramCheck(variant.urlparam, "fullscreen");

      // check for option param or return default value
      var active: string = paramCheck(options.active_class, "active");
      var hide: string = paramCheck(variant.hide, "hide-container");
      var hidden: string = paramCheck(variant.to_hide, "fade");

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
      var citation_url_str: string = paramCheck(
        variant.chg_citation,
        "citation-url"
      );
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
    // import types from utils.types.ts
    const { FontSizeType } = require("../../utils/types");

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
    let data: string = "fontsize";
    let storage: string | null = sessionStorage.getItem(data);

    if (storage) {
      // define options object and parse session cookie as json
      var options: typeof FontSizeType = JSON.parse(storage);

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
      var variants: typeof FontSizeType.variants = paramCheck(variant_check, [
        { opt: id },
      ]);

      for (let v in variants) {
        // get urlparam key
        var urlparam: string = paramCheck(variants[v].urlparam, "fontsize");

        // get citation url key and HTMLElement
        var citation_url_str: string = paramCheck(
          variants[v].chg_citation,
          "citation-url"
        );
        var citation_url = document.getElementById(
          citation_url_str
        ) as HTMLElement;

        // define paragraph HTML element name
        let p_change: string = paramCheck(variants[v].paragraph, "p");
        // define class to change font sizes (not all paragraphs might need to be changed)
        let p_class: string = paramCheck(variants[v].p_class, "yes-index");

        // check if sizes object with font sizes is not null or undefined
        try {
          var size_check: typeof FontSizeType.variants.sizes =
            variants[v].sizes;
        } catch (err) {
          console.log("Sizes obj not found. Creating default parameters.");
        }
        let size: typeof FontSizeType.variants.sizes = paramCheck(size_check, {
          default: "default",
          font_size_14: "14",
          font_size_18: "18",
          font_size_22: "22",
          font_size_26: "26",
        });

        // define font size name before size
        var css_class: string = paramCheck(variants[v].css_class, "font-size-");

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
          var select = document.getElementById(
            variants[v].opt
          ) as HTMLSelectElement;
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
      }

      /* if value is off it should not be part of the urlsearchparams */
      if (urlParam.get(urlparam) == "default") {
        urlParam.delete(urlparam);
      }

      // change browser history state
      let href: string = `?${urlParam}${location.hash}`;
      uptState({
        hist: true,
        cit: citation_url,
        state: false,
        href: href,
      });
    }
  }

  fontFamily() {
    // import types from utils.types.ts
    const { FontFamilyType } = require("../../utils/types");

    let el = document.getElementsByTagName("font-family");
    let id = el[0].getAttribute("opt");
    // check if user set opt attribute
    if (typeof id !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }

    let data = "font_family";
    let storage = sessionStorage.getItem(data);

    if (storage) {
      let options: typeof FontFamilyType = JSON.parse(storage);

      if (!options) {
        alert("Please turn on cookies to display content!");
      }

      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);

      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check: typeof FontFamilyType.variants = options.variants;
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      var variants: typeof FontFamilyType.variants = paramCheck(variant_check, [
        { opt: id },
      ]);

      for (let v in variants) {
        // get urlparam key
        var urlparam: string = paramCheck(variants[v].urlparam, "font");

        // get citation url key and HTMLElement
        var citation_url_str: string = paramCheck(
          variants[v].chg_citation,
          "citation-url"
        );
        var citation_url = document.getElementById(
          citation_url_str
        ) as HTMLElement;

        // define paragraph HTML element name
        let p_change: string = paramCheck(variants[v].paragraph, "p");
        // define class to change font sizes (not all paragraphs might need to be changed)
        let p_class: string = paramCheck(variants[v].p_class, "yes-index");

        // check if sizes object with font sizes is not null or undefined
        try {
          var family_check: typeof FontFamilyType.variants.fonts =
            variants[v].fonts;
        } catch (err) {
          console.log(
            "Font family object not found. Creating default parameters."
          );
        }
        let family: typeof FontFamilyType.variants.fonts = paramCheck(
          family_check,
          {
            default: "default",
            font1: "Times-New-Roman",
            font2: "Courier-New",
            font3: "Arial-serif",
          }
        );

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
          var select = document.getElementById(
            variants[v].opt
          ) as HTMLSelectElement;
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
    }
  }

  viewerSwitch() {
    // import types from utils.types.ts
    const { ImageSwitchType } = require("../../utils/types");

    let el = document.querySelectorAll("image-switch") as NodeListOf<Element>;
    let opt: string = el[0].getAttribute("opt");
    // check if user set opt attribute
    if (typeof opt !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }

    let data: string = "image_switch";
    let storage: string = sessionStorage.getItem(data);

    if (storage) {
      let options: typeof ImageSwitchType = JSON.parse(storage);
      if (!options) {
        alert("Please turn on cookies to display content!");
      }

      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);

      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check: typeof ImageSwitchType.variants =
          options.variants.find((v: any) => v.opt === opt);
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      var variant: typeof ImageSwitchType.variants = paramCheck(variant_check, {
        opt: opt,
      });

      // check for option param or return default value
      var active: string = paramCheck(options.active_class, "active");

      // check if sizes object with font sizes is not null or undefined
      try {
        var hide_check: typeof ImageSwitchType.variants.hide = variant.hide;
      } catch (err) {
        console.log("Hide object not found. Creating default parameters.");
      }
      let hide_checked: typeof ImageSwitchType.variants.hide = paramCheck(
        hide_check,
        {
          hidden: true,
          class_to_hide: "hide-container1",
          class_to_show: "show-container1",
          class_parent: "hide-show-wrapper",
          resize: "resize-hide",
        }
      );

      // get classes from params for container to hide and show
      let hidden: boolean = paramCheck(hide_checked.hidden, true);
      let hide: string = paramCheck(
        hide_checked.class_to_hide,
        "hide-container1"
      );
      let show: string = paramCheck(
        hide_checked.class_to_show,
        "show-container1"
      );
      let resize: string = paramCheck(hide_checked.resize, "resize-hide");

      // get class for wrapper of hide show container
      let parent: string = paramCheck(
        hide_checked.class_parent,
        "hide-show-wrapper"
      );

      // get urlparam key
      var urlparam: string = paramCheck(variant.urlparam, "image");

      // get fade class
      let fade: string = paramCheck(variant.fade, "fade");

      // check if sizes object with font sizes is not null or undefined
      try {
        var small_check: typeof ImageSwitchType.variants.column_small =
          variant.column_small;
      } catch (err) {
        console.log("Hide object not found. Creating default parameters.");
      }
      let column_small_check: typeof ImageSwitchType.variants.column_small =
        paramCheck(small_check, {
          class: "col-md-6",
          percent: "50%",
        });

      // check if sizes object with font sizes is not null or undefined
      try {
        var large_check: typeof ImageSwitchType.variants.column_full =
          variant.column_full;
      } catch (err) {
        console.log("Hide object not found. Creating default parameters.");
      }
      let column_full_checked: typeof ImageSwitchType.variants.column_full =
        paramCheck(large_check, {
          class: "col-md-12",
          percent: "100%",
        });

      // get classes and style for hide show container resizing
      let column_small: any[] = [
        paramCheck(column_small_check.class, "col-md-6"),
        paramCheck(column_small_check.percent, "50%"),
      ];
      let column_full: any[] = [
        paramCheck(column_full_checked.class, "col-md-12"),
        paramCheck(column_full_checked.percent, "100%"),
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
        ) as NodeListOf<Element>;
        [...hide_elements].forEach((el: HTMLElement) => {
          el.classList.remove(fade);
          el.classList.add(column_small[0]);
          el.style.maxWidth = column_small[1];
          el.classList.add(active);
        });

        let show_elements = document.querySelectorAll(
          `.${show}`
        ) as NodeListOf<Element>;
        [...show_elements].forEach((el: HTMLElement) => {
          el.classList.add(column_small[0]);
          el.classList.remove(column_full[0]);
          el.style.maxWidth = column_small[1];
          el.classList.add(active);
        });
        let resize_elements = document.querySelectorAll(
          `.${resize}`
        ) as NodeListOf<Element>;
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
        ) as NodeListOf<Element>;
        [...hide_elements].forEach((el: HTMLElement) => {
          el.classList.add(fade);
          el.classList.remove(column_small[0]);
          el.style.maxWidth = column_full[1];
          el.classList.remove(active);
        });

        let show_elements = document.querySelectorAll(
          `.${show}`
        ) as NodeListOf<Element>;
        [...show_elements].forEach((el: HTMLElement) => {
          el.classList.remove(column_small[0]);
          el.classList.add(column_full[0]);
          el.style.maxWidth = column_full[1];
          el.classList.remove(active);
        });

        let resize_elements = document.querySelectorAll(
          `.${resize}`
        ) as NodeListOf<Element>;
        [...resize_elements].forEach((el: HTMLElement) => {
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
        let checkbox = document.getElementById(opt) as HTMLElement;
        checkbox.classList.remove(active);

        /* if value is off it should not be part of the urlsearchparams */
        urlParam.delete(urlparam);
      }

      // get citation url class and update citation
      let citation_url_str: string = paramCheck(
        variant.chg_citation,
        "citation-url"
      );
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
    // import types from utils.types.ts
    const { AnnotationType } = require("../../utils/types");
    const { addMarkup, removeMarkup } = require("../../utils/utils");

    // get key for session storage and access coockies
    let data = "annotation_slider";
    let storage = sessionStorage.getItem(data);
    if (storage) {
      let options: typeof AnnotationType | null | undefined =
        JSON.parse(storage);

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
        var variant_check: typeof AnnotationType.variants =
          options.variants.filter((v: any) => v.features.all === false);
      } catch (err) {
        console.log(
          `WARNING 3 - search_params/main: No option parameters found.\n
           Creating default parameters to continue.`
        );
      }
      let allVariants: NodeListOf<Element> =
        document.querySelectorAll("annotation-slider");
      var allVariantsObjs: any[] = [];
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
      let variants: typeof AnnotationType.variants = paramCheck(
        variant_check,
        allVariantsObjs
      );

      // in case user config input for features.all is not a boolean value
      // return Warning 6
      try {
        var variant_check_bool = options.variants.filter(
          (v: any) => typeof v.features.all !== "boolean"
        );
      } catch (err) {
        console.log(
          `WARNING 5 - search_params/main: No option parameters found.\n
           Creating default parameters to continue.`
        );
      }
      let wrg_ft: any[] = paramCheck(variant_check_bool, []);
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
      try {
        var span_check = options.span_element;
      } catch (err) {
        console.log(
          `WARNING 6 - search_params/main: span_element.css_class object not found.\n
           Creating default parameters.`
        );
      }
      let span_checked = paramCheck(span_check, {
        css_class: "badge-item",
      });

      // get params from options
      let style = paramCheck(span_checked, "badge-item");
      let active = paramCheck(options.active_class, "active");

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
      for (let v in variants) {
        // paramCheck verifies if config is avaliable
        // if not default parameters are created
        let opt: string = paramCheck(variants[v].opt, `any-feature-${v}`);
        let opt_class: string = paramCheck(
          variants[v].features.class,
          `class-${opt}`
        );
        let color: string = paramCheck(variants[v].color, `color-${opt}`);
        let html_class: string = paramCheck(
          variants[v].html_class,
          `html-class-${opt}`
        );
        let css_class: string = paramCheck(
          variants[v].css_class,
          `css-class-${opt}`
        );
        let opt_slider: string = paramCheck(
          variants[v].opt_slider,
          `${opt}-slider`
        );
        let hide: typeof AnnotationType.variants.hide | boolean = paramCheck(
          variants[v].hide,
          false
        );
        if (urlParam.get(opt) === null) {
          // ##############################################
          // check if urlparam is null
          // if true also check if variant default is true
          // ##############################################
          if (variants[v].default === true) {
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

        let citation_url_str = paramCheck(
          variants[v].chg_citation,
          "citation-url"
        );
        if (citation_url_str) {
          var citation_url = document.getElementById(citation_url_str);
        }
      }

      // ####################################################################################
      // handling features.all slider to receive active or inactive status
      // algorithm:
      // if all group variants are active turn group leader active -> task result 1
      // if none or not all variants are active turn group leader inactive -> task result 2
      [...variantAll].forEach((el: any) => {
        let optAll: string = paramCheck(el.opt, `all-features`);
        var feat_leader = document.getElementById(optAll) as HTMLInputElement;
        var feat_leader_class: string = el.features.class;
        var variants_features_class: any[] = variants.filter(
          (v: any) => v.features.class === feat_leader_class
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
    }
  }

  pageUrl() {
    const { hideLoading } = require("../../utils/utils");
    // get session cookies as parameters
    let data = "image_loader";
    let storage = sessionStorage.getItem(data);
    var OpenSeadragon = require("openseadragon");

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
