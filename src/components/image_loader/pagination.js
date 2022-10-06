const OpenSeadragon = require("openseadragon");

const config = [];

export class EditionPagination extends HTMLElement {

    "use strict";

    static get observedAttributes() {
        return ["opt", "pos", "facs", "data-type"];
    }

    connectedCallback() {
        this.render();
        this.childNodes[1].addEventListener("click", this.updateImgPage);
    }

    updateImgPage() {
        let data = "conf_ed_pagination";
        let options = JSON.parse(sessionStorage.getItem(data));

        // get urlparam
        const url = new URL(window.location.href);
        const urlParam = new URLSearchParams(url.search);

        // get selected href
        var href = this.getAttribute('href');
        var dataTab = this.getAttribute('data-tab');

        // update urlparam
        urlParam.set(options.urlparam, href.replace(/[^0-9]+/, ''));
        var state = {};
        state[options.urlparam] = href.replace(/[^0-9]+/, '')
        window.history.pushState(state, '', `?${urlParam}${location.hash}`);

        var citation_url = document.getElementById(options.chg_citation);
        if (citation_url) {
            citation_url.innerHTML = `${location.hostname}${location.pathname}?${urlParam}${location.hash}`;
            citation_url.setAttribute("href", `${window.location.href}${location.hash}`);
        }
        
        // set all nav links to inactive
        var link = document.querySelectorAll(`${options.pag_link}`);
        link.forEach(function(el) {
            el.classList.remove(options.active_class);
            el.classList.remove(options.bootstrap_class);
        });

        // get all nav tabs matching the href and set to active
        var ref = document.querySelectorAll(`${options.pag_link}[href="${href}"]`);
        ref.forEach(function(el) {
            el.classList.add(options.active_class);
        });

        // active tab
        var tab = document.querySelectorAll(`${options.pag_tab}[data-tab="${dataTab}"]`);
        tab.forEach(function(el) {
            el.classList.remove(options.active_class);
        });
        var tab_ref = document.querySelectorAll(`${options.pag_tab}${href}`);
        tab_ref.forEach(function(el) {
            el.classList.add(options.active_class);
            el.classList.add('show');
        });

        // ###############
        // load OSD Viewer
        // ###############
        let id = this.getAttribute("id");
        let variant = config.find((v) => v.opt === id);
        let dataSource = `${options.url}${variant["dataSource"]}${options.url_param}`;
        let targetID0 = `${variant["dataType"]}_${options.osd_target}_${variant["pos"]}`;
        let targetID1 = `${variant["dataType"]}_${options.img_source}_${variant["pos"]}`;

        // remove static images
        if (document.getElementById(targetID1)) {
            document.getElementById(targetID1).remove();
        }
        let target = document.getElementById(targetID0);
        if ( target.childNodes.length === 0 ) {
            target.style.height = options.img_size;
            // OpenSeaDragon Image Viewer
            let imageURL = {type: 'image', url: dataSource};
            let viewer = OpenSeadragon({
                id: targetID0,
                prefixUrl: 'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/3.1.0/images/',
                tileSources: imageURL
            });

            // hide loading spinner if image fully loaded status changes
            // see issue: https://github.com/openseadragon/openseadragon/issues/1262
            viewer.addHandler('open', function() {
                let tiledImage = viewer.world.getItemAt(0);
                if (tiledImage.getFullyLoaded()) {
                    hideLoading();
                } else {
                    tiledImage.addOnceHandler('fully-loaded-change', hideLoading);
                }
            });
            function hideLoading() {
                // var container = $(osd_container_id).attr("id");  
                let spinnerID = "spinner_" + targetID0;
                if ( document.getElementById(spinnerID) ) {
                    // console.log(spinnerID);
                    document.getElementById(spinnerID).remove();
                }
            };
        }
    }

    render() {
        let data_type = this.getAttribute("data-type");
        let pos = this.getAttribute("pos");
        let facs = this.getAttribute("facs");
        config.push({
            "opt": `${data_type}_link_${pos}`,
            "dataType": data_type,
            "dataSource": facs,
            "pos": pos
        });
        this.innerHTML = `
            <a title="Tab ${pos}"
                class="nav-link pagination-link active"
                data-toggle="tab"
                data-tab="paginate"
                id="${data_type}_link_${pos}"
                href="#paginate-${pos}"
                style="border-radius:30px;">
                ${pos}
            </a>
        `;
    }

}
