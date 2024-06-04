import OpenSeadragon from 'openseadragon';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/utils/setCookie.ts
var SetDataCookie = class {
  constructor(name, config3) {
    __publicField(this, "name");
    __publicField(this, "config");
    this.name = name;
    this.config = config3;
  }
  build() {
    sessionStorage.setItem(this.name, JSON.stringify(this.config));
  }
};

// src/utils/utils.ts
function removeMarkup(html_class, css_class, color, hide, style) {
  var selected = document.querySelectorAll(`.${html_class}`);
  selected.forEach((el) => {
    if (css_class instanceof Object) {
      css_class.forEach((css) => {
        if (el.classList.contains(css)) {
          el.classList.remove(css);
        } else {
          el.classList.add(css);
        }
      });
    } else {
      el.classList.remove(css_class);
    }
    el.classList.remove(color);
    el.classList.add(style.css_class);
  });
  if (hide) {
    try {
      var hde = hide.hidden;
    } catch (err) {
      console.log(`aot hide.hidden not found ${err}`);
      var hde = false;
    }
    try {
      var cls = hide.class;
    } catch (err) {
      console.log(`aot hide.hidden not found ${err}`);
      var cls = "";
    }
    if (hde && cls) {
      let hde2 = document.querySelectorAll(`.${cls}`);
      hde2.forEach((el) => {
        el.style.display = "none";
      });
    }
  }
  return String(selected.length);
}
function addMarkup(html_class, css_class, color, hide, style) {
  var selected = document.querySelectorAll(`.${html_class}`);
  selected.forEach((el) => {
    if (css_class instanceof Object) {
      css_class.forEach((css) => {
        if (el.classList.contains(css)) {
          el.classList.remove(css);
        } else {
          el.classList.add(css);
        }
      });
    } else {
      el.classList.add(css_class);
    }
    el.classList.add(color);
    el.classList.add(style.css_class);
  });
  if (hide) {
    try {
      var hde = hide.hidden;
    } catch (err) {
      console.log(`aot hide.hidden not found ${err}`);
      var hde = false;
    }
    try {
      var cls = hide.class;
    } catch (err) {
      console.log(`aot hide.hidden not found ${err}`);
      var cls = "";
    }
    if (hde && cls) {
      let hde2 = document.querySelectorAll(`.${cls}`);
      hde2.forEach((el) => {
        el.style.display = "inline";
      });
    }
  }
  return String(selected.length);
}
function uptState(options) {
  if (options.hist) {
    window.history.replaceState({}, "", options.href);
  }
  if (options.state) {
    window.history.pushState(options.state, "", options.href);
  }
  if (options.cit) {
    options.cit.innerHTML = `${location.hostname}${location.pathname}${options.href}`;
    options.cit.setAttribute("href", options.href);
  }
}
function hideLoading(id) {
  let spinnerID = "spinner_" + id;
  if (document.getElementById(spinnerID) !== null) {
    document.getElementById(spinnerID).remove();
  }
}
function paramCheck(param, def) {
  if (param) {
    return param;
  } else {
    return def;
  }
}

// src/components/annotation_slider/main.ts
var AnnotationSlider = class extends HTMLElement {
  constructor() {
    super(...arguments);
    __publicField(this, "options");
  }
  static get observedAttributes() {
    return ["opt", "onclick"];
  }
  connectedCallback() {
    this.render();
    this.childNodes[3].childNodes[1].addEventListener(
      "click",
      this.textFeatures
    );
  }
  // function to triggers on click of the rendered element
  textFeatures() {
    let data = "annotation_slider";
    let storage = sessionStorage.getItem(data);
    if (storage) {
      let options = JSON.parse(storage);
      let url = new URL(window.location.href);
      let urlParam = new URLSearchParams(url.search);
      let id = this.getAttribute("id");
      if (!id) {
        console.log(
          "Error 001 in component annotation slider:           ID of annotation slider custom child element not found.           Make sure the annotation-slider element holds the attribute 'opt' with           a defined string value."
        );
      }
      var variant_check = options.variants.find((v) => v.opt === id);
      let variant = variant_check ? variant_check : {
        opt: id ? id : "text-features-1",
        features: {
          all: false,
          class: "single-feature"
        }
      };
      if (!variant) {
        console.log(
          "Error 003 in component annotation slider:          No variant found! Please define a variant object that contains                 and 'opt' key holding a string value that matches the 'opt' value of custom                 element 'annotation#slider'."
        );
      }
      var features = variant.features ? variant.features : {
        all: false,
        class: "single-feature"
      };
      var variants_check = options.variants.filter(
        (v) => v.features.all === false
      );
      var variants = variants_check ? variants_check : [
        {
          opt: id ? id : "text-features-all",
          features: {
            all: false,
            class: "single-feature"
          }
        }
      ];
      var none_variant_check = options.variants.filter(
        (v) => v.features.all === true
      );
      var none_variant = none_variant_check ? none_variant_check : [
        {
          opt: "text-features",
          features: {
            all: true,
            class: "features-1"
          }
        }
      ];
      var style = options.span_element ? options.span_element : {
        css_class: "badge-item"
      };
      var active = options.active_class ? options.active_class : "active";
      var all = features.all;
      var allClass = features.class;
      if (all === true) {
        if (this.classList.contains(active)) {
          this.classList.remove(active);
          [...variants].forEach((el) => {
            if (document.getElementById(el.opt).checked === true && el.features.class === allClass) {
              var color2 = el.color ? el.color : `color-${el.opt}`;
              let html_class2 = el.html_class ? el.html_class : `html-class-${el.opt}`;
              let css_class2 = el.css_class ? el.css_class : `css-class-${el.opt}`;
              let hide2 = el.hide ? el.hide : { hidden: false, class: "" };
              removeMarkup(html_class2, css_class2, color2, hide2, style);
              var slider_str2 = el.opt_slider ? el.opt_slider : `${el.opt}-slider`;
              try {
                let slider = document.getElementById(slider_str2);
                slider.classList.remove(color2);
                slider.removeAttribute("data");
                slider.classList.remove("slider-number");
              } catch (err) {
                console.log(`Error 008 in component annotation slider:                 slider class ${slider_str2} not found!`);
              }
              document.getElementById(el.opt).checked = false;
              document.getElementById(el.opt).classList.remove(active);
              urlParam.delete(el.opt);
            }
          });
          this.removeAttribute("data");
          this.classList.remove("slider-number");
        } else {
          var count = 0;
          this.classList.add(active);
          [...variants].forEach((el) => {
            if (document.getElementById(el.opt).checked === false && el.features.class === allClass) {
              var color2 = el.color ? el.color : `color-${el.opt}`;
              let html_class2 = el.html_class ? el.html_class : `html-class-${el.opt}`;
              let css_class2 = el.css_class ? el.css_class : `css-class-${el.opt}`;
              let hide2 = el.hide ? el.hide : false;
              var selected = addMarkup(
                html_class2,
                css_class2,
                color2,
                hide2,
                style
              );
              var slider_str2 = el.opt_slider ? el.opt_slider : `${el.opt}-slider`;
              try {
                let slider = document.getElementById(slider_str2);
                slider.classList.add(color2);
                slider.setAttribute("data", selected);
                slider.classList.add("slider-number");
              } catch (err) {
                console.log(
                  `Message 009 in component annotation slider:                   slider class ${slider_str2} not found!`
                );
              }
              document.getElementById(el.opt).checked = true;
              document.getElementById(el.opt).classList.add(active);
              urlParam.set(el.opt, "on");
              count += parseInt(selected);
            }
          });
          this.setAttribute("data", String(count));
          this.classList.add("slider-number");
        }
      } else if (typeof all !== "boolean") {
        console.log(
          `Error 010 in component annotation slider:           Type of variant config. "features.all" must be Boolean (true or false)`
        );
      } else {
        var color = variant.color ? variant.color : `color-${variant.opt}`;
        var html_class = variant.html_class ? variant.html_class : `html-class-${variant.opt}`;
        var css_class = variant.css_class ? variant.css_class : `css-class-${variant.opt}`;
        var hide = variant.hide ? variant.hide : { hidden: false, class: "" };
        var slider_str = variant.opt_slider ? variant.opt_slider : `${variant.opt}-slider`;
        if (this.classList.contains(active)) {
          this.classList.remove(active);
          removeMarkup(
            html_class,
            css_class,
            color,
            hide,
            style
          );
          try {
            let slider = document.getElementById(slider_str);
            slider.classList.remove(color);
            slider.removeAttribute("data");
            slider.classList.remove("slider-number");
          } catch (err) {
            console.log(`Error 011 in component annotation slider:             slider class ${slider_str} not found!`);
          }
          this.classList.remove(color);
          urlParam.delete(variant.opt);
        } else {
          this.classList.add(active);
          let selected = addMarkup(html_class, css_class, color, hide, style);
          try {
            let slider = document.getElementById(slider_str);
            slider.classList.add(color);
            slider.setAttribute("data", selected);
            slider.classList.add("slider-number");
          } catch (err) {
            console.log(`Error 012 in component annotation slider:             slider class ${slider_str} not found!`);
          }
          this.classList.add(color);
          urlParam.set(variant.opt, "on");
        }
        var feat_leader = none_variant.find(
          (g) => g.features.class === features.class
        );
        if (feat_leader instanceof Object) {
          let variants_checked = document.querySelectorAll(
            `input.${features.class}[aot-type="false"]:checked`
          );
          let variants_group = variants.filter(
            (v) => v.features.all === false && v.features.class === features.class
          );
          if (variants_checked.length === variants_group.length) {
            document.getElementById(feat_leader.opt).checked = true;
            document.getElementById(feat_leader.opt).classList.add(active);
          } else {
            document.getElementById(feat_leader.opt).checked = false;
            document.getElementById(feat_leader.opt).classList.remove(active);
          }
        }
      }
      var stateName = variant.opt;
      var state = {
        [stateName]: "on/off"
      };
      var citation_url_str = variant.chg_citation ? variant.chg_citation : "citation-url";
      var citation_url = document.getElementById(citation_url_str);
      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: false,
        cit: citation_url,
        state,
        href
      });
    }
  }
  // function to render HTML element inside the custom element
  render() {
    let data = "annotation_slider";
    let storage = sessionStorage.getItem(data);
    if (storage === null)
      return;
    let options = JSON.parse(storage);
    let opt = this.getAttribute("opt");
    if (typeof opt !== "string") {
      console.log(
        "Error 013 in component annotation slider:       No 'opt' attribute in custom element font-family found!"
      );
    }
    var dme_onclick = this.getAttribute("onclick");
    var variant_check = options.variants.find((v) => v.opt === opt);
    var variant = variant_check ? variant_check : {
      opt: opt ? opt : "text-features-1",
      features: {
        class: "features-1",
        all: false
      }
    };
    let features = variant.features ? variant.features : {
      all: false,
      class: "feature-1"
    };
    let title = variant.title ? variant.title : "Text Feature";
    let opt_slider = variant.opt_slider ? variant.opt_slider : `${opt}-slider`;
    let rendered_element = options.rendered_element ? options.rendered_element : {
      label_class: "switch",
      slider_class: "i-slider round"
    };
    let render_class = rendered_element.label_class ? rendered_element.label_class : "switch";
    let slider_class = rendered_element.slider_class ? rendered_element.slider_class : "i-slider round";
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
};

