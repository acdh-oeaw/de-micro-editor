const { AnnotationSlider } = require("./components/annotation_slider/main");
const { FullSize }  = require("./components/full_screen/main");
const { FontSize } = require("./components/font_size/main");
const { FontFamily } = require("./components/font_family/main");
const { ImageSwitch } = require("./components/image_switch/main");
const { UrlSearchParamUpdate } = require("./components/search_params/main");
const { SetDataCookie } = require("./utils/setCookie");
// const { sliderConfig } = require("./config/conf_annotation_slider");

"use strict";

class LoadEditor {

    constructor(conf_annot, conf_fs, conf_fos, conf_ff, conf_is) {
        this.conf_annot = conf_annot;
        this.conf_fs = conf_fs;
        this.conf_fos = conf_fos;
        this.conf_ff = conf_ff;
        this.conf_is = conf_is;
    }

    cookie() {
        if (this.conf_annot) {
            let set_cookie = new SetDataCookie("conf_annotation_slider", this.conf_annot);
            set_cookie.build();
        }
        if (this.conf_annot) {
            let set_cookie = new SetDataCookie("conf_fullsize", this.conf_fs);
            set_cookie.build();
        }
        if (this.conf_annot) {
            let set_cookie = new SetDataCookie("conf_fontsize", this.conf_fos);
            set_cookie.build();
        }
        if (this.conf_annot) {
            let set_cookie = new SetDataCookie("conf_font_family", this.conf_ff);
            set_cookie.build();
        }
        if (this.conf_annot) {
            let set_cookie = new SetDataCookie("conf_image_switch", this.conf_is);
            set_cookie.build();
        }
    }

    build() {    
        const update = new UrlSearchParamUpdate();
        window.customElements.define('full-size', FullSize);
        window.onload = update.fullSreen();
        window.customElements.define('image-switch', ImageSwitch);
        window.onload = update.viewerSwitch();
        window.customElements.define('font-size', FontSize);
        window.onload = update.fontSize();
        window.customElements.define('font-family', FontFamily);
        window.onload = update.fontFamily();
        window.customElements.define('annotation-slider', AnnotationSlider);
        window.onload = update.textFeatures();
    
        window.onpopstate = () => {
            update.textFeatures();
            update.fontFamily();
            update.fontSize();
            update.viewerSwitch();
            update.fullSreen();
            // pageUrl();
            // // console.log(`location: ${document.location}, state: ${JSON.stringify(event.state)}`);
        }
    }
};

module.exports = LoadEditor;
