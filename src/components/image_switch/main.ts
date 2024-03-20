const { uptState, paramCheck, hideLoading } = require("../../utils/utils");
const OpenSeadragon = require("openseadragon");

export class ImageSwitch extends HTMLElement {
  static get observedAttributes() {
    return ["opt"];
  }

  connectedCallback() {
    this.render();
    // console.log(this.childNodes[3]);
    this.childNodes[3].addEventListener("click", this.viewerSwitch);
  }

  viewerSwitch() {
    let data = "image_switch";

    let id = this.getAttribute("id");
    // check if user set opt attribute
    if (typeof id !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }

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
        var variant_check = options.variants.find((v) => v.opt === id);
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      var variant = paramCheck(variant_check, { opt: id });

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
        percent: "50",
      });

      // check if sizes object with font sizes is not null or undefined
      try {
        var large_check = variant.column_full;
      } catch (err) {
        console.log("Hide object not found. Creating default parameters.");
      }
      let column_full_checked = paramCheck(large_check, {
        class: "col-md-12",
        percent: "100",
      });

      // get classes and style for hide show container resizing
      let column_small = [
        paramCheck(column_small_check.class, "col-md-6"),
        paramCheck(column_small_check.percent, "50"),
      ];
      let column_full = [
        paramCheck(column_full_checked.class, "col-md-12"),
        paramCheck(column_full_checked.percent, "100"),
      ];

      if (urlParam.get(urlparam) == "on") {
        urlParam.set(urlparam, "off");
        document.querySelectorAll(`.${hide}`).forEach((el: HTMLElement) => {
          el.classList.add(fade);
          el.classList.remove(column_small[0]);
          el.style.maxWidth = `${column_full[1]}%`;
          el.classList.remove(active);
        });
        document.querySelectorAll(`.${show}`).forEach((el: HTMLElement) => {
          el.classList.remove(column_small[0]);
          el.classList.add(column_full[0]);
          el.style.maxWidth = `${column_full[1]}%`;
          el.classList.remove(active);
        });
        document.querySelectorAll(`.${resize}`).forEach((el: HTMLElement) => {
          el.classList.add(fade);
        });
        this.classList.remove(active);
      } else {
        urlParam.set(urlparam, "on");
        document.querySelectorAll(`.${hide}`).forEach((el: HTMLElement) => {
          el.classList.remove(fade);
          el.classList.add(column_small[0]);
          el.style.maxWidth = `${column_small[1]}%`;
          el.classList.add(active);
        });
        document.querySelectorAll(`.${show}`).forEach((el: HTMLElement) => {
          el.classList.add(column_small[0]);
          el.classList.remove(column_full[0]);
          el.style.maxWidth = `${
            parseInt(column_full[1]) - parseInt(column_small[1])
          }%`;
          el.classList.add(active);
        });
        document.querySelectorAll(`.${resize}`).forEach((el: HTMLElement) => {
          el.classList.remove(fade);
        });

        /* test if openseadragon is already loaded */
        var osd_test = document.getElementsByClassName(
          "openseadragon-container"
        )[0];

        if (!osd_test) {
          /* initialize OpenSeardragon and get container and image url */

          /* get image-loader custom element */
          var image_loader = document.querySelectorAll("image-loader");
          var image_loader_type = image_loader[0].getAttribute("data-type");
          var image_loader_pos = image_loader[0].getAttribute("pos");
          var image = document.getElementById(
            `${image_loader_type}_img_${image_loader_pos}`
          );

          /* get container to load osd in */
          var _osd_container_id = `${image_loader_type}_container_${image_loader_pos}`;
          var osd_container = document.getElementById(_osd_container_id);

          /* get container with image-viewer element to be removed afer osd was loaded */
          var osd_container_2 = document.getElementById(
            `${image_loader_type}_container2_${image_loader_pos}`
          );

          /* get text container to set proper container height for osd viewer */
          var text_container_height = document.getElementById(
            `text-resize-${image_loader_pos}`
          ).offsetHeight;

          /* get img container to set proper container width for osd viewer */
          var image_container_width = document.getElementById(
            `img-resize-${image_loader_pos}`
          ).offsetWidth;

          /* set osd container width and height */
          osd_container.style.height = `${text_container_height / 1.2}px`;
          osd_container.style.width = `${image_container_width}px`;

          /* get image url of iiif server */
          let image_src = image.getAttribute("data-src");
          let image_url = { type: "image", url: image_src };

          /* initialize OpenSeadragon viewer */
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
        } else {
          /* works only with one image viewer */
          // try {
          //   var viewer_loaded = document.querySelector(
          //     `.${parent}.${active} .${hide}`
          //   ) as HTMLElement;
          // } catch (err) {
          //   console.log(
          //     `HTML class elements .${parent}.${active} .${hide} not found. Please make sure your HTML site contains them.`
          //   );
          // }
          // try {
          //   var facs = viewer_loaded.querySelectorAll("*")[0] as HTMLElement;
          //   var facsContainer = facs.childNodes[0] as HTMLElement;
          //   // set style height and width
          //   // get iamge_size from params
          //   // let image_size = paramCheck(variant.image_size, "500px");
          //   facs.style.width = `${viewer_loaded.offsetWidth}px`;
          //   facs.style.height = `${viewer_loaded.offsetHeight}px`;
          //   facsContainer.style.width = `${viewer_loaded.offsetWidth - 25}px`;
          //   facsContainer.style.height = `${
          //     viewer_loaded.offsetHeight / 1.2
          //   }px`;
          // } catch (err) {
          //   console.log(
          //     `HTML class elements .${parent}.${active} .${hide} not found. Please make sure your HTML site contains them.`
          //   );
          // }
        }

        this.classList.add(active);
      }

      var stateName = variant.opt;
      var stateParam = urlParam.get(variant.opt);
      var state = {
        [stateName]: stateParam,
      };

      // get citation url class and update citation
      let citation_url_str = paramCheck(variant.chg_citation, "citation-url");
      let citation_url = document.getElementById(citation_url_str);

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
    let data = "image_switch";
    let storage = sessionStorage.getItem(data);

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

    let opt = this.getAttribute("opt");
    // check if user set opt attribute
    if (typeof opt !== "string") {
      console.log("No 'opt' attribute in custom element font-family found!");
    }

    // variant is found by comparing variant config opt with custom element attr opt
    try {
      var variant_check = options.variants.find((v) => v.opt === opt);
    } catch (err) {
      console.log(
        "No option parameters found. Creating default parameters to continue."
      );
    }
    var variant = paramCheck(variant_check, { opt: opt });

    // check if sizes object with font sizes is not null or undefined
    try {
      var render_check = options.rendered_element;
    } catch (err) {
      console.log("Sizes obj not found. Creating default parameters.");
    }
    let rendered_element = paramCheck(render_check, {
      a_class: "nav-link btn btn-round",
      svg: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-image' viewBox='0 0 16 16'><path d='M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z'/><path d='M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z'/></svg>",
    });

    let active = paramCheck(options.active_class, "active");
    let var_title = paramCheck(variant.title, "Facsimile on/off");

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
}
