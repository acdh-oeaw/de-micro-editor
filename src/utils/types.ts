export type AnnotationType = {
  title: Title;
  variants: Variants;
  span_element: Span_element;
  active_class: String_misc;
  rendered_element: Rendered_element;
};
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
export type FontSizeType =
  | {
      name: String_misc;
      variants:
        | [
            {
              opt: String_misc;
              title: String_misc;
              urlparam: String_misc;
              sizes:
                | {
                    default: String_misc;
                    font_size_14: String_misc;
                    font_size_18: String_misc;
                    font_size_22: String_misc;
                    font_size_26: String_misc;
                  }
                | null
                | undefined;
              paragraph: String_misc;
              p_class: String_misc;
              css_class: String_misc;
            }
          ]
        | null
        | undefined;
      active_class: String_misc;
      html_class: String_misc;
    }
  | null
  | undefined;
export type FontFamilyType =
  | {
      name: string | null | undefined;
      variants:
        | [
            {
              opt: string | null | undefined;
              title: string | null | undefined;
              urlparam: string | null | undefined;
              chg_citation: string | null | undefined;
              fonts:
                | {
                    default: string | null | undefined;
                    font1: string | null | undefined;
                    font2: string | null | undefined;
                    font3: string | null | undefined;
                  }
                | null
                | undefined;
              paragraph: string | null | undefined;
              p_class: string | null | undefined;
              css_class: string | null | undefined;
            }
          ]
        | null
        | undefined;
      active_class: string | null | undefined;
      html_class: string | null | undefined;
    }
  | null
  | undefined;
