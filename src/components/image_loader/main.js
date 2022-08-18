const OpenSeadragon = require("openseadragon");

const config = [];

export class ImageLoader extends HTMLElement {

    "use strict";

    static get observedAttributes() {
        return ["opt", "data-target", "data-source"];
    }

    connectedCallback() {
        this.render();
        let dataTarget = this.getAttribute("data-target");
        if (dataTarget.includes("container_1")){
            // console.log(this.childNodes[1]);
            this.childNodes[1].addEventListener("load", this.loadImage);
        } else {
            const pagination = document.querySelectorAll('.pagination .nav-tabs li a');
            pagination.forEach((el) => {
                el.addEventListener("click", this.loadImage);
            });
        }
    }

    loadImage() {
        let id = this.getAttribute("id");
        let variant = config.find((v) => v.opt === id);
        let dataTarget = variant["dataTarget"];
        let dataSource = variant["dataSource"];
        // hides static images
        let targetID0 = dataTarget.split('__')[0];
        let targetID1 = dataTarget.split('__')[1];
        let target = document.getElementById(targetID0);
        console.log(target);
        console.log(targetID0);
        console.log("loadImage");
        console.log(target.childNodes.length);
        if ( target.childNodes.length === 1 ) {
            target.style.height = "1000px;";
            // OpenSeaDragon Image Viewer
            var imageURL = {type: 'image', url: dataSource};
            console.log(imageURL);
            var viewer = OpenSeadragon({
                id: targetID0,
                prefixUrl: 'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/3.1.0/images/',
                tileSources: imageURL
            });

            // remove static images
            document.getElementById(targetID1).remove();

            // hide loading spinner if image fully loaded status changes
            // see issue: https://github.com/openseadragon/openseadragon/issues/1262
            viewer.addHandler('open', function() {
                var tiledImage = viewer.world.getItemAt(0);
                if (tiledImage.getFullyLoaded()) {
                    hideLoading();
                } else {
                    tiledImage.addOnceHandler('fully-loaded-change', hideLoading);
                }
            });
            function hideLoading() {
                // var container = $(osd_container_id).attr("id");  
                var spinnerID = "spinner_" + target;
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
        let pos = opt.split('_');
        let position = pos[pos.length - 1];
        let resize = `onload="$( document ).ready(resize('${position}'))`;
        this.innerHTML = `
            <img id="${opt}" src="${dataSource}"></img>
        `;
    }

}
