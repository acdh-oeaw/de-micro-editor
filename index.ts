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

export class LoadEditor {
  aot: AnnotationType | false;
  fs: FullScreenType | false;
  fos: FontSizeType | false;
  ff: FontFamilyType | false;
  is: ImageSwitchType | false;
  il: ImageLoaderType | false;
  ep: PageUrlType | false;
  wr: boolean | false;
  up: boolean | false;
  upc: UrlSearchParamUpdate;
  lang: MultiLanguageType | false;

  constructor(options: {
    aot?: AnnotationType;
    fs?: FullScreenType;
    fos?: FontSizeType;
    ff?: FontFamilyType;
    is?: ImageSwitchType;
    il?: ImageLoaderType;
    ep?: PageUrlType;
    wr?: boolean;
    up?: boolean;
    lang?: MultiLanguageType;
  }) {
    /*
        define configuration options
        verify if option object is available and has specific key
        if options are not available all key hold default values
        if one or several keys are not available, only these keys will hold default values
        */

    this.aot = options.aot ? options.aot : false;
    this.fs = options.fs ? options.fs : false;
    this.fos = options.fos ? options.fos : false;
    this.ff = options.ff ? options.ff : false;
    this.is = options.is ? options.is : false;
    this.il = options.il ? options.il : false;
    this.ep = options.ep ? options.ep : false;
    this.wr = options.wr ? options.wr : false;
    this.up = options.up ? options.up : false;
    this.upc = new UrlSearchParamUpdate();
    this.lang = options.lang ? options.lang : false;

    // set cookies if config options is available
    if (this.aot) {
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
    if (this.il) {
      try {
        new SetDataCookie("image_loader", this.il).build();
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
    if (this.aot) {
      try {
        window.customElements.define("annotation-slider", AnnotationSlider);
        if (this.up) {
          window.onload = this.upc.textFeatures;
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.fs) {
      try {
        window.customElements.define("full-size", FullSize);
        if (this.up) {
          window.onload = this.upc.fullScreen;
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.fos) {
      try {
        window.customElements.define("font-size", FontSize);
        if (this.up) {
          window.onload = this.upc.fontSize;
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.ff) {
      try {
        window.customElements.define("font-family", FontFamily);
        if (this.up) {
          window.onload = this.upc.fontFamily;
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
          window.onload = this.upc.viewerSwitch;
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.il) {
      try {
        window.customElements.define("image-loader", ImageLoader);
        if (this.up) {
          window.onload = this.upc.pageUrl;
        }
      } catch (e) {
        console.log(e);
      }
    }
    if (this.lang) {
      try {
        window.customElements.define("multi-language", MultiLanguage);
        if (this.up) {
          window.onload = this.upc.multiLanguage;
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
          this.upc.fullScreen();
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
