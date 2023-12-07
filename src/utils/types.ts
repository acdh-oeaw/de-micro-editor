export type AnnotationType = {
  title: string | null | undefined;
  variants:
    | [
        {
          opt: string | null | undefined;
          opt_slider: string | null | undefined;
          title: string | null | undefined;
          color: string | null | undefined;
          html_class: string | null | undefined;
          css_class: string | null | undefined;
          hide: {
            hidden: boolean;
            class: string;
          } | null;
          chg_citation: string | null | undefined;
          features: {
            all: boolean | null | undefined;
            class: string | null | undefined;
          } | null;
        }
      ]
    | null
    | undefined;
  span_element:
    | {
        css_class: string | null | undefined;
      }
    | null
    | undefined;
  active_class: string | null | undefined;
  rendered_element:
    | {
        label_class: string | null | undefined;
        slider_class: string | null | undefined;
      }
    | null
    | undefined;
};
