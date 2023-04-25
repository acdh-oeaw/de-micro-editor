const { AnnotationSlider } = require("./src/components/annotation_slider/main");
const { FullSize } = require("./src/components/full_screen/main");
const { FontSize } = require("./src/components/font_size/main");
const { FontFamily } = require("./src/components/font_family/main");
const { ImageSwitch } = require("./src/components/image_switch/main");
const { ImageLoader } = require("./src/components/image_loader/main");
const {
  EditionPagination,
} = require("./src/components/image_loader/pagination");
const { WindowResize } = require("./src/components/image_loader/resize");
const { UrlSearchParamUpdate } = require("./src/components/search_params/main");
const { MultiLanguage } = require("./src/components/multi_language/main");
const { SetDataCookie } = require("./src/utils/setCookie");

("use strict");

class LoadEditor {
  aot: object | boolean;
  fs: object | boolean;
  fos: object | boolean;
  ff: object | boolean;
  is: object | boolean;
  il: object | boolean;
  ep: object | boolean;
  wr: object | boolean;
  up: object | boolean;
  upc: any;
  lang: object | boolean;

  constructor(options: {
    aot: object | boolean;
    fs: object | boolean;
    fos: object | boolean;
    ff: object | boolean;
    is: object | boolean;
    il: object | boolean;
    ep: object | boolean;
    wr: object | boolean;
    up: object | boolean;
    lang: object | boolean;
  }) {
    /*
        define configuration options
        verify if option object is available and has specific key
        if options are not available all key hold default values
        if one or several keys are not available, only these keys will hold default values
        */
    if (options && "aot" in options) {
      this.aot = options.aot;
    }
    if (options && "fs" in options) {
      this.fs = options.fs;
    }
    if (options && "fos" in options) {
      this.fos = options.fos;
    }
    if (options && "ff" in options) {
      this.ff = options.ff;
    }
    if (options && "is" in options) {
      this.is = options.is;
    }
    if (options && "il" in options) {
      this.il = options.il;
    }
    if (options && "ep" in options) {
      this.ep = options.ep;
    }
    if (options && "wr" in options) {
      this.wr = options.wr;
    }
    if (options && "up" in options) {
      this.up = options.up;
    }
    if (options && "lang" in options) {
      this.lang = options.lang;
    }

    // initialize imported functions
    this.upc = new UrlSearchParamUpdate();

    // set cookies if config options is available
    if (this.aot) {
      try {
        new SetDataCookie("annotation_slider", this.aot).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.fs) {
      try {
        new SetDataCookie("fullsize", this.fs).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.fos) {
      try {
        new SetDataCookie("fontsize", this.fos).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.ff) {
      try {
        new SetDataCookie("font_family", this.ff).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.is) {
      try {
        new SetDataCookie("image_switch", this.is).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.il) {
      try {
        new SetDataCookie("image_loader", this.il).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.ep) {
      try {
        new SetDataCookie("ed_pagination", this.ep).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (this.lang) {
      try {
        new SetDataCookie("multi_language", this.lang).build();
      } catch (e) {
        console.log(e);
      }
    }

    // defines custom elements and assigns a class
    // renders html node and adds function
    // window onload triggers paramUrl functions
    if (this.ep) {
      try {
        window.customElements.define("edition-pagination", EditionPagination);
      } catch (e) {
        console.log(e);
      }
    }
    if (this.il) {
      try {
        window.customElements.define("image-loader", ImageLoader);
        if (this.up) {
          window.onload = this.upc.pageUrl();
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.aot) {
      try {
        window.customElements.define("annotation-slider", AnnotationSlider);
        if (this.up) {
          window.onload = this.upc.textFeatures();
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.fs) {
      try {
        window.customElements.define("full-size", FullSize);
        if (this.up) {
          window.onload = this.upc.fullSreen();
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.fos) {
      try {
        window.customElements.define("font-size", FontSize);
        if (this.up) {
          window.onload = this.upc.fontSize();
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.ff) {
      try {
        window.customElements.define("font-family", FontFamily);
        if (this.up) {
          window.onload = this.upc.fontFamily();
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.is) {
      try {
        window.customElements.define("image-switch", ImageSwitch);
        if (this.up) {
          window.onload = this.upc.viewerSwitch();
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.wr) {
      try {
        window.customElements.define("window-resize", WindowResize);
      } catch (e) {
        console.log(e);
      }
    }
    if (this.lang) {
      try {
        window.customElements.define("multi-language", MultiLanguage);
        if (this.up) {
          window.onload = this.upc.multiLanguage();
        }
      } catch (e) {
        console.log(e);
      }
    }

    // onpopstate = browser back and forward button to recognize classes
    window.onpopstate = () => {
      if (this.aot && this.up) {
        try {
          this.upc.textFeatures();
        } catch (e) {
          console.log(e);
        }
      }
      if (this.fs && this.up) {
        try {
          this.upc.fullSreen();
        } catch (e) {
          console.log(e);
        }
      }
      if (this.fos && this.up) {
        try {
          this.upc.fontSize();
        } catch (e) {
          console.log(e);
        }
      }
      if (this.ff && this.up) {
        try {
          this.upc.fontFamily();
        } catch (e) {
          console.log(e);
        }
      }
      if (this.is && this.up) {
        try {
          this.upc.viewerSwitch();
        } catch (e) {
          console.log(e);
        }
      }
      if (this.il && this.up) {
        try {
          this.upc.pageUrl();
        } catch (e) {
          console.log(e);
        }
      }
      if (this.lang && this.up) {
        try {
          this.upc.multiLanguage();
        } catch (e) {
          console.log(e);
        }
      }
    };

    window.onload = () => {
      if (window.location.hash == "") {
        return false;
      } else {
        var el: any = document.querySelector(window.location.hash);

        if (el !== null) {
          el.scrollIntoView({ behavior: "smooth" });
          el.style.backgroundColor = "#FFFCA1";

          setTimeout(function () {
            el.style.backgroundColor = "transparent";
          }, 10000);
        }
      }
    };
  }
}

module.exports = LoadEditor;
