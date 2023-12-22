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
