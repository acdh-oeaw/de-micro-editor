const OpenSeadragon = require("openseadragon");

const config = [];

export class ImageLoader extends HTMLElement {

    "use strict";

    static get observedAttributes() {
        return ["opt", "data-target", "data-source"];
    }

    connectedCallback() {
        this.render();
        let data = "conf_image_loader";
        let options = JSON.parse(localStorage.getItem(data));
        let pagination = document.querySelectorAll(options.pag_link);
        pagination.forEach((el) => {
            el.addEventListener("click", this.updateImgPage);
        });
    }

    updateImgPage() {
        let data = "conf_image_loader";
        let options = JSON.parse(localStorage.getItem(data));

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
        window.history.pushState(state, '', `?${urlParam}`);

        if (options.chg_citation) {
            var citation_url = document.getElementById(options.chg_citation);
            citation_url.innerHTML = `${location.hostname}${location.pathname}?${urlParam}`;
            citation_url.setAttribute("href", window.location.href);
        }
        
        // set all nav tabs to inactive
        var link = document.querySelectorAll(`${options.pag_link}[data-tab="${dataTab}"]`);
        link.forEach(function(el) {
            el.classList.remove(options.active_class);
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
        let imgID = id.replace("link", "img");
        let variant = config.find((v) => v.opt === imgID);
        let dataTarget = variant["dataTarget"];
        let dataSource = variant["dataSource"];
        let targetID0 = dataTarget.split('__')[0];
        let targetID1 = dataTarget.split('__')[1];

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
        let opt = this.getAttribute("opt");
        let dataTarget = this.getAttribute("data-target");
        let dataSource = this.getAttribute("data-source");
        config.push({
            "opt": opt,
            "dataTarget": dataTarget,
            "dataSource": dataSource
        });
        this.innerHTML = `
            <img id="${opt}" src="${dataSource}"></img>
        `;
    }

}
