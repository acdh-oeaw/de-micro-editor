import { uptState } from "../../utils/utils";
import type { PageUrlType } from "../../utils/types";
// @ts-ignore
import { OpenSeadragon } from "openseadragon";

type Config = {
  opt: string;
  dataType?: string;
  dataSource?: string;
  pos?: string;
};
const config: Array<Config> = [];

export class EditionPagination extends HTMLElement {
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
      let options: PageUrlType = JSON.parse(storage);

      // get urlparam
      let url = new URL(window.location.href);
      let urlParam = new URLSearchParams(url.search);

      // get selected href
      var href = this.getAttribute("href");
      // check if user set opt attribute
      if (typeof href !== "string") {
        console.log("No 'href' attribute in custom element pagination found!");
      }
      var dataTab = this.getAttribute("data-tab");
      // check if user set opt attribute
      if (typeof href !== "string") {
        console.log(
          "No 'data-tab' attribute in custom element pagination found!"
        );
      }

      // update urlparam
      let urlparam = options.urlparam ? options.urlparam : "page";
      urlParam.set(urlparam, href.replace(/[^0-9]+/, ""));
      var state = {
        [urlparam]: href.replace(/[^0-9]+/, ""),
      };

      // get citation url class and update citation
      let citation_url_str = options.chg_citation
        ? options.chg_citation
        : "citation-url";
      let citation_url = document.getElementById(citation_url_str);

      let hrefState = `?${urlParam}${location.hash}`;
      uptState({
        hist: false,
        cit: citation_url,
        state: state,
        href: hrefState,
      });

      // set all nav links to inactive
      let pag_link = options.pag_link ? options.pag_link : ".pagination-link";
      let link = document.querySelectorAll(`${pag_link}`);
      let active = options.active_class ? options.active_class : "active";
      let bootstrap_class = options.bootstrap_class
        ? options.bootstrap_class
        : "show";
      let pag_tab = options.pag_tab
        ? options.pag_link
        : ".pagination-tab.tab-pane";

      link.forEach(function (el: HTMLElement) {
        el.classList.remove(active);
        el.classList.remove(bootstrap_class);
      });

      // get all nav tabs matching the href and set to active
      var ref = document.querySelectorAll(`${pag_link}[href="${href}"]`);
      ref.forEach(function (el: HTMLElement) {
        el.classList.add(active);
      });

      // active tab
      var tab = document.querySelectorAll(`${pag_tab}[data-tab="${dataTab}"]`);
      tab.forEach(function (el: HTMLElement) {
        el.classList.remove(active);
      });

      // get pagination tab with selected link
      var tab_ref = document.querySelectorAll(`${pag_tab}${href}`);
      tab_ref.forEach(function (el: HTMLElement) {
        el.classList.add(active);
        el.classList.add(bootstrap_class);
      });

      // ###############
      // load OSD Viewer
      // ###############
      let id = this.getAttribute("id");
      // variant is found by comparing variant config opt with custom element attr opt
      try {
        var variant_check = config.find((v: any) => v.opt === id);
      } catch (err) {
        console.log(
          "No option parameters found. Creating default parameters to continue."
        );
      }
      var variant = variant_check ? variant_check : { opt: id };

      let opt_url = options.url ? options.url : "provide-url";
      let opt_urlparam = options.url_param ? options.url_param : "";
      let opt_osd_target = options.osd_target
        ? options.osd_target
        : "container";
      let opt_img_source = options.img_source
        ? options.img_source
        : "container2";
      let opt_image_size = options.img_size ? options.img_size : "500px";

      let dataSource = `${opt_url}${variant.dataSource}${opt_urlparam}`;
      let targetID0 = `${variant.dataType}_${opt_osd_target}_${variant.pos}`;
      let targetID1 = `${variant.dataType}_${opt_img_source}_${variant.pos}`;

      // remove static images
      if (document.getElementById(targetID1)) {
        document.getElementById(targetID1).remove();
      }

      let target = document.getElementById(targetID0) as HTMLElement;
      if (target.childNodes.length === 0) {
        target.style.height = opt_image_size;
        // OpenSeaDragon Image Viewer
        let imageURL = { type: "image", url: dataSource };
        let viewer = OpenSeadragon({
          id: targetID0,
          prefixUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/openseadragon/3.1.0/images/",
          tileSources: imageURL,
          // Initial rotation angle
          // degrees: 90,
          // Show rotation buttons
          showRotationControl: true,
          // Enable touch rotation on tactile devices
          gestureSettingsTouch: {
            pinchRotate: true,
          },
        });

        // hide loading spinner if image fully loaded status changes
        // see issue: https://github.com/openseadragon/openseadragon/issues/1262
        viewer.addHandler("open", function () {
          let tiledImage = viewer.world.getItemAt(0);
          if (tiledImage.getFullyLoaded()) {
            hideLoading();
          } else {
            tiledImage.addOnceHandler("fully-loaded-change", hideLoading);
          }
        });
        function hideLoading() {
          // var container = $(osd_container_id).attr("id");
          let spinnerID = "spinner_" + targetID0;
          if (document.getElementById(spinnerID)) {
            // console.log(spinnerID);
            document.getElementById(spinnerID).remove();
          }
        }
      }
    }
  }

  render() {
    let data_type = this.getAttribute("data-type");
    // check if user set opt attribute
    if (typeof data_type !== "string") {
      console.log(
        "No 'data-type' attribute in custom element pagination found!"
      );
    }

    let pos = this.getAttribute("pos");
    // check if user set opt attribute
    if (typeof pos !== "string") {
      console.log("No 'pos' attribute in custom element pagination found!");
    }

    let facs = this.getAttribute("facs");
    // check if user set opt attribute
    if (typeof facs !== "string") {
      console.log("No 'facs' attribute in custom element pagination found!");
    }

    config.push({
      opt: `${data_type}_link_${pos}`,
      dataType: data_type,
      dataSource: facs,
      pos: pos,
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
}
