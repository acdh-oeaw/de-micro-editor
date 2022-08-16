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
            console.log(dataTarget);
            console.log("connectedCallback");
            // console.log(this.childNodes[1]);
            this.childNodes[1].addEventListener("load", this.loadImage);
        } else {
            console.log(dataTarget);
            console.log("connectedCallback");
            const pagination = document.querySelectorAll('.pagination .nav-tabs li a');
            pagination.forEach((el) => {
                el.addEventListener("click", this.loadImage);
            });
        }
    }

    loadImage() {
        let id = this.getAttribute("id");
        let variant = config.find((v) => v.opt === id);
        console.log(variant);
        let dataTarget = variant.dataTarget;
        let dataSource = variant.dataSource;
        console.log(dataTarget);
        console.log(dataSource);
        let target = document.getElementById(dataTarget.split('__')[0]);
        console.log(target);
        console.log("loadImage");
        console.log(target.childNodes.length);
        if ( target.childNodes.length == 1 ) {
            target.style.height = "1000px";
            // OpenSeaDragon Image Viewer
            var imageURL = {type: 'image', url: dataSource};
            var viewer = OpenSeadragon({
                id: target,
                prefixUrl: 'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/3.1.0/images/',
                // sequenceMode: true,
                // showReferenceStrip: true,
                // showNavigator: true,
                // imageLoaderLimit: 10,
                tileSources: imageURL
            });
            // hides static images
            // document.getElementById(dataTarget.split('__')[1]).style.display = "none";
    
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
