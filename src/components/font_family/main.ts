import { uptState } from "../../utils/utils";
import type { FontFamilyType, FontVariant } from "../../utils/types";

export class FontFamily extends HTMLElement {
  static get observedAttributes() {
    return ["opt"];
  }

  connectedCallback() {
    this.render();
    // console.log(this.childNodes[3]);
    this.childNodes[3].addEventListener("change", this.fontFamily);
  }

  fontFamily() {
    let data = "font_family";
    let storage = sessionStorage.getItem(data);

    if (storage) {
      let options: FontFamilyType = JSON.parse(storage);

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

      // get citation url key and HTMLElement
      var citation_url_str = variant.chg_citation
        ? variant.chg_citation
        : "citation-url";
      var citation_url = document.getElementById(citation_url_str);

      // get urlparam key
      var urlparam = variant.urlparam ? variant.urlparam : "font";

      // define paragraph HTML element name
      let p_change = variant.paragraph ? variant.paragraph : "p";
      // define class to change font sizes (not all paragraphs might need to be changed)
      let p_class = variant.p_class ? variant.p_class : "yes-index";

      // check if sizes object with font sizes is not null or undefined
      try {
        var family_check = variant.fonts;
      } catch (err) {
        console.log(
          "Font family object not found. Creating default parameters."
        );
      }
      let family = family_check
        ? family_check
        : {
            default: "default",
            font1: "Times-New-Roman",
            font2: "Courier-New",
            font3: "Arial-serif",
          };

      // change select option value based on provided url param
      var select = document.getElementById(variant.opt) as HTMLSelectElement;
      var value = select.value;

      if (urlParam.get(urlparam) !== value) {
        urlParam.set(urlparam, value);
        let paragraph = document.querySelectorAll(`${p_change}.${p_class}`);
        paragraph.forEach((el) => {
          for (let s in family) {
            if (family[s] !== "default") {
              el.classList.remove(family[s].toLowerCase());
            }
          }
          if (value !== "default") {
            el.classList.add(value.toLowerCase());
          }
        });
      }

      var stateName = variant.opt;
      var stateParam = urlParam.get(urlparam);
      var state = {
        [stateName]: stateParam,
      };

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
    let data = "font_family";
    let storage = sessionStorage.getItem(data);

    let options: FontFamilyType = JSON.parse(storage);

    let opt = this.getAttribute("opt");
    // check if user set opt attribute
    if (typeof opt !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }

    // variant is found by comparing variant config opt with custom element attr opt
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

    // check if sizes object with font sizes is not null or undefined
    var family = variant.fonts
      ? variant.fonts
      : {
          default: "default",
          font1: "Times-New-Roman",
          font2: "Courier-New",
          font3: "Arial-serif",
        };

    let html_class = options.html_class ? options.html_class : "custom-select";
    let css_class = variant.css_class ? variant.css_class : "";
    let opt_title = variant.title ? variant.title : "Font Family";

    let s_html = `
            <small><label style="padding:.2em;">${opt_title}:</label></small>
            <select id="${opt}" data-target="${data}" class="${html_class}">
        `;
    for (let s in family) {
      if (family[s] == "default") {
        var option = `<option value="default" selected='selected'>${family[
          s
        ].replace("-", " ")}`;
      } else {
        var option = `<option value='${css_class}${family[s]}'>${family[
          s
        ].replace("-", " ")}`;
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
    this.childNodes[2].removeEventListener("change", this.fontFamily);
  }
}
