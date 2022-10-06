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
        this.conf_aot = options.aot;
        this.conf_fs = options.fs;
        this.conf_fos = options.fos;
        this.conf_ff = options.ff;
        this.conf_is = options.is;
        this.conf_il = options.il;
        this.conf_ep = options.ep;
        this.conf_wr = options.wr;
        this.conf_up = true;

        // initialize imported functions
        this.up = new UrlSearchParamUpdate();

        // set cookies if config options is available
        if (this.conf_aot) {
            try {
                this.set_cookie_aot = new SetDataCookie("conf_annotation_slider", this.conf_aot).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_fs) {
            try {
                this.set_cookie_fs = new SetDataCookie("conf_fullsize", this.conf_fs).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_fos) {
            try {
                this.set_cookie_fos = new SetDataCookie("conf_fontsize", this.conf_fos).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_ff) {
            try {
                this.set_cookie_ff = new SetDataCookie("conf_font_family", this.conf_ff).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_is) {
            try {
                this.set_cookie_is = new SetDataCookie("conf_image_switch", this.conf_is).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_il) {
            try {
                this.set_cookie_il = new SetDataCookie("conf_image_loader", this.conf_il).build();
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_ep) {
            try {
                this.set_cookie_ep = new SetDataCookie("conf_ed_pagination", this.conf_ep).build();
            } catch (e) {
                console.log(e);
            }
        }

        // defines custom elements and assigns a class
        // renders html node and adds function
        // window onload triggers paramUrl functions
        if (this.conf_ep) {
            try {
                window.customElements.define('edition-pagination', EditionPagination);
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_il) {
            try {
                window.customElements.define('image-loader', ImageLoader);
                if (this.conf_up) {
                    window.onload = this.up.pageUrl();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_aot) {
            try {
                window.customElements.define('annotation-slider', AnnotationSlider);
                if (this.conf_up) {
                    window.onload = this.up.textFeatures();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_fs) {
            try {
                window.customElements.define('full-size', FullSize);
                if (this.conf_up) {
                    window.onload = this.up.fullSreen();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_fos) {
            try {
                window.customElements.define('font-size', FontSize);
                if (this.conf_up) {
                    window.onload = this.up.fontSize();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_ff) {
            try {
                window.customElements.define('font-family', FontFamily);
                if (this.conf_up) {
                    window.onload = this.up.fontFamily();
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_is) {
            try {
                window.customElements.define('image-switch', ImageSwitch);
                if (this.conf_up) {
                    window.onload = this.up.viewerSwitch();
                }
                
            } catch (e) {
                console.log(e);
            }
        }
        if (this.conf_wr) {
            try {
                window.customElements.define('window-resize', WindowResize);
            } catch (e) {
                console.log(e);
            }
        }

        // onpopstate = browser back and forward button to recognize classes
        window.onpopstate = () => {
            if (this.conf_aot && this.conf_up) {
                try {
                    this.up.textFeatures();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.conf_fs && this.conf_up) {
                try {
                    this.up.fullSreen();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.conf_fos && this.conf_up) {
                try {
                    this.up.fontSize();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.conf_ff && this.conf_up) {
                try {
                    this.up.fontFamily();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.conf_is && this.conf_up) {
                try {
                    this.up.viewerSwitch();
                } catch (e) {
                    console.log(e);
                }
            }
            if (this.conf_il && this.conf_up) {
                try {
                    this.up.pageUrl();
                } catch (e) {
                    console.log(e);
                }
            }
        }

        window.onload = () => {
                    
            if (window.location.hash == '') {
                return false;
            }
            
            let el = document.querySelector(window.location.hash);
            
            if (el !== null) {
            
                el.scrollIntoView({ behavior: 'smooth' });
                el.style.backgroundColor = "#FFFCA1";
            
            }
        
        }

    }

};

module.exports = LoadEditor;
