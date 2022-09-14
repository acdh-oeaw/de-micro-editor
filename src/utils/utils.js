export function removeMarkup(html_class, css_class, color, hide, style) {
    var selected = document.querySelectorAll(`.${html_class}`);
    selected.forEach((el) => {
        if (typeof css_class === "object") {
            css_class.forEach((css) => {
                if (el.classList.contains(css)) {
                    el.classList.remove(css);
                } else {
                    el.classList.add(css);
                }
            });
        } else {
            el.classList.remove(css_class);
        }
        el.classList.remove(color);
        el.classList.add(style.css_class);
        if (hide) {
            el.style.display = "none";
        }
    });
    return String(selected.length);
};

export function addMarkup(html_class, css_class, color, hide, style) {
    var selected = document.querySelectorAll(`.${html_class}`);
    selected.forEach((el) => {
        if (typeof css_class === "object") {
            css_class.forEach((css) => {
                if (el.classList.contains(css)) {
                    el.classList.remove(css);
                } else {
                    el.classList.add(css);
                }
            });
        } else {
            el.classList.add(css_class);
        }
        el.classList.add(color);
        el.classList.add(style.css_class);
        if (hide) {
            el.style.display = "inline";
        }
    });
    return String(selected.length);
};