const { AnnotationSlider } = require("./src/components/annotation_slider/main");
const { FullSize }  = require("./src/components/full_screen/main");
const { FontSize } = require("./src/components/font_size/main");
const { FontFamily } = require("./src/components/font_family/main");
const { ImageSwitch } = require("./src/components/image_switch/main");
const { ImageLoader } = require("./src/components/image_loader/main");
const { EditionPagination } = require("./src/components/image_loader/pagination");
const { WindowResize } = require("./src/components/image_loader/resize");
const { UrlSearchParamUpdate } = require("./src/components/search_params/main");
const { SetDataCookie } = require("./src/utils/setCookie");

"use strict";

class LoadEditor {

    constructor(options) {

        // define configuration options
        this.conf_annot = options.aot;
        this.conf_fs = options.fs;
        this.conf_fos = options.fos;
        this.conf_ff = options.ff;
        this.conf_is = options.is;
        this.conf_il = options.il;
        this.conf_ep = options.ep;
        this.conf_wr = options.wr;

        // initialize imported functions
        this.aot = AnnotationSlider;
        this.fs = FullSize;
        this.fos = FontSize;
        this.ff = FontFamily;
        this.is = ImageSwitch;
        this.il = ImageLoader;
        this.ep = EditionPagination;
        this.wr = WindowResize;
        this.up = new UrlSearchParamUpdate();

        // set cookies if config options is available
        if (this.conf_annot) {
            this.set_cookie_aot = new SetDataCookie("conf_annotation_slider", this.conf_annot).build();
        }
        if (this.conf_fs) {
            this.set_cookie_fs = new SetDataCookie("conf_fullsize", this.conf_fs).build();
        }
        if (this.conf_fos) {
            this.set_cookie_fos = new SetDataCookie("conf_fontsize", this.conf_fos).build();
        }
        if (this.conf_ff) {
            this.set_cookie_ff = new SetDataCookie("conf_font_family", this.conf_ff).build();
        }
        if (this.conf_is) {
            this.set_cookie_is = new SetDataCookie("conf_image_switch", this.conf_is).build();
        }
        if (this.conf_il) {
            this.set_cookie_il = new SetDataCookie("conf_image_loader", this.conf_il).build();
        }
        if (this.conf_ep) {
            this.set_cookie_ep = new SetDataCookie("conf_ed_pagination", this.conf_ep).build();
        }

        // defines custom elements and assigns a class
        // renders html node and adds function
        // window onload triggers paramUrl functions
        if (this.conf_ep) {
            window.customElements.define('edition-pagination', this.ep);
        }
        if (this.conf_il) {
            window.customElements.define('image-loader', this.il);
            window.onload = this.up.pageUrl();
        }
        if (this.conf_annot) {
            window.customElements.define('annotation-slider', this.aot);
            window.onload = this.up.textFeatures();
        }
        if (this.conf_fs) {
            window.customElements.define('full-size', this.fs);
            window.onload = this.up.fullSreen();
        }
        if (this.conf_fos) {
            window.customElements.define('font-size', this.fos);
            window.onload = this.up.fontSize();
        }
        if (this.conf_ff) {
            window.customElements.define('font-family', this.ff);
            window.onload = this.up.fontFamily();
        }
        if (this.conf_is) {
            window.customElements.define('image-switch', this.is);
            window.onload = this.up.viewerSwitch();
        }
        if (this.conf_wr) {
            window.customElements.define('window-resize', this.wr);
        }

        // onpopstate = browser back and forward button to recognize classes
        window.onpopstate = () => {
            if (this.conf_annot) {
                this.up.textFeatures();
            }
            if (this.conf_fs) {
                this.up.fullSreen();
            }
            if (this.conf_fos) {
                this.up.fontSize();
            }
            if (this.conf_ff) {
                this.up.fontFamily();
            }
            if (this.conf_is) {
                this.up.viewerSwitch();
            }
            if (this.conf_il) {
                this.up.pageUrl();
            }
        }

    }

};

module.exports = LoadEditor;
