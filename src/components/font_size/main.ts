import { uptState } from "../../utils/utils";
import type {
  FontFamilyType,
  FontSizeType,
  FontVariant,
} from "../../utils/types";

export class FontSize extends HTMLElement {
  static get observedAttributes() {
    return ["opt"];
  }

  connectedCallback() {
    this.render();
    // console.log(this.childNodes[3]);
    this.childNodes[3].addEventListener("change", this.fontSize);
  }

  fontSize() {
    let data = "fontsize";
    let storage: string | null = sessionStorage.getItem(data);

    if (storage) {
      var options: FontSizeType = JSON.parse(storage);

      let url = new URL(window.location.href);
      let urlParam = new URLSearchParams(url.search);

      let id = this.getAttribute("id");
      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check: FontVariant = options.variants.find(
          (v) => v.opt === id
        );
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      var variant = variant_check ? variant_check : { opt: id };

      let p_change = variant.paragraph ? variant.paragraph : "p";
      let p_class = variant.p_class ? variant.p_class : "yes-index";

      try {
        var size_check = variant.sizes;
      } catch (err) {
        console.log("Sizes obj not found. Creating default parameters.");
      }
      let size = size_check
        ? size_check
        : {
            default: "default",
            font_size_14: "14",
            font_size_18: "18",
            font_size_22: "22",
            font_size_26: "26",
          };

      let urlparam = variant.urlparam ? variant.urlparam : "fontsize";

      var value = (document.getElementById(id) as HTMLSelectElement).value;

      var css_class = variant.css_class ? variant.css_class : "font-size-";

      if (urlParam.get(urlparam) !== value.replace(css_class, "")) {
        urlParam.set(urlparam, value.replace(css_class, ""));
        let paragraph = document.querySelectorAll(`${p_change}.${p_class}`);
        [...paragraph].forEach((el) => {
          for (let s in size) {
            if (size[s] !== "default") {
              el.classList.remove(css_class + size[s]);
            }
          }
          if (value !== "default") {
            el.classList.add(value);
          }
        });
      }

      var stateName = variant.opt ? variant.opt : "select-fontsize";
      var stateParam = urlParam.get(urlparam);
      var state = {
        [stateName]: stateParam,
      };
      // window.history.pushState(state, '', `${location.pathname}?${urlParam}${location.hash}`);
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

  render() {
    let data = "fontsize";
    let storage: string | null = sessionStorage.getItem(data);

    var options: FontFamilyType = JSON.parse(storage);

    let opt = this.getAttribute("opt");
    try {
      var variant_check: FontVariant = options.variants.find(
        (v) => v.opt === opt
      );
    } catch (err) {
      console.log(
        "No option parameters found. Creating default parameters to continue."
      );
    }
    var variant = variant_check ? variant_check : { opt: opt };
    let size = variant.sizes
      ? variant.sizes
      : {
          default: "default",
          font_size_14: "14",
          font_size_18: "18",
          font_size_22: "22",
          font_size_26: "26",
        };

    var html_class = options.html_class ? options.html_class : "custom-select";
    var css_class = variant.css_class ? variant.css_class : "font-size-";
    var var_title = variant.title ? variant.title : "Font size";

    let s_html = `
            <small><label style="padding:.2em;">${var_title}:</label></small>
            <select id="${opt}" data-target="${data}" class="${html_class}">
        `;
    for (let s in size) {
      if (size[s] == "default") {
        var option = `<option value="default" selected='selected'>${size[s]
          .split("-")
          .slice(-1)} px`;
      } else {
        var option = `<option value='${css_class}${size[s]}'>${size[s]
          .split("-")
          .slice(-1)} px`;
      }
      s_html += option;
      s_html += "</option>";
    }
    s_html += "</select>";
    this.innerHTML = s_html;
  }

  attributeChangedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.childNodes[3].removeEventListener("change", this.fontSize);
  }
}
