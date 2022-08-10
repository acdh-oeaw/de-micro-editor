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
        if (this.conf_fs) {
            let set_cookie = new SetDataCookie("conf_fullsize", this.conf_fs);
            set_cookie.build();
        }
        if (this.conf_fos) {
            let set_cookie = new SetDataCookie("conf_fontsize", this.conf_fos);
            set_cookie.build();
        }
        if (this.conf_ff) {
            let set_cookie = new SetDataCookie("conf_font_family", this.conf_ff);
            set_cookie.build();
        }
        if (this.conf_is) {
            let set_cookie = new SetDataCookie("conf_image_switch", this.conf_is);
            set_cookie.build();
        }
        return console.log(```Cookies for all provided variants and configurations 
            ${this.conf_is} ${this.conf_ff} ${this.conf_fos} ${this.conf_fs} ${this.conf_annot} set. 
            You can find them under the names: conf_annotation_slider, *_fullsize, *_fontsize, *_font_family, *_image_switch```);
    }

    build() {    
        const update = new UrlSearchParamUpdate();
        if (this.conf_annot) {
            window.customElements.define('annotation-slider', AnnotationSlider);
            window.onload = update.textFeatures();
        }
        if (this.conf_fs) {
            window.customElements.define('full-size', FullSize);
            window.onload = update.fullSreen();
        }
        if (this.conf_fos) {
            window.customElements.define('font-size', FontSize);
            window.onload = update.fontSize();
        }
        if (this.conf_ff) {
            window.customElements.define('font-family', FontFamily);
            window.onload = update.fontFamily();
        }
        if (this.conf_is) {
            window.customElements.define('image-switch', ImageSwitch);
            window.onload = update.viewerSwitch();
        }
        window.onpopstate = () => {
            if (this.conf_annot) {
                update.textFeatures();
            }
            if (this.conf_fs) {
                update.fullSreen();
            }
            if (this.conf_fos) {
                update.fontSize();
            }
            if (this.conf_ff) {
                update.fontFamily();
            }
            if (this.conf_is) {
                update.viewerSwitch();
            }
            // pageUrl();
            // // console.log(`location: ${document.location}, state: ${JSON.stringify(event.state)}`);
        }
        return console.log(```HTML interface for all provided variants and configurations 
            ${this.conf_is} ${this.conf_ff} ${this.conf_fos} ${this.conf_fs} ${this.conf_annot} loaded.```);
    }
};

module.exports = LoadEditor;
