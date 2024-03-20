import { addMarkup, removeMarkup, uptState } from "../../utils/utils";
import type { AnnotationType, Features, Variant } from "../../utils/types";

export class AnnotationSlider extends HTMLElement {
  options: AnnotationType | null | undefined;

  static get observedAttributes() {
    return ["opt", "onclick"];
  }

  connectedCallback() {
    this.render();
    this.childNodes[3].childNodes[1].addEventListener(
      "click",
      this.textFeatures
    );
    // console.log(this.childNodes[3].childNodes[1]);
  }

  // function to triggers on click of the rendered element
  textFeatures() {
    // get session cookie with configuration json
    let data = "annotation_slider";
    let storage = sessionStorage.getItem(data);
    if (storage) {
      let options: AnnotationType | null | undefined = JSON.parse(storage);

      // get current url parameters
      let url = new URL(window.location.href);
      // let hash = url.hash;
      let urlParam = new URLSearchParams(url.search);

      // get id of rendered html element. opt value of custom element is used as ID.
      let id = this.getAttribute("id");
      if (!id) {
        console.log(
          "Error 001 in component annotation slider: \
          ID of annotation slider custom child element not found. \
          Make sure the annotation-slider element holds the attribute 'opt' with \
          a defined string value."
        );
      }

      // configuration holds an array with variants with at least one variant object.
      // to match the custom element with the configuration the opt value must match.
      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check: Variant = options.variants.find(
          (v: any) => v.opt === id
        );
      } catch (err) {
        console.log(
          "Error 002 in component annotation slider:\
          No option parameters found. Creating default parameters to continue."
        );
      }
      // variant as selected in UI
      let variant: Variant = variant_check
        ? variant_check
        : {
            opt: id,
            features: {
              all: false,
              class: "single-feature",
            },
          };
      if (!variant) {
        console.log(
          "Error 003 in component annotation slider:\
          No variant found! Please define a variant object that contains \
                and 'opt' key holding a string value that matches the 'opt' value of custom \
                element 'annotation#slider'."
        );
      }

      // use try/catch to verify if object exists in options
      try {
        var features_check: Features = variant.features;
      } catch (err) {
        console.log(
          "Message 004 in component annotation slider:\
          Features object in variant not found. Creating default parameters."
        );
      }
      // check if features params of UI variant are available
      var features: Features = features_check
        ? features_check
        : {
            all: false,
            class: "single-feature",
          };

      // use try/catch to verify if object exists in options
      try {
        var variants_check = options.variants.filter(
          (v: any) => v.features.all === false
        );
      } catch (err) {
        console.log(
          "Message 005 in component annotation slider:\
          No option parameters found. Creating default parameters to continue."
        );
      }
      // all variants except all features
      var variants = variants_check
        ? variants_check
        : [
            {
              opt: id,
              features: {
                all: false,
                class: "single-feature",
              },
            },
          ];

      // use try/catch to verify if object exists in options
      try {
        var none_variant_check = options.variants.filter(
          (v: any) => v.features.all === true
        );
      } catch (err) {
        console.log(
          "Message 006 in component annotation slider:\
          No option parameters found. Creating default parameters to continue."
        );
      }
      // all-features variant
      var none_variant = none_variant_check
        ? none_variant_check
        : [
            {
              opt: "text-features",
              features: {
                all: true,
                class: "features-1",
              },
            },
          ];

      // use try/catch to verify if object exists in options
      try {
        var style_check = options.span_element;
      } catch (err) {
        console.log(
          "Message 007 in component annotation slider:\
        style obj not found. Creating default parameters."
        );
      }
      var style = style_check
        ? style_check
        : {
            css_class: "badge-item",
          };

      var active = options.active_class ? options.active_class : "active";

      // variants are either single-feature or all-features
      // single-features manipulate the DOM based on a given class
      // all-features control all other single-feature variants
      // one to control them all (well could be several to control them all)

      // in control all other sliders the following defines seperates
      // the all-features variant from others. If one is found it triggers
      // all sliders by clicking on the all-features slider variant
      var all = features.all;
      var allClass = features.class;

      if (all === true) {
        // the current state of the annoation slider is set bei adding or
        // removing a class e.g. 'active'
        if (this.classList.contains(active)) {
          this.classList.remove(active);

          // if current state is active remove class/state
          // find all element classes in DOM and remove CSS class
          [...variants].forEach((el: any) => {
            if (
              (document.getElementById(el.opt) as HTMLInputElement).checked ===
                true &&
              el.features.class === allClass
            ) {
              // for all found DOM elements remove color class and css_class
              // if hide is true hide elements with display:none
              var color = el.color ? el.color : `color-${el.opt}`;
              let html_class = el.html_class
                ? el.html_class
                : `html-class-${el.opt}`;
              let css_class = el.css_class
                ? el.css_class
                : `css-class-${el.opt}`;
              let hide = el.hide ? el.hide : false;

              // besides removing marktup the function 'removemarkup()' returns
              // the number of elements nodes found as string
              let selected = removeMarkup(
                html_class,
                css_class,
                color,
                hide,
                style
              );

              // the color class is also removed from the slider element
              var slider_str = el.opt_slider
                ? el.opt_slider
                : `${el.opt}-slider`;

              try {
                let slider = document.getElementById(slider_str) as HTMLElement;
                slider.classList.remove(color);

                // the data attrib and class is removed from slider element
                slider.removeAttribute("data");
                slider.classList.remove("slider-number");
              } catch (err) {
                console.log(`Error 008 in component annotation slider: \
                slider class ${slider_str} not found!`);
              }

              // disables the checked value from input element
              // as well as the class to define the state
              (document.getElementById(el.opt) as HTMLInputElement).checked =
                false;
              (
                document.getElementById(el.opt) as HTMLInputElement
              ).classList.remove(active);

              // access the url params and sets the key to off
              urlParam.delete(el.opt);
            }
          });

          // the node count also works on the all-features variant
          this.removeAttribute("data");
          this.classList.remove("slider-number");
        } else {
          // same functionality as above but with reversed effect
          // adds markup, count and changes state to active
          var count = 0;
          this.classList.add(active);
          [...variants].forEach((el: any) => {
            if (
              (document.getElementById(el.opt) as HTMLInputElement).checked ===
                false &&
              el.features.class === allClass
            ) {
              var color = el.color ? el.color : `color-${el.opt}`;
              let html_class = el.html_class
                ? el.html_class
                : `html-class-${el.opt}`;
              let css_class = el.css_class
                ? el.css_class
                : `css-class-${el.opt}`;
              let hide = el.hide ? el.hide : false;
              var selected = addMarkup(
                html_class,
                css_class,
                color,
                hide,
                style
              );
              var slider_str = el.opt_slider
                ? el.opt_slider
                : `${el.opt}-slider`;

              try {
                let slider = document.getElementById(slider_str) as HTMLElement;

                slider.classList.add(color);
                slider.setAttribute("data", selected);
                slider.classList.add("slider-number");
              } catch (err) {
                console.log(
                  `Message 009 in component annotation slider: \
                  slider class ${slider_str} not found!`
                );
              }

              (document.getElementById(el.opt) as HTMLInputElement).checked =
                true;
              (
                document.getElementById(el.opt) as HTMLInputElement
              ).classList.add(active);
              urlParam.set(el.opt, "on");
              count += parseInt(selected);
            }
          });

          this.setAttribute("data", String(count));
          this.classList.add("slider-number");
        }
      } else if (typeof all !== "boolean") {
        // if the all-features key is not a boolean it displays a waring in the console.
        console.log(
          `Error 010 in component annotation slider: \
          Type of variant config. "features.all" must be Boolean (true or false)`
        );
      } else {
        // if variant is a single-feature this part triggers
        // either adds or removes markup (classes) depending on the state of the slider
        var color = variant.color ? variant.color : `color-${variant.opt}`;
        var html_class = variant.html_class
          ? variant.html_class
          : `html-class-${variant.opt}`;
        var css_class = variant.css_class
          ? variant.css_class
          : `css-class-${variant.opt}`;
        var hide = variant.hide ? variant.hide : { hidden: false, class: "" };
        var slider_str = variant.opt_slider
          ? variant.opt_slider
          : `${variant.opt}-slider`;

        if (this.classList.contains(active)) {
          // state == active (remove state and markup)
          this.classList.remove(active);
          let selected = removeMarkup(
            html_class,
            css_class,
            color,
            hide,
            style
          );

          try {
            let slider = document.getElementById(slider_str) as HTMLElement;
            slider.classList.remove(color);
            slider.removeAttribute("data");
            slider.classList.remove("slider-number");
          } catch (err) {
            console.log(`Error 011 in component annotation slider: \
            slider class ${slider_str} not found!`);
          }

          this.classList.remove(color);
          urlParam.delete(variant.opt);
        } else {
          // state == not active (add state and markup)
          this.classList.add(active);
          let selected = addMarkup(html_class, css_class, color, hide, style);

          try {
            let slider = document.getElementById(slider_str) as HTMLElement;
            slider.classList.add(color);
            slider.setAttribute("data", selected);
            slider.classList.add("slider-number");
          } catch (err) {
            console.log(`Error 012 in component annotation slider: \
            slider class ${slider_str} not found!`);
          }

          this.classList.add(color);
          urlParam.set(variant.opt, "on");
        }

        /*
          If all or not all annotation-sliders are selected the slider
          link will automatically be switched on or off.
        */
        var feat_leader = none_variant.find(
          (g: any) => g.features.class === features.class
        );
        if (feat_leader instanceof Object) {
          let variants_checked = document.querySelectorAll(
            `input.${features.class}[aot-type="false"]:checked`
          );
          let variants_group = variants.filter(
            (v: any) =>
              v.features.all === false && v.features.class === features.class
          );
          if (variants_checked.length === variants_group.length) {
            (
              document.getElementById(feat_leader.opt) as HTMLInputElement
            ).checked = true;
            (
              document.getElementById(feat_leader.opt) as HTMLInputElement
            ).classList.add(active);
          } else {
            (
              document.getElementById(feat_leader.opt) as HTMLInputElement
            ).checked = false;
            (
              document.getElementById(feat_leader.opt) as HTMLInputElement
            ).classList.remove(active);
          }
        }
      }

      // current state of the annotation sliders is saved in the url parameters
      // current state is also saved in window history (back/forward browser button)
      var stateName = variant.opt;
      var state = {
        [stateName]: "on/off",
      };

      // try to find elment holding an ID matching the 'chg_citation' string value
      // get citation url key and HTMLElement
      var citation_url_str = variant.chg_citation
        ? variant.chg_citation
        : "citation-url";
      var citation_url = document.getElementById(citation_url_str);

      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: false,
        cit: citation_url,
        state: state,
        href: href,
      });
    }
  }

  // function to render HTML element inside the custom element
  render() {
    let data = "annotation_slider";
    let storage = sessionStorage.getItem(data);

    let options: AnnotationType | null | undefined = JSON.parse(storage);

    let opt = this.getAttribute("opt");
    // check if user set opt attribute
    if (typeof opt !== "string") {
      console.log(
        "Error 013 in component annotation slider: \
      No 'opt' attribute in custom element font-family found!"
      );
    }

    // get attribute with onclick function
    var dme_onclick = this.getAttribute("onclick");

    // variant is found by comparing variant config opt with custom element attr opt
    try {
      var variant_check = options.variants.find((v: any) => v.opt === opt);
    } catch (err) {
      console.log(
        "Message 014 in component annotation slider: \
        No option parameters found. Creating default parameters to continue."
      );
    }
    var variant = variant_check
      ? variant_check
      : {
          opt: opt,
          features: {
            class: "features-1",
            all: false,
          },
        };

    try {
      var features_check = variant.features;
    } catch (err) {
      console.log(
        "Message 015 in component annotation slider: \
        Features object in variant not found. Creating default parameters."
      );
    }
    let features = features_check
      ? features_check
      : {
          all: false,
          class: "feature-1",
        };

    let title = variant.title ? variant.title : "Text Feature";
    let opt_slider = variant.opt_slider ? variant.opt_slider : `${opt}-slider`;

    // check if sizes object with font sizes is not null or undefined
    try {
      var rendered_element_check = options.rendered_element;
    } catch (err) {
      console.log(
        "Message 017 in component annotation slider: \
      Hide object not found. Creating default parameters."
      );
    }
    let rendered_element = rendered_element_check
      ? rendered_element_check
      : {
          label_class: "switch",
          slider_class: "i-slider round",
        };

    let render_class = rendered_element.label_class
      ? rendered_element.label_class
      : "switch";
    let slider_class = rendered_element.slider_class
      ? rendered_element.slider_class
      : "i-slider round";
    this.innerHTML = `
            <label>${title}</label>
            <label class="${render_class}">
                <input title="${title}"
                    onclick="${dme_onclick}"
                    type="checkbox"
                    id="${opt}"
                    data-target="${data}"
                    class="${features.class}"
                    aot-type="${String(features.all)}"/>
                <span id="${opt_slider}" class="${slider_class}"></span>
            </label>
        `;
  }

  // attributeChangedCallback() {
  //   this.render();
  // }

  disconnectedCallback() {
    this.childNodes[3].childNodes[1].removeEventListener(
      "click",
      this.textFeatures
    );
  }
}
