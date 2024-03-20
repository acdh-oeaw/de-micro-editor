import { SetDataCookie } from "./src/utils/setCookie";
import type {
  AnnotationType,
  FontFamilyType,
  FullScreenType,
  FontSizeType,
  ImageSwitchType,
  MultiLanguageType,
  PageUrlType,
  ImageLoaderType,
} from "./src/utils/types";
import { AnnotationSlider } from "./src/components/annotation_slider/main";
import { FullSize } from "./src/components/full_screen/main";
import { FontSize } from "./src/components/font_size/main";
import { FontFamily } from "./src/components/font_family/main";
import { ImageSwitch } from "./src/components/image_switch/main";
import { ImageLoader } from "./src/components/image_loader/main";
import { EditionPagination } from "./src/components/image_loader/pagination";
import { WindowResize } from "./src/components/image_loader/resize";
import { UrlSearchParamUpdate } from "./src/components/search_params/main";
import { MultiLanguage } from "./src/components/multi_language/main";

("use strict");

class LoadEditor {
  aot: AnnotationType | boolean;
  fs: FullScreenType | boolean;
  fos: FontSizeType | boolean;
  ff: FontFamilyType | boolean;
  is: ImageSwitchType | boolean;
  il: ImageLoaderType | boolean;
  ep: PageUrlType | boolean;
  wr: boolean;
  up: boolean;
  upc: any;
  lang: MultiLanguageType | boolean;

  constructor(options: {
    aot: AnnotationType | boolean;
    fs: FullScreenType | boolean;
    fos: FontSizeType | boolean;
    ff: FontFamilyType | boolean;
    is: ImageSwitchType | boolean;
    il: ImageLoaderType | boolean;
    ep: PageUrlType | boolean;
    wr: boolean;
    up: boolean;
    lang: MultiLanguageType | boolean;
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
      console.log(
        "Warning 001: ImageSwitch parameter 'is' requires OpenSeadragon library: https://openseadragon.github.io/"
      );
    }
    if (options && "il" in options) {
      this.il = options.il;
      console.log(
        "Warning 002: ImageLoader parameter 'il' requires OpenSeadragon library: https://openseadragon.github.io/"
      );
    }
    if (options && "ep" in options) {
      this.ep = options.ep;
      console.log(
        "Warning 003: Edition Pagination parameter 'ep' requires OpenSeadragon library: https://openseadragon.github.io/"
      );
    }
    if (options && "wr" in options && options.wr === true) {
      this.wr = options.wr;
    }
    if (options && "up" in options && options.up === true) {
      this.up = options.up;
      // initialize imported functions
      this.upc = new UrlSearchParamUpdate();
    }
    if (options && "lang" in options) {
      this.lang = options.lang;
    }

    // set cookies if config options is available
    if (typeof this.aot === "object") {
      [...this.aot.variants].forEach((variant) => {
        if (variant.custom_function instanceof Function) {
          variant.custom_function = variant.custom_function.toString();
        }
      });
      try {
        new SetDataCookie("annotation_slider", this.aot).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (typeof this.fs === "object") {
      try {
        new SetDataCookie("fullsize", this.fs).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (typeof this.fos === "object") {
      try {
        new SetDataCookie("fontsize", this.fos).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (typeof this.ff === "object") {
      try {
        new SetDataCookie("font_family", this.ff).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (typeof this.il === "object") {
      try {
        new SetDataCookie("image_loader", this.il).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (typeof this.is === "object") {
      try {
        new SetDataCookie("image_switch", this.is).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (typeof this.ep === "object") {
      try {
        new SetDataCookie("ed_pagination", this.ep).build();
      } catch (e) {
        console.log(e);
      }
    }
    if (typeof this.lang === "object") {
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
    if (this.wr) {
      try {
        window.customElements.define("window-resize", WindowResize);
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
