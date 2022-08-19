const OpenSeadragon = require("openseadragon");

const config = [];

export class ImageLoader extends HTMLElement {

    "use strict";

    static get observedAttributes() {
        return ["opt", "data-target", "data-source"];
    }

    connectedCallback() {
        this.render();
        let pagination = document.querySelectorAll('.pagination .nav-tabs li a');
        pagination.forEach((el) => {
            el.addEventListener("click", this.updateImgPage);
        });
    }

    updateImgPage() {
        // get urlparam
        const url = new URL(window.location.href);
        const urlParam = new URLSearchParams(url.search);
        const citation_url = document.getElementById("citation-url");
        // get selected href
        var href = this.getAttribute('href');
        var dataTab = this.getAttribute('data-tab');
        // update urlparam
        urlParam.set("page", href.replace('#paginate-', ''));
        var state = {"page": href.replace('#paginate-', '')};
        window.history.pushState(state, '', `?${urlParam}`);
        citation_url.innerHTML = `${location.hostname}${location.pathname}?${urlParam}`;
        citation_url.setAttribute("href", window.location.href);
        // set all nav tabs to inactive
        var link = document.querySelectorAll(`.pagination .nav-tabs li a[data-tab="${dataTab}"]`);
        link.forEach(function(el) {
            el.classList.remove('active');
        });
        // get all nav tabs matching the href and set to active
        var ref = document.querySelectorAll(`.pagination .nav-tabs li a[href="${href}"]`);
        ref.forEach(function(el) {
            el.classList.add('active');
        });
        // active tab
        var tab = document.querySelectorAll(`.pagination-tab.tab-pane[data-tab="${dataTab}"]`);
        tab.forEach(function(el) {
            el.classList.remove('active');
        });
        var tab_ref = document.querySelectorAll(`.pagination-tab.tab-pane${href}`);
        tab_ref.forEach(function(el) {
            el.classList.add('active');
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
            target.style.height = "1000px";
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
