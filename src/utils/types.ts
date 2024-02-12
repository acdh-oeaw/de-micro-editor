type String_misc = string | null | undefined;
type Bool_misc = boolean | null | undefined;
type Rendered_element =
  | {
      label_class: String_misc;
      slider_class: String_misc;
    }
  | null
  | undefined;
type Span_element =
  | {
      css_class: String_misc;
    }
  | null
  | undefined;
type Title = String_misc;
type Hide = {
  hidden: boolean;
  class: string;
} | null;
type Features = {
  all: Bool_misc;
  class: String_misc;
} | null;
type Variants =
  | [
      {
        opt: String_misc;
        opt_slider: String_misc;
        title: String_misc;
        color: String_misc;
        html_class: String_misc;
        css_class: String_misc;
        hide: Hide;
        chg_citation: String_misc;
        features: Features;
      }
    ]
  | null
  | undefined;
export type AnnotationType = {
  title: Title;
  variants: Variants;
  span_element: Span_element;
  active_class: String_misc;
  rendered_element: Rendered_element;
};
export type FullScreenType =
  | {
      name: String_misc;
      variants:
        | [
            {
              opt: String_misc;
              title: String_misc;
              hide: String_misc;
              to_hide: String_misc;
              chg_citation: String_misc;
              urlparam: String_misc;
            }
          ]
        | null;
      active_class: String_misc;
      render_class: String_misc;
      render_svg: String_misc;
    }
  | null
  | undefined;
type Sizes =
  | {
      default: String_misc;
      font_size_14: String_misc;
      font_size_18: String_misc;
      font_size_22: String_misc;
      font_size_26: String_misc;
    }
  | null
  | undefined;
type Fonts =
  | {
      default: String_misc;
      font1: String_misc;
      font2: String_misc;
      font3: String_misc;
    }
  | null
  | undefined;
type FontVariants =
  | [
      {
        opt: String_misc;
        title: String_misc;
        urlparam: String_misc;
        sizes?: Sizes;
        fonts?: Fonts;
        paragraph: String_misc;
        p_class: String_misc;
        css_class: String_misc;
      }
    ]
  | null
  | undefined;
export type FontSizeType =
  | {
      name: String_misc;
      variants: FontVariants;
      active_class: String_misc;
      html_class: String_misc;
    }
  | null
  | undefined;
export type FontFamilyType =
  | {
      name: String_misc;
      variants: FontVariants;
      active_class: String_misc;
      html_class: String_misc;
    }
  | null
  | undefined;
export type ImageSwitchType =
  | {
      name: String_misc;
      variants: [
        {
          opt: String_misc;
          title: String_misc;
          urlparam: String_misc;
          chg_citation: String_misc;
          fade: String_misc;
          column_small:
            | {
                class: String_misc;
                percent: String_misc;
              }
            | null
            | undefined;
          column_full:
            | {
                class: String_misc;
                percent: String_misc;
              }
            | null
            | undefined;
          hide:
            | {
                hidden: true;
                class_to_hide: String_misc;
                class_to_show: String_misc;
                class_parent: String_misc;
                resize: String_misc;
              }
            | null
            | undefined;
          image_size: String_misc;
        }
      ];
      active_class: String_misc;
      rendered_element:
        | {
            a_class: String_misc;
            svg: String_misc;
          }
        | null
        | undefined;
    }
  | null
  | undefined;
export type PageUrl =
  | {
      name: String_misc;
      opt: String_misc;
      title: String_misc;
      urlparam: String_misc;
      chg_citation: String_misc;
      pag_link: String_misc;
      pag_tab: String_misc;
      img_size: String_misc; // to be deprecated
      url: String_misc;
      url_param: String_misc;
      osd_target: String_misc;
      img_source: String_misc;
      img_types: [] | null | undefined;
      active_class: String_misc;
      inactive_class: String_misc;
      bootstrap_class: String_misc;
    }
  | null
  | undefined;
export type MultiLanguage =
  | {
      title: String_misc;
      variants:
        | [
            {
              opt: String_misc;
              title: String_misc;
              class: String_misc;
              map: object | null | undefined;
            }
          ]
        | null
        | undefined;
      active_class: String_misc;
    }
  | null
  | undefined;