// src/components/full_screen/main.ts
var FullSize = class extends HTMLElement {
  static get observedAttributes() {
    return ["opt"];
  }
  connectedCallback() {
    this.render();
    this.childNodes[3].addEventListener("click", this.fullScreen);
  }
  fullScreen() {
    let data = "fullsize";
    let storage = sessionStorage.getItem(data);
    if (storage) {
      var options = JSON.parse(storage);
      let url = new URL(window.location.href);
      let urlParam = new URLSearchParams(url.search);
      let id = this.getAttribute("id");
      var variant_check = options.variants.find((v) => v.opt === id);
      var variant = variant_check ? variant_check : { opt: id ? id : "fullscreen" };
      var active = options.active_class ? options.active_class : "active";
      var hide = variant.hide ? variant.hide : "hide-container";
      var hidden = variant.to_hide ? variant.to_hide : "fade";
      var svg_show = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
                    <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                </svg>
            `;
      var svg_hide = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                    <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
                </svg>
            `;
      var urlparam = variant.urlparam ? variant.urlparam : "fullscreen";
      if (urlParam.get(urlparam) == "off" || urlParam.get(urlparam) == null) {
        urlParam.set(urlparam, "on");
        document.querySelectorAll(`.${hide}`).forEach((el) => {
          el.classList.add(hidden);
        });
        this.innerHTML = svg_hide;
        this.classList.remove(active);
      } else {
        urlParam.delete(urlparam);
        document.querySelectorAll(`.${hide}`).forEach((el) => {
          el.classList.remove(hidden);
        });
        this.innerHTML = svg_show;
        this.classList.add(active);
      }
      var stateName = variant.opt ? variant.opt : "edition-fullscreen";
      var stateParam = urlParam.get(urlparam);
      var state = {
        [stateName]: stateParam
      };
      var citation_url_str = variant.chg_citation ? variant.chg_citation : "citation-url";
      var citation_url = document.getElementById(citation_url_str);
      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: false,
        cit: citation_url,
        state,
        href
      });
    }
  }
  render() {
    let data = "fullsize";
    var storage = sessionStorage.getItem(data);
    if (storage === null)
      return;
    var options = JSON.parse(storage);
    let opt = this.getAttribute("opt");
    var variant_check = options.variants.find((v) => v.opt === opt);
    var variant = variant_check ? variant_check : { opt: opt ? opt : "fullscreen" };
    var a_class = options.active_class ? options.active_class : "nav-link btn btn-round";
    var svg = options.render_svg ? options.render_svg : "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-fullscreen' viewBox='0 0 16 16'><path d='M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z'/></svg>";
    var opt_title = variant.title ? variant.title : "Full screen on/off";
    var var_opt = variant.opt ? variant.opt : "edition-fullscreen";
    this.innerHTML = `
            <small><label style="padding:.2em;">${opt_title}:</label></small>
            <a title="${opt_title}"
                style="cursor:pointer;"
                class="${a_class} active"
                id="${var_opt}"
                data-target="${data}">
                ${svg}
            </a>
        `;
  }
  attributeChangedCallback() {
    this.render();
  }
  disconnectedCallback() {
    this.childNodes[3].removeEventListener("click", this.fullScreen);
  }
};

