import { uptState, paramCheck } from "../../utils/utils";
import type {
  MultiLanguageType,
  MultiLanguageVariant,
} from "../../utils/types";

export class MultiLanguage extends HTMLElement {
  static get observedAttributes() {
    return ["opt"];
  }

  connectedCallback() {
    this.render();
    this.childNodes[1].addEventListener("click", this.multiLanguage);
    // console.log(this.childNodes[1]);
  }

  // function to triggers on click of the rendered element
  multiLanguage() {
    // get session cookie with configartion json
    let data = "multi_language";
    let storage = sessionStorage.getItem(data);
    if (storage) {
      let options: MultiLanguageType = JSON.parse(storage);

      // get current url parameters
      let url = new URL(window.location.href);
      // let hash = url.hash;
      let urlParam = new URLSearchParams(url.search);

      // get id of rendered html element. opt value of custom element is used as ID.
      let id = this.getAttribute("id").split("ml_")[1];
      if (!id) {
        console.log(
          "ID of multi language custom child element not found. \
                Make sure the annotation-slider element holds the attribute 'opt' with \
                a defined string value."
        );
      }

      // configuration holds an array with variants with at least one variant object.
      // to match the custom element with the configuration the opt value must match.
      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check: MultiLanguageVariant = options.variants.find(
          (v) => v.opt === id
        );
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      // variant as selected in UI
      let variant = variant_check ? variant_check : { opt: id };
      if (!variant) {
        console.log(
          "No variant found! Please define a variant object that contains \
                and 'opt' key holding a string value that matches the 'opt' value of custom \
                element 'annotation#slider'."
        );
      }

      /* check if language mappings is available */
      var map = variant.map ? variant.map : { "index.html": "index-en.html" };

      /* save state in urlparam lang */
      urlParam.set("lang", variant.opt);

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

          /* reload document after replaceState or url href */
          location.reload();
          return false;
        }
      }
    }
  }

  // function to render HTML element inside the custom element
  render() {
    let data = "multi_language";
    let storage = sessionStorage.getItem(data);

    let options: MultiLanguageType = JSON.parse(storage);

    let opt = this.getAttribute("opt");
    // check if user set opt attribute
    if (typeof opt !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }

    // variant is found by comparing variant config opt with custom element attr opt
    try {
      var variant_check: MultiLanguageVariant = options.variants.find(
        (v) => v.opt === opt
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

    let title = variant.title ? variant.title : "English";
    let v_class = variant.class ? variant.class : "nav-link pointer";

    this.innerHTML = `
        <a id="ml_${variant.opt}" class="${v_class}">${title}</a>
      `;
  }

  attributeChangedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.childNodes[1].removeEventListener("click", this.multiLanguage);
  }
}