// src/components/font_size/main.ts
var FontSize = class extends HTMLElement {
  static get observedAttributes() {
    return ["opt"];
  }
  connectedCallback() {
    this.render();
    this.childNodes[3].addEventListener("change", this.fontSize);
  }
  fontSize() {
    let data = "fontsize";
    let storage = sessionStorage.getItem(data);
    if (storage) {
      var options = JSON.parse(storage);
      let url = new URL(window.location.href);
      let urlParam = new URLSearchParams(url.search);
      let id = this.getAttribute("id");
      var variant_check = options.variants.find((v) => v.opt === id);
      var variant = variant_check ? variant_check : { opt: id ? id : "font-size" };
      let p_change = variant.paragraph ? variant.paragraph : "p";
      let p_class = variant.p_class ? variant.p_class : "yes-index";
      let size = variant.sizes ? variant.sizes : {
        default: "default",
        font_size_14: "14",
        font_size_18: "18",
        font_size_22: "22",
        font_size_26: "26"
      };
      let urlparam = variant.urlparam ? variant.urlparam : "fontsize";
      var value = document.getElementById(id ? id : "font-size").value;
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
        [stateName]: stateParam
      };
      var citation_url_str = variant.chg_citation ? variant.chg_citation : "citation-url";
      var citation_url = document.getElementById(citation_url_str);
      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: false,
        cit: citation_url,
        state,
        href
      });
    }
  }
  render() {
    let data = "fontsize";
    let storage = sessionStorage.getItem(data);
    if (storage === null)
      return;
    var options = JSON.parse(storage);
    let opt = this.getAttribute("opt");
    var variant_check = options.variants.find((v) => v.opt === opt);
    var variant = variant_check ? variant_check : { opt: opt ? opt : "font-size" };
    let size = variant.sizes ? variant.sizes : {
      default: "default",
      font_size_14: "14",
      font_size_18: "18",
      font_size_22: "22",
      font_size_26: "26"
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
        var option = `<option value="default" selected='selected'>${size[s].split("-").slice(-1)} px`;
      } else {
        var option = `<option value='${css_class}${size[s]}'>${size[s].split("-").slice(-1)} px`;
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
};

// src/components/font_family/main.ts
var FontFamily = class extends HTMLElement {
  static get observedAttributes() {
    return ["opt"];
  }
  connectedCallback() {
    this.render();
    this.childNodes[3].addEventListener("change", this.fontFamily);
  }
  fontFamily() {
    let data = "font_family";
    let storage = sessionStorage.getItem(data);
    if (storage) {
      let options = JSON.parse(storage);
      let url = new URL(window.location.href);
      let urlParam = new URLSearchParams(url.search);
      let id = this.getAttribute("id");
      var variant_check = options.variants.find((v) => v.opt === id);
      var variant = variant_check ? variant_check : { opt: id ? id : "font-family" };
      var citation_url_str = variant.chg_citation ? variant.chg_citation : "citation-url";
      var citation_url = document.getElementById(citation_url_str);
      var urlparam = variant.urlparam ? variant.urlparam : "font";
      let p_change = variant.paragraph ? variant.paragraph : "p";
      let p_class = variant.p_class ? variant.p_class : "yes-index";
      let family = variant.fonts ? variant.fonts : {
        default: "default",
        font1: "Times-New-Roman",
        font2: "Courier-New",
        font3: "Arial-serif"
      };
      var select = document.getElementById(variant.opt);
      var selected_value = select.value;
      if (urlParam.get(urlparam) !== selected_value) {
        urlParam.set(urlparam, selected_value);
        let paragraph = document.querySelectorAll(`${p_change}.${p_class}`);
        paragraph.forEach((el) => {
          for (let [key, value] of Object.entries(family)) {
            if (key !== "default") {
              el.classList.remove(value.toLowerCase());
            }
          }
          if (selected_value !== "default") {
            el.classList.add(selected_value.toLowerCase());
          }
        });
      }
      var stateName = variant.opt;
      var stateParam = urlParam.get(urlparam);
      var state = {
        [stateName]: stateParam
      };
      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: false,
        cit: citation_url,
        state,
        href
      });
    }
  }
  render() {
    let data = "font_family";
    let storage = sessionStorage.getItem(data);
    if (storage === null)
      return;
    let options = JSON.parse(storage);
    let opt = this.getAttribute("opt");
    if (typeof opt !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }
    var variant_check = options.variants.find((v) => v.opt === opt);
    var variant = variant_check ? variant_check : { opt: opt ? opt : "font-family" };
    var family = variant.fonts ? variant.fonts : {
      default: "default",
      font1: "Times-New-Roman",
      font2: "Courier-New",
      font3: "Arial-serif"
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
        var option = `<option value="default" selected='selected'>${family[s].replace("-", " ")}`;
      } else {
        var option = `<option value='${css_class}${family[s]}'>${family[s].replace("-", " ")}`;
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
};
var ImageSwitch = class extends HTMLElement {
  static get observedAttributes() {
    return ["opt"];
  }
  connectedCallback() {
    this.render();
    this.childNodes[3].addEventListener("click", this.viewerSwitch);
  }
  viewerSwitch() {
    let data = "image_switch";
    let id = this.getAttribute("id");
    if (typeof id !== "string")
      console.log("No 'opt' attribute in custom element font-family found!");
    let storage = sessionStorage.getItem(data);
    if (storage) {
      let options = JSON.parse(storage);
      if (!options)
        alert("Please turn on cookies to display content!");
      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);
      var variant_check = options.variants.find((v) => v.opt === id);
      var variant = variant_check ? variant_check : { opt: id ? id : "image" };
      var active = options.active_class ? options.active_class : "active";
      let hide_checked = variant.hide ? variant.hide : {
        hidden: true,
        class_to_hide: "hide-container1",
        class_to_show: "show-container1",
        class_parent: "hide-show-wrapper",
        resize: "resize-hide"
      };
      let hide = hide_checked.class_to_hide ? hide_checked.class_to_hide : "hide-container1";
      let show = hide_checked.class_to_show ? hide_checked.class_to_show : "show-container1";
      let resize = hide_checked.resize ? hide_checked.resize : "resize-hide";
      var urlparam = variant.urlparam ? variant.urlparam : "image";
      let fade = variant.fade ? variant.fade : "fade";
      let column_small_check = variant.column_small ? variant.column_small : {
        class: "col-md-6",
        percent: "50"
      };
      let column_full_checked = variant.column_full ? variant.column_full : {
        class: "col-md-12",
        percent: "100"
      };
      let column_small = [
        column_small_check.class ? column_small_check.class : "col-md-6",
        column_small_check.percent ? column_small_check.percent : "50"
      ];
      let column_full = [
        column_full_checked.class ? column_full_checked.class : "col-md-12",
        column_full_checked.percent ? column_full_checked.percent : "100"
      ];
      if (urlParam.get(urlparam) == "on") {
        urlParam.set(urlparam, "off");
        document.querySelectorAll(`.${hide}`).forEach((el) => {
          el.classList.add(fade);
          el.classList.remove(column_small[0]);
          el.classList.remove(active);
        });
        document.querySelectorAll(`.${show}`).forEach((el) => {
          el.classList.remove(column_small[0]);
          el.classList.add(column_full[0]);
          el.classList.remove(active);
        });
        document.querySelectorAll(`.${resize}`).forEach((el) => {
          el.classList.add(fade);
        });
        this.classList.remove(active);
      } else {
        urlParam.set(urlparam, "on");
        document.querySelectorAll(`.${hide}`).forEach((el) => {
          el.classList.remove(fade);
          el.classList.add(column_small[0]);
          el.classList.add(active);
        });
        document.querySelectorAll(`.${show}`).forEach((el) => {
          el.classList.add(column_small[0]);
          el.classList.remove(column_full[0]);
          el.classList.add(active);
        });
        document.querySelectorAll(`.${resize}`).forEach((el) => {
          el.classList.remove(fade);
        });
        var osd_test = document.getElementsByClassName(
          "openseadragon-container"
        )[0];
        if (!osd_test) {
          var image_loader = document.querySelectorAll("image-loader");
          var image_loader_type = image_loader[0].getAttribute("data-type");
          var image_loader_pos = image_loader[0].getAttribute("pos");
          var image = document.getElementById(
            `${image_loader_type}_img_${image_loader_pos}`
          );
          var _osd_container_id = `${image_loader_type}_container_${image_loader_pos}`;
          var osd_container = document.getElementById(_osd_container_id);
          var osd_container_2 = document.getElementById(
            `${image_loader_type}_container2_${image_loader_pos}`
          );
          var text_container_height_get = document.getElementById(
            `text-resize-${image_loader_pos}`
          );
          var text_container_height = text_container_height_get ? text_container_height_get.offsetHeight : 0;
          var image_container_width_get = document.getElementById(
            `img-resize-${image_loader_pos}`
          );
          var image_container_width = image_container_width_get ? image_container_width_get.offsetWidth : 0;
          if (osd_container)
            osd_container.style.height = `${text_container_height / 1.2}px`, osd_container.style.width = `${image_container_width}px`;
          let image_src = image ? image.getAttribute("data-src") : "no-image-url-found-in-data-src";
          let image_url = { type: "image", url: image_src };
          let viewer = OpenSeadragon({
            id: _osd_container_id,
            prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.0.0/images/",
            tileSources: image_url,
            // Initial rotation angle
            // degrees: 90,
            // Show rotation buttons
            showRotationControl: true,
            // Enable touch rotation on tactile devices
            gestureSettingsTouch: {
              pinchRotate: true
            }
          });
          if (osd_container_2)
            osd_container_2.remove();
          viewer.addHandler("open", function() {
            let tiledImage = viewer.world.getItemAt(0);
            if (tiledImage.getFullyLoaded()) {
              hideLoading(_osd_container_id);
            } else {
              tiledImage.addOnceHandler("fully-loaded-change", function() {
                let spinnerID2 = "spinner_" + _osd_container_id;
                let tmp = document.getElementById(spinnerID2);
                if (tmp)
                  tmp.remove();
              });
            }
          });
        }
        this.classList.add(active);
      }
      var stateName = variant.opt;
      var stateParam = urlParam.get(variant.opt);
      var state = {
        [stateName]: stateParam
      };
      let citation_url_str = variant.chg_citation ? variant.chg_citation : "citation-url";
      let citation_url = document.getElementById(citation_url_str);
      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: false,
        cit: citation_url,
        state,
        href
      });
    }
  }
  render() {
    let data = "image_switch";
    let storage = sessionStorage.getItem(data);
    if (storage === null)
      return;
    let options = JSON.parse(storage);
    let opt = this.getAttribute("opt");
    if (typeof opt !== "string")
      console.log("No 'opt' attribute in custom element font-family found!");
    var variant_check = options.variants.find((v) => v.opt === opt);
    var variant = variant_check ? variant_check : { opt: opt ? opt : "image" };
    let rendered_element = options.rendered_element ? options.rendered_element : {
      a_class: "nav-link btn btn-round",
      svg: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-image' viewBox='0 0 16 16'><path d='M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'/><path d='M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z'/></svg>"
    };
    let active = options.active_class ? options.active_class : "active";
    let var_title = variant.title ? variant.title : "Facsimile on/off";
    this.innerHTML = `
            <small><label style="padding:.2em;">${var_title}:</label></small>
            <a title="${var_title}"
                class="${rendered_element.a_class} ${active}"
                id="${variant.opt}"
                data-target="${data}">
                ${rendered_element.svg}
            </a>
        `;
  }
  attributeChangedCallback() {
    this.render();
  }
  disconnectedCallback() {
    this.childNodes[3].removeEventListener("click", this.viewerSwitch);
  }
};

// src/components/image_loader/main.ts
var ImageLoader = class extends HTMLElement {
  static get observedAttributes() {
    return ["opt", "data-type", "data-source", "pos"];
  }
  connectedCallback() {
    this.render();
  }
  render() {
    let data = "image_loader";
    let storage = sessionStorage.getItem(data);
    if (storage === null)
      return;
    let options = JSON.parse(storage);
    let url = paramCheck(options.url, "provide-url");
    let url_param = paramCheck(
      options.url_param,
      "provide-url-params (optional)"
    );
    let pos = this.getAttribute("pos");
    if (typeof pos !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }
    let data_type = this.getAttribute("data-type");
    if (typeof data_type !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }
    let dataSource = this.getAttribute("data-source");
    if (typeof dataSource !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }
    this.innerHTML = `
            <span id="${data_type}_img_${pos}" data-src="${url}${dataSource}${url_param}">Enable JavaScript to load image!</span>
        `;
  }
};
var config = [];
var EditionPagination = class extends HTMLElement {
  static get observedAttributes() {
    return ["opt", "pos", "facs", "data-type"];
  }
  connectedCallback() {
    this.render();
    this.childNodes[1].addEventListener("click", this.updateImgPage);
  }
  updateImgPage() {
    let data = "ed_pagination";
    let storage = sessionStorage.getItem(data);
    if (storage) {
      let options = JSON.parse(storage);
      let url = new URL(window.location.href);
      let urlParam = new URLSearchParams(url.search);
      var get_href = this.getAttribute("href");
      var href = get_href ? get_href : "provide-href";
      if (typeof href !== "string") {
        console.log("No 'href' attribute in custom element pagination found!");
      }
      var dataTab = this.getAttribute("data-tab");
      if (typeof href !== "string") {
        console.log(
          "No 'data-tab' attribute in custom element pagination found!"
        );
      }
      let urlparam = options.urlparam ? options.urlparam : "page";
      urlParam.set(urlparam, href.replace(/[^0-9]+/, ""));
      var state = {
        [urlparam]: href.replace(/[^0-9]+/, "")
      };
      let citation_url_str = options.chg_citation ? options.chg_citation : "citation-url";
      let citation_url = document.getElementById(citation_url_str);
      let hrefState = `?${urlParam}${location.hash}`;
      uptState({
        hist: false,
        cit: citation_url,
        state,
        href: hrefState
      });
      let pag_link = options.pag_link ? options.pag_link : ".pagination-link";
      let link = document.querySelectorAll(`${pag_link}`);
      let active = options.active_class ? options.active_class : "active";
      let bootstrap_class = options.bootstrap_class ? options.bootstrap_class : "show";
      let pag_tab = options.pag_tab ? options.pag_link : ".pagination-tab.tab-pane";
      link.forEach((el) => {
        el.classList.remove(active);
        el.classList.remove(bootstrap_class);
      });
      var ref = document.querySelectorAll(`${pag_link}[href="${href}"]`);
      ref.forEach((el) => {
        el.classList.add(active);
      });
      var tab = document.querySelectorAll(`${pag_tab}[data-tab="${dataTab}"]`);
      tab.forEach((el) => {
        el.classList.remove(active);
      });
      var tab_ref = document.querySelectorAll(`${pag_tab}${href}`);
      tab_ref.forEach((el) => {
        el.classList.add(active);
        el.classList.add(bootstrap_class);
      });
      let id = this.getAttribute("id");
      var variant_check = config.find((v) => v.opt === id);
      var variant = variant_check ? variant_check : { opt: id ? id : "page" };
      let opt_url = options.url ? options.url : "provide-url";
      let opt_urlparam = options.url_param ? options.url_param : "pg";
      let opt_osd_target = options.osd_target ? options.osd_target : "container";
      let opt_img_source = options.img_source ? options.img_source : "container2";
      let opt_image_size = options.img_size ? options.img_size : "500px";
      let dataSource = `${opt_url}${variant.dataSource}${opt_urlparam}`;
      let targetID0 = `${variant.dataType}_${opt_osd_target}_${variant.pos}`;
      let targetID1 = `${variant.dataType}_${opt_img_source}_${variant.pos}`;
      var tmp = document.getElementById(targetID1);
      if (tmp)
        tmp.remove();
      let target = document.getElementById(targetID0);
      if (target.childNodes.length === 0) {
        let hideLoading3 = function() {
          let spinnerID = "spinner_" + targetID0;
          let tmp2 = document.getElementById(spinnerID);
          if (tmp2)
            tmp2.remove();
        };
        target.style.height = opt_image_size;
        let imageURL = { type: "image", url: dataSource };
        let viewer = OpenSeadragon({
          id: targetID0,
          prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/3.1.0/images/",
          tileSources: imageURL,
          // Initial rotation angle
          // degrees: 90,
          // Show rotation buttons
          showRotationControl: true,
          // Enable touch rotation on tactile devices
          gestureSettingsTouch: {
            pinchRotate: true
          }
        });
        viewer.addHandler("open", function() {
          let tiledImage = viewer.world.getItemAt(0);
          tiledImage.getFullyLoaded() ? hideLoading3() : tiledImage.addOnceHandler("fully-loaded-change", hideLoading3);
        });
      }
    }
  }
  render() {
    let data_type = this.getAttribute("data-type");
    let pos = this.getAttribute("pos");
    if (typeof pos !== "string") {
      console.log("No 'pos' attribute in custom element pagination found!");
    }
    let facs = this.getAttribute("facs");
    if (typeof facs !== "string") {
      console.log("No 'facs' attribute in custom element pagination found!");
    }
    config.push({
      opt: `${data_type}_link_${pos}`,
      dataType: data_type ? data_type : "paginate",
      dataSource: facs ? facs : "facs",
      pos: pos ? pos : "1"
    });
    this.innerHTML = `
            <a title="Tab ${pos}"
                class="nav-link pagination-link active"
                data-bs-toggle="tab"
                data-tab="paginate"
                id="${data_type}_link_${pos}"
                href="#paginate-${pos}"
                style="border-radius:30px;">
                ${pos}
            </a>
        `;
  }
};

// src/components/image_loader/resize.ts
var config2 = [];
var WindowResize = class extends HTMLElement {
  static get observedAttributes() {
    return ["opt", "pos"];
  }
  connectedCallback() {
    this.render();
    this.childNodes[1].childNodes[1].addEventListener("mousedown", this.resize);
  }
  resize() {
    var isResizing = true;
    let id = this.getAttribute("id");
    let variant_check = config2.find((v) => `${v.opt}-${v.pos}` === id);
    let variant = variant_check ? variant_check : { opt: id ? id : "resize", pos: "1", size: "0.5" };
    let container = document.getElementById(
      `container-resize-${variant.pos}`
    );
    let left_container = document.getElementById(
      `text-resize-${variant.pos}`
    );
    let right_container = document.getElementById(
      `img-resize-${variant.pos}`
    );
    let handle = document.getElementById(
      `${variant.opt}-${variant.pos}`
    );
    let viewer_wrapper = document.getElementById(
      `viewer-${variant.pos}`
    );
    let viewer = viewer_wrapper.childNodes[0];
    let text = left_container.childNodes[0];
    viewer_wrapper.style.width = "";
    viewer_wrapper.style.height = "";
    document.addEventListener("mousemove", (e) => {
      if (!isResizing)
        return;
      let value = handle.value;
      let offsetLeft = container.offsetWidth - e.clientX;
      let offsetRight = container.offsetWidth - parseInt(value);
      let w = window.innerWidth;
      if (parseInt(value) < w * parseFloat(variant.size) - 10) {
        left_container.style.maxWidth = `${container.offsetWidth - offsetLeft}px`;
        right_container.style.maxWidth = `${offsetLeft}px`;
        viewer.style.width = `${offsetLeft}px`;
        viewer.style.height = `${offsetLeft}px`;
      } else if (parseInt(value) > w * parseFloat(variant.size) + 10) {
        left_container.style.maxWidth = `${value}px`;
        text.style.width = `${value}px`;
        right_container.style.maxWidth = `${offsetRight}px`;
        viewer.style.width = `${offsetRight}px`;
        viewer.style.height = `${offsetRight}px`;
      } else if (parseInt(value) === w * parseFloat(variant.size) + 9 || parseInt(value) === w * parseFloat(variant.size) - 9) {
        left_container.style.maxWidth = `${parseFloat(variant.size) * 100}%`;
        text.style.width = `${parseFloat(variant.size) * 100}%`;
        right_container.style.maxWidth = `${(1 - parseFloat(variant.size)) * 100}%`;
        viewer.style.width = `${right_container.offsetWidth}px`;
        viewer.style.height = `${right_container.offsetHeight}px`;
      }
    });
    document.addEventListener("mouseup", function() {
      isResizing = false;
    });
  }
  render() {
    let w = window.innerWidth;
    let opt = this.getAttribute("opt");
    if (typeof opt !== "string") {
      console.log("No 'opt' attribute in custom element window-resize found!");
    }
    let pos = this.getAttribute("pos");
    if (typeof pos !== "string") {
      console.log("No 'pos' attribute in custom element window-resize found!");
    }
    let size_check = this.getAttribute("size");
    let size = size_check ? size_check : "0.5";
    config2.push({
      opt: opt ? opt : "resize",
      pos: pos ? pos : "1",
      size: size ? size : "0.5"
    });
    this.innerHTML = `
            <div class="expand-wrapper text-center resize-hide">
                <input title="change size" id="${opt}-${pos}" type="range" min="0" max="${w}" value="${w * parseFloat(size)}" class="slider"/>
            </div>
        `;
  }
};
var UrlSearchParamUpdate = class {
  fullScreen() {
    let el = document.getElementsByTagName(
      "full-size"
    );
    let opt_check = el[0].getAttribute("opt");
    let opt = opt_check ? opt_check : "fullscreen";
    if (typeof opt !== "string")
      console.log("No 'opt' attribute in custom element font-size found!");
    let data = "fullsize";
    let storage = sessionStorage.getItem(data);
    if (storage === null)
      return;
    var options = JSON.parse(storage);
    if (!options) {
      alert("Please turn on cookies to display content!");
    }
    let url = new URL(location.href);
    let urlParam = new URLSearchParams(url.search);
    var variant_check = options.variants.find((v) => v.opt === opt);
    var variant = variant_check ? variant_check : {
      opt: opt ? opt : "fullscreen"
    };
    var urlparam = variant.urlparam ? variant.urlparam : "fullscreen";
    var active = options.active_class ? options.active_class : "active";
    var hide = variant.hide ? variant.hide : "hide-container";
    var hidden = variant.to_hide ? variant.to_hide : "fade";
    if (urlParam.get(urlparam) == null)
      urlParam.set(urlparam, "off");
    if (urlParam.get(urlparam) !== "on" || urlParam.get(urlparam) !== "off")
      console.log(
        `fullscreen=${urlParam.get(urlparam)} is not a selectable option.`
      ), urlParam.set(urlparam, "off");
    if (urlParam.get(urlparam) == "off") {
      let hide_class = document.querySelectorAll(
        `.${hide}`
      );
      [...hide_class].forEach((el2) => {
        el2.classList.remove(hidden);
        let svg_show = `<svg xmlns="http://www.w3.org/2000/svg"
                               width="16"
                               height="16"
                               fill="currentColor"
                               class="bi bi-fullscreen"
                               viewBox="0 0 16 16">
                            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                          </svg>`;
        let btn = document.getElementById(opt);
        btn.innerHTML = svg_show;
        btn.classList.remove(active);
        urlParam.delete(urlparam);
      });
    }
    if (urlParam.get(urlparam) == "on") {
      let hide_class = document.querySelectorAll(
        `.${hide}`
      );
      [...hide_class].forEach((el2) => {
        el2.classList.add(hidden);
        let svg_hide = `<svg xmlns="http://www.w3.org/2000/svg"
                               width="16"
                               height="16"
                               fill="currentColor"
                               class="bi bi-fullscreen-exit"
                               viewBox="0 0 16 16">
                            <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
                          </svg>`;
        let btn = document.getElementById(opt);
        btn.innerHTML = svg_hide;
        btn.classList.add(active);
      });
    }
    var citation_url_str = variant.chg_citation ? variant.chg_citation : "citation-url";
    var citation_url = document.getElementById(citation_url_str);
    let href = `?${urlParam}${location.hash}`;
    uptState({
      hist: true,
      cit: citation_url,
      state: false,
      href
    });
  }
  fontSize() {
    let el = document.getElementsByTagName(
      "font-size"
    );
    var id = el[0].getAttribute("opt");
    if (typeof id !== "string") {
      console.log("No 'opt' attribute in custom element font-size found!");
    }
    let data = "fontsize";
    let storage = sessionStorage.getItem(data);
    if (storage) {
      var options = JSON.parse(storage);
      if (!options) {
        alert("Please turn on cookies to display content!");
      }
      let url = new URL(location.href);
      let urlParam = new URLSearchParams(url.search);
      var variants = options.variants ? options.variants : [{ opt: id ? id : "font-size" }];
      [...variants].forEach((v) => {
        var urlparam = v.urlparam ? v.urlparam : "fontsize";
        var citation_url_str = v.chg_citation ? v.chg_citation : "citation-url";
        var citation_url = document.getElementById(
          citation_url_str
        );
        let p_change = v.paragraph ? v.paragraph : "p";
        let p_class = v.p_class ? v.p_class : "yes-index";
        let size = v.sizes ? v.sizes : {
          default: "default",
          font_size_14: "14",
          font_size_18: "18",
          font_size_22: "22",
          font_size_26: "26"
        };
        var css_class = v.css_class ? v.css_class : "font-size-";
        if (urlParam.get(urlparam) == null) {
          urlParam.set(urlparam, "default");
        }
        var url_value = urlParam.get(urlparam);
        if (!Object.values(size).includes(url_value ? url_value : "default")) {
          console.log(
            `${urlparam}=${urlParam.get(urlparam)} is not a selectable option.`
          );
          urlParam.set(urlparam, "default");
        } else {
          let paragraph = document.querySelectorAll(
            `${p_change}.${p_class}`
          );
          var new_value = urlParam.get(urlparam) !== "default" ? css_class + urlParam.get(urlparam) : urlParam.get(urlparam);
          var select = document.getElementById(v.opt);
          select ? select.value = new_value ? new_value : "" : console.log("No select found!");
          [...paragraph].forEach((el2) => {
            for (let s in size) {
              if (size[s] !== "default") {
                el2.classList.remove(css_class + size[s]);
              }
            }
            if (new_value !== "default") {
              el2.classList.add(new_value ? new_value : "");
            }
          });
        }
        if (urlParam.get(urlparam) == "default") {
          urlParam.delete(urlparam);
        }
        let href = `?${urlParam}${location.hash}`;
        uptState({
          hist: true,
          cit: citation_url,
          state: false,
          href
        });
      });
    }
  }
  fontFamily() {
    let el = document.getElementsByTagName("font-family");
    let id = el[0].getAttribute("opt");
    if (typeof id !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }
    let data = "font_family";
    let storage = sessionStorage.getItem(data);
    if (storage === null)
      return;
    let options = JSON.parse(storage);
    if (!options) {
      alert("Please turn on cookies to display content!");
    }
    let url = new URL(location.href);
    let urlParam = new URLSearchParams(url.search);
    var variants = options.variants ? options.variants : [{ opt: id ? id : "font-family" }];
    [...variants].forEach((v) => {
      var urlparam = v.urlparam ? v.urlparam : "font";
      var citation_url_str = v.chg_citation ? v.chg_citation : "citation-url";
      var citation_url = document.getElementById(
        citation_url_str
      );
      let p_change = v.paragraph ? v.paragraph : "p";
      let p_class = v.p_class ? v.p_class : "yes-index";
      let family = v.fonts ? v.fonts : {
        default: "default",
        font1: "Times-New-Roman",
        font2: "Courier-New",
        font3: "Arial-serif"
      };
      if (urlParam.get(urlparam) == null) {
        urlParam.set(urlparam, "default");
      }
      let url_value = urlParam.get(urlparam);
      if (!Object.values(family).includes(url_value ? url_value : "default")) {
        console.log(
          `font=${urlParam.get(urlparam)} is not a selectable option.`
        );
        urlParam.set(urlparam, "default");
      } else {
        let paragraph = document.querySelectorAll(
          `${p_change}.${p_class}`
        );
        if (urlParam.get(urlparam) !== "default") {
          var new_value = urlParam.get(urlparam);
        } else {
          var new_value = urlParam.get(urlparam);
        }
        var select = document.getElementById(v.opt);
        select ? select.value = new_value ? new_value : "" : console.log("No select found!");
        [...paragraph].forEach((el2) => {
          for (let f in family) {
            if (family[f] !== "default") {
              el2.classList.remove(family[f].toLowerCase());
            }
          }
          if (new_value !== "default") {
            el2.classList.add(new_value ? new_value.toLowerCase() : "");
          }
        });
      }
      if (urlParam.get(urlparam) == "default") {
        urlParam.delete(urlparam);
      }
      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: true,
        cit: citation_url,
        state: false,
        href
      });
    });
  }
  viewerSwitch() {
    let el = document.querySelectorAll("image-switch");
    let opt_check = el[0].getAttribute("opt");
    let opt = opt_check ? opt_check : "image-switch";
    if (typeof opt !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }
    let data = "image_switch";
    let storage = sessionStorage.getItem(data);
    if (storage === null)
      return;
    let options = JSON.parse(storage);
    if (!options) {
      alert("Please turn on cookies to display content!");
    }
    let url = new URL(location.href);
    let urlParam = new URLSearchParams(url.search);
    var variant_check = options.variants.find((v) => v.opt === opt);
    var variant = variant_check ? variant_check : {
      opt: opt ? opt : "image-switch"
    };
    var active = options.active_class ? options.active_class : "active";
    let hide_checked = variant.hide ? variant.hide : {
      hidden: true,
      class_to_hide: "hide-container1",
      class_to_show: "show-container1",
      class_parent: "hide-show-wrapper",
      resize: "resize-hide"
    };
    let hide = hide_checked.class_to_hide ? hide_checked.class_to_hide : "hide-container1";
    let show = hide_checked.class_to_show ? hide_checked.class_to_show : "show-container1";
    let resize = hide_checked.resize ? hide_checked.resize : "resize-hide";
    var urlparam = variant.urlparam ? variant.urlparam : "image";
    let fade = variant.fade ? variant.fade : "fade";
    let column_small_check = variant.column_small ? variant.column_small : {
      class: "col-md-6",
      percent: "50%"
    };
    let column_full_checked = variant.column_full ? variant.column_full : {
      class: "col-md-12",
      percent: "100%"
    };
    let column_small = [
      column_small_check.class ? column_small_check.class : "col-md-6",
      column_small_check.percent ? column_small_check.percent : "50%"
    ];
    let column_full = [
      column_full_checked.class ? column_full_checked.class : "col-md-12",
      column_full_checked.percent ? column_full_checked.percent : "100%"
    ];
    if (urlParam.get(urlparam) == null) {
      urlParam.set(urlparam, "off");
    }
    let url_value = urlParam.get(urlparam);
    if (!["on", "off"].includes(url_value ? url_value : "off")) {
      console.log(
        `image=${urlParam.get(urlparam)} is not a selectable option.`
      );
      urlParam.delete(urlparam);
    }
    if (urlParam.get(urlparam) == "on") {
      let hide_elements = document.querySelectorAll(
        `.${hide}`
      );
      [...hide_elements].forEach((el2) => {
        el2.classList.remove(fade);
        el2.classList.add(column_small[0]);
        el2.style.maxWidth = column_small[1];
        el2.classList.add(active);
      });
      let show_elements = document.querySelectorAll(
        `.${show}`
      );
      [...show_elements].forEach((el2) => {
        el2.classList.add(column_small[0]);
        el2.classList.remove(column_full[0]);
        el2.style.maxWidth = column_small[1];
        el2.classList.add(active);
      });
      let resize_elements = document.querySelectorAll(
        `.${resize}`
      );
      [...resize_elements].forEach((el2) => {
        el2.classList.remove(fade);
      });
      let checkbox = document.getElementById(opt);
      checkbox.classList.add(active);
    }
    if (urlParam.get(urlparam) == "off") {
      let hide_elements = document.querySelectorAll(
        `.${hide}`
      );
      [...hide_elements].forEach((el2) => {
        el2.classList.add(fade);
        el2.classList.remove(column_small[0]);
        el2.style.maxWidth = column_full[1];
        el2.classList.remove(active);
      });
      let show_elements = document.querySelectorAll(
        `.${show}`
      );
      [...show_elements].forEach((el2) => {
        el2.classList.remove(column_small[0]);
        el2.classList.add(column_full[0]);
        el2.style.maxWidth = column_full[1];
        el2.classList.remove(active);
      });
      let resize_elements = document.querySelectorAll(
        `.${resize}`
      );
      [...resize_elements].forEach((el2) => {
        el2.classList.add(fade);
      });
      let checkbox = document.getElementById(opt);
      checkbox.classList.remove(active);
      urlParam.delete(urlparam);
    }
    let citation_url_str = variant.chg_citation ? variant.chg_citation : "citation-url";
    let citation_url = document.getElementById(citation_url_str);
    let href = `?${urlParam}${location.hash}`;
    uptState({
      hist: true,
      cit: citation_url,
      state: false,
      href
    });
  }
  textFeatures() {
    let data = "annotation_slider";
    let storage = sessionStorage.getItem(data);
    if (storage === null)
      return;
    let options = JSON.parse(storage);
    if (!options) {
      alert(`WARNING 1 - search_params/main: Please turn on cookies to display content.

              Or check if configuration files path match data-target and data-path property.`);
    }
    let url = new URL(location.href);
    let urlParam = new URLSearchParams(url.search);
    var variant_all_check = options.variants.filter(
      (v) => v.features.all === true
    );
    let variantAll = variant_all_check ? variant_all_check : [
      {
        opt: "text-features",
        features: {
          all: true,
          class: "all-features"
        }
      }
    ];
    var variant_check = options.variants.filter(
      (v) => v.features.all === false
    );
    let allVariants = document.querySelectorAll("annotation-slider");
    var allVariantsObjs = [];
    [...allVariants].forEach((el) => {
      var attrOpt_check = el.getAttribute("opt");
      var attrOpt = attrOpt_check ? attrOpt_check : "text-features";
      if (attrOpt.length > 0) {
        allVariantsObjs.push({
          opt: attrOpt,
          features: {
            all: false,
            class: "single-feature"
          }
        });
      }
    });
    let variants = variant_check ? variant_check : allVariantsObjs;
    var variant_check_bool = options.variants.filter(
      (v) => typeof v.features.all !== "boolean"
    );
    let wrg_ft = variant_check_bool ? variant_check_bool : [];
    if (wrg_ft) {
      for (let w of wrg_ft) {
        console.log(
          `WARNING 6 - search_params/main: Type of variant ${w} config.

            "features.all" must be boolean (true or false)`
        );
      }
    }
    let style = options.span_element ? options.span_element : {
      css_class: "badge-item"
    };
    let active = options.active_class ? options.active_class : "active";
    let count_active = {};
    let count = 0;
    [...variants].forEach((v, idx) => {
      let opt = v.opt ? v.opt : `any-feature-${idx}`;
      let opt_class = v.features.class ? v.features.class : `class-${opt}`;
      let color = v.color ? v.color : `color-${opt}`;
      let html_class = v.html_class ? v.html_class : `html-class-${opt}`;
      let css_class = v.css_class ? v.css_class : `css-class-${opt}`;
      let opt_slider = v.opt_slider ? v.opt_slider : `${opt}-slider`;
      let hide = v.hide ? v.hide : { hidden: true, class: "hide" };
      let url_value = urlParam.get(opt);
      if (url_value === null) {
        if (v.default === true) {
          if (count_active.hasOwnProperty(opt_class)) {
            count_active[opt_class] += 1;
          } else {
            count_active[opt_class] = 1;
          }
          let selected = addMarkup(html_class, css_class, color, hide, style);
          try {
            let slider = document.getElementById(opt_slider);
            slider.setAttribute("data", selected);
            count += parseInt(selected);
            slider.classList.add("slider-number");
            slider.classList.add(color);
            urlParam.set(opt, "on");
          } catch (err) {
            console.log(`slider class ${opt_slider} not found!`);
          }
          let checkbox = document.getElementById(opt);
          if (checkbox.checked === false) {
            checkbox.checked = true;
            checkbox.classList.add(active);
          }
        } else {
          removeMarkup(html_class, css_class, color, hide, style);
          try {
            let slider = document.getElementById(opt_slider);
            slider.classList.remove(color);
            slider.removeAttribute("data");
            slider.classList.remove("slider-number");
          } catch (err) {
            console.log(
              `WARNING 7 - search_params/main: slider class ${opt_slider} not found!`
            );
          }
          let checkbox = document.getElementById(opt);
          if (checkbox.checked === true) {
            checkbox.checked = false;
            checkbox.classList.remove(active);
          }
        }
      } else if (!["on", "off"].includes(url_value)) {
        console.log(`${opt}=${urlParam.get(opt)} is not a selectable option.`);
        urlParam.delete(opt);
        removeMarkup(html_class, css_class, color, hide, style);
        try {
          let slider = document.getElementById(opt_slider);
          slider.classList.remove(color);
          slider.removeAttribute("data");
          slider.classList.remove("slider-number");
        } catch (err) {
          console.log(
            `WARNING 8 - search_params/main: slider class ${opt_slider} not found!`
          );
        }
        let checkbox = document.getElementById(opt);
        if (checkbox.checked === true) {
          checkbox.checked = false;
          checkbox.classList.remove(active);
        }
      } else if (urlParam.get(opt) === "on") {
        count_active.hasOwnProperty(opt_class) ? count_active[opt_class] += 1 : count_active[opt_class] = 1;
        let selected = addMarkup(html_class, css_class, color, hide, style);
        try {
          let slider = document.getElementById(opt_slider);
          slider.setAttribute("data", selected);
          count += parseInt(selected);
          slider.classList.add("slider-number");
          slider.classList.add(color);
        } catch (err) {
          console.log(
            `WARNING 9 - search_params/main: slider class ${opt_slider} not found!`
          );
        }
        let checkbox = document.getElementById(opt);
        if (checkbox.checked === false)
          checkbox.checked = true, checkbox.classList.add(active);
      } else if (urlParam.get(opt) === "off") {
        removeMarkup(html_class, css_class, color, hide, style);
        try {
          let slider = document.getElementById(opt_slider);
          slider.classList.remove(color);
          slider.removeAttribute("data");
          slider.classList.remove("slider-number");
        } catch (err) {
          console.log(
            `WARNING 10 - search_params/main: slider class ${opt_slider} not found!`
          );
        }
        let checkbox = document.getElementById(opt);
        if (checkbox.checked === true) {
          checkbox.checked = false;
          checkbox.classList.remove(active);
        }
        urlParam.delete(opt);
      }
      let citation_url_str = v.chg_citation ? v.chg_citation : "citation-url";
      var citation_url = document.getElementById(citation_url_str);
      let href = `?${urlParam}${location.hash}`;
      uptState({
        hist: true,
        cit: citation_url ? citation_url : false,
        state: false,
        href
      });
    });
    [...variantAll].forEach((el) => {
      let optAll = el.opt ? el.opt : `all-features`;
      var feat_leader = document.getElementById(optAll);
      var feat_leader_class = el.features.class;
      var variants_features_class = variants.filter(
        (v) => v.features.class === feat_leader_class
      );
      if (count_active[feat_leader_class] === variants_features_class.length) {
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
  pageUrl() {
    let data = "image_loader";
    let storage = sessionStorage.getItem(data);
    if (storage === null)
      return;
    let options = JSON.parse(storage);
    let url = new URL(location.href);
    let urlParam = new URLSearchParams(url.search);
    var urlparam = options.urlparam ? options.urlparam : "page";
    var current_check = urlParam.get(urlparam);
    var _current = current_check ? current_check : "1";
    if (_current == null) {
      let default_pagination_check = document.querySelector("edition-pagination");
      let default_pagination = default_pagination_check ? default_pagination_check.getAttribute("pos") : "1";
      urlParam.set(urlparam, default_pagination ? default_pagination : "1");
      let url_value = urlParam.get(urlparam);
      _current = url_value ? url_value : "1";
    }
    let pag_link = options.pag_link ? options.pag_link : ".pagination-link";
    let active = options.active_class ? options.active_class : "active";
    let inactive = options.inactive_class ? options.inactive_class : "fade";
    let bootstrap_class = options.bootstrap_class ? options.bootstrap_class : "show";
    let pag_tab = options.pag_tab ? options.pag_tab : ".pagination-tab.tab-pane";
    let tabs = document.querySelectorAll(
      `${pag_tab}[data-tab="paginate"]`
    );
    [...tabs].forEach(function(el) {
      el.classList.remove(active);
      el.classList.add(inactive);
    });
    let link = document.querySelectorAll(
      `${pag_link}`
    );
    let pgOpt = [];
    [...link].forEach(function(el) {
      el.classList.remove(active);
      el.classList.remove(bootstrap_class);
      let el_id = el.getAttribute("id");
      if (el_id) {
        let idn = el_id.split("_");
        let idNo = idn[idn.length - 1];
        pgOpt.push(idNo);
      }
    });
    if (!pgOpt.includes(_current)) {
      let default_pagination_check = document.querySelector("edition-pagination");
      let default_pagination = default_pagination_check ? default_pagination_check.getAttribute("pos") : "1";
      urlParam.set(urlparam, default_pagination ? default_pagination : "1");
      console.log(`${urlparam}=${_current} is not a selectable option.`);
      let url_value = urlParam.get(urlparam);
      _current = url_value ? url_value : "1";
    }
    let tab = document.getElementById(`paginate-${_current}`);
    tab.classList.remove(inactive);
    tab.classList.add(active);
    tab.classList.add(bootstrap_class);
    let linkActive = document.querySelectorAll(
      `${pag_link}[href="#paginate-${_current}"]`
    );
    [...linkActive].forEach(function(el) {
      el.classList.add(active);
      el.classList.add(bootstrap_class);
    });
    let type_checked = options.img_types ? options.img_types : ["type1", "type2"];
    let opt_osd_target = options.osd_target ? options.osd_target : "container";
    let opt_img_source = options.img_source ? options.img_source : "container2";
    let i = 0;
    let _image_type = "";
    while (i < type_checked.length) {
      if (document.getElementById(
        `${type_checked[i]}_${opt_osd_target}_${_current}`
      )) {
        _image_type = type_checked[i];
      }
      i++;
    }
    let _osd_container_id = `${_image_type}_${opt_osd_target}_${_current}`;
    let _osd_container_id2 = `${_image_type}_${opt_img_source}_${_current}`;
    let osd_container = document.getElementById(
      _osd_container_id
    );
    let osd_container_2 = document.getElementById(
      _osd_container_id2
    );
    let osd_container_2_img = document.getElementById(
      `img-resize-${_current}`
    );
    let test_container_height_check = document.getElementById(
      `text-resize-${_current}`
    );
    let test_container_height = test_container_height_check ? test_container_height_check.offsetHeight : 0;
    if (osd_container_2 && !osd_container_2_img.classList.contains("fade")) {
      osd_container.style.height = `${test_container_height}px`;
      let image = document.getElementById(
        `${_image_type}_img_${_current}`
      );
      let image_src = image.getAttribute("data-src");
      let image_url = { type: "image", url: image_src };
      let viewer = OpenSeadragon({
        id: _osd_container_id,
        prefixUrl: "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/4.0.0/images/",
        tileSources: image_url,
        // Initial rotation angle
        // degrees: 90,
        // Show rotation buttons
        showRotationControl: true,
        // Enable touch rotation on tactile devices
        gestureSettingsTouch: {
          pinchRotate: true
        }
      });
      osd_container_2.remove();
      viewer.addHandler("open", function() {
        let tiledImage = viewer.world.getItemAt(0);
        if (tiledImage.getFullyLoaded()) {
          hideLoading(_osd_container_id);
        } else {
          tiledImage.addOnceHandler("fully-loaded-change", function() {
            let spinnerID2 = "spinner_" + _osd_container_id;
            let tmp = document.getElementById(spinnerID2);
            if (tmp)
              tmp.remove();
          });
        }
      });
    }
    let citation_url_str = options.chg_citation ? options.chg_citation : "citation-url";
    let citation_url = document.getElementById(citation_url_str);
    let href = `?${urlParam}${location.hash}`;
    uptState({
      hist: true,
      cit: citation_url ? citation_url : false,
      state: false,
      href
    });
  }
  multiLanguage() {
    const data = "multi_language";
    const storage = sessionStorage.getItem(data);
    if (storage === null)
      return;
    const options = JSON.parse(storage);
    var url = new URL(document.location.href);
    var urlParam = new URLSearchParams(url.search);
    var active = options.active_class ? options.active_class : "lang_active";
    var userLang = [];
    for (let x of options.variants) {
      userLang.push(x.opt);
    }
    if (urlParam.get("lang") == null) {
      var lang = navigator.language;
      var langUpdate = userLang.includes(lang.split("-")[0]) ? lang.split("-")[0] : "en";
      urlParam.set("lang", langUpdate);
    } else if (!userLang.includes(urlParam.get("lang"))) {
      urlParam.set("lang", "en");
      var langUpdate = "en";
      console.log(`lang urlparameter does not fit webpage configuration.
                    set to default language.`);
    } else {
      let url_value = urlParam.get("lang");
      var langUpdate = url_value ? url_value : "en";
    }
    var variants_check = options.variants.filter((v) => v.opt !== langUpdate);
    var variants = variants_check ? variants_check : [
      {
        opt: langUpdate
      }
    ];
    var variant_check = options.variants.find((v) => v.opt === langUpdate);
    let variant = variant_check ? variant_check : {
      opt: langUpdate
    };
    if (!variant) {
      console.log(
        "No variant found! Please define a variant object that contains                   and 'opt' key holding a string value that matches the 'opt' value of custom                   element 'annotation#slider'."
      );
    }
    [...variants].forEach((el) => {
      let tmp = document.getElementById(`ml_${el.opt}`);
      if (tmp)
        tmp.classList.remove(active);
    });
    let current = document.getElementById(`ml_${variant.opt}`);
    current.classList.add(active);
    var map = variant.map ? variant.map : {
      "index.html": "index-en.html"
    };
    if (map) {
      let path = location.pathname.split("/");
      let newPath = path.length == 3 && path[2].length > 0 ? map[path[2]] : path.length == 2 && path[1].length > 0 ? map[path[1]] : map["index.html"];
      if (newPath) {
        var state = {
          lang: variant.opt
        };
        let href = `${newPath}?${urlParam}${location.hash}`;
        uptState({
          hist: true,
          state,
          href
        });
      }
    }
  }
};

// src/components/multi_language/main.ts
var MultiLanguage = class extends HTMLElement {
  static get observedAttributes() {
    return ["opt"];
  }
  connectedCallback() {
    this.render();
    this.childNodes[1].addEventListener("click", this.multiLanguage);
  }
  // function to triggers on click of the rendered element
  multiLanguage() {
    let data = "multi_language";
    let storage = sessionStorage.getItem(data);
    if (storage) {
      let options = JSON.parse(storage);
      let url = new URL(window.location.href);
      let urlParam = new URLSearchParams(url.search);
      let id = this.getAttribute("id");
      if (id)
        id.split("ml_")[1];
      if (!id)
        console.log(
          "ID of multi language custom child element not found.               Make sure the annotation-slider element holds the attribute 'opt' with               a defined string value."
        );
      var variant_check = options.variants.find((v) => v.opt === id);
      let variant = variant_check ? variant_check : { opt: id ? id : "en" };
      if (!variant)
        console.log(
          "No variant found! Please define a variant object that contains               and 'opt' key holding a string value that matches the 'opt' value of custom               element 'annotation#slider'."
        );
      var map = variant.map ? variant.map : { "index.html": "index-en.html" };
      urlParam.set("lang", variant.opt);
      if (map) {
        let path = location.pathname.split("/");
        let newPath = path.length == 3 && path[2].length > 0 ? map[path[2]] : path.length == 2 && path[1].length > 0 ? map[path[1]] : map["index.html"];
        if (newPath) {
          var state = {
            lang: variant.opt
          };
          let href = `${newPath}?${urlParam}${location.hash}`;
          uptState({
            hist: true,
            state,
            href
          });
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
    if (storage === null)
      return;
    let options = JSON.parse(storage);
    let opt = this.getAttribute("opt");
    if (typeof opt !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }
    var variant_check = options.variants.find((v) => v.opt === opt);
    var variant = variant_check ? variant_check : {
      opt: opt ? opt : "en"
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
};

// index.ts
var LoadEditor = class {
  constructor(options) {
    __publicField(this, "aot");
    __publicField(this, "fs");
    __publicField(this, "fos");
    __publicField(this, "ff");
    __publicField(this, "is");
    __publicField(this, "il");
    __publicField(this, "ep");
    __publicField(this, "wr");
    __publicField(this, "up");
    __publicField(this, "upc");
    __publicField(this, "lang");
    this.aot = options.aot ? options.aot : false;
    this.fs = options.fs ? options.fs : false;
    this.fos = options.fos ? options.fos : false;
    this.ff = options.ff ? options.ff : false;
    this.is = options.is ? options.is : false;
    this.il = options.il ? options.il : false;
    this.ep = options.ep ? options.ep : false;
    this.wr = options.wr ? options.wr : false;
    this.up = options.up ? options.up : false;
    this.upc = new UrlSearchParamUpdate();
    this.lang = options.lang ? options.lang : false;
    if (this.aot) {
      [...this.aot.variants].forEach((variant) => {
        if (variant.custom_function instanceof Function) {
          variant.custom_function = variant.custom_function.toString();
        }
      });
      try {
        new SetDataCookie("annotation_slider", this.aot).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.fs) {
      try {
        new SetDataCookie("fullsize", this.fs).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.fos) {
      try {
        new SetDataCookie("fontsize", this.fos).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.ff) {
      try {
        new SetDataCookie("font_family", this.ff).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.il) {
      try {
        new SetDataCookie("image_loader", this.il).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.is) {
      try {
        new SetDataCookie("image_switch", this.is).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.ep) {
      try {
        new SetDataCookie("ed_pagination", this.ep).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.lang) {
      try {
        new SetDataCookie("multi_language", this.lang).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.ep) {
      try {
        window.customElements.define("edition-pagination", EditionPagination);
      } catch (e) {
        console.log(e);
      }
    }
    if (this.aot) {
      try {
        window.customElements.define("annotation-slider", AnnotationSlider);
        if (this.up) {
          window.onload = this.upc.textFeatures;
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.fs) {
      try {
        window.customElements.define("full-size", FullSize);
        if (this.up) {
          window.onload = this.upc.fullScreen;
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.fos) {
      try {
        window.customElements.define("font-size", FontSize);
        if (this.up) {
          window.onload = this.upc.fontSize;
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.ff) {
      try {
        window.customElements.define("font-family", FontFamily);
        if (this.up) {
          window.onload = this.upc.fontFamily;
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.wr) {
      try {
        window.customElements.define("window-resize", WindowResize);
      } catch (e) {
        console.log(e);
      }
    }
    if (this.is) {
      try {
        window.customElements.define("image-switch", ImageSwitch);
        if (this.up) {
          window.onload = this.upc.viewerSwitch;
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.il) {
      try {
        window.customElements.define("image-loader", ImageLoader);
        if (this.up) {
          window.onload = this.upc.pageUrl;
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.lang) {
      try {
        window.customElements.define("multi-language", MultiLanguage);
        if (this.up) {
          window.onload = this.upc.multiLanguage;
        }
      } catch (e) {
        console.log(e);
      }
    }
    window.onpopstate = () => {
      if (this.aot && this.up) {
        try {
          this.upc.textFeatures();
        } catch (e) {
          console.log(e);
        }
      }
      if (this.fs && this.up) {
        try {
          this.upc.fullScreen();
        } catch (e) {
          console.log(e);
        }
      }
      if (this.fos && this.up) {
        try {
          this.upc.fontSize();
        } catch (e) {
          console.log(e);
        }
      }
      if (this.ff && this.up) {
        try {
          this.upc.fontFamily();
        } catch (e) {
          console.log(e);
        }
      }
      if (this.is && this.up) {
        try {
          this.upc.viewerSwitch();
        } catch (e) {
          console.log(e);
        }
      }
      if (this.il && this.up) {
        try {
          this.upc.pageUrl();
        } catch (e) {
          console.log(e);
        }
      }
      if (this.lang && this.up) {
        try {
          this.upc.multiLanguage();
        } catch (e) {
          console.log(e);
        }
      }
    };
    window.onload = () => {
      if (window.location.hash == "") {
        return false;
      } else {
        var el = document.querySelector(window.location.hash);
        if (el !== null) {
          el.scrollIntoView({ behavior: "smooth" });
          el.style.backgroundColor = "#FFFCA1";
          setTimeout(function() {
            el.style.backgroundColor = "transparent";
          }, 1e4);
        }
      }
    };
  }
};

export { LoadEditor };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map