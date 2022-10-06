
// ## functions for accessing parsed class and adding or removing markup
// by adding or removing classes. classes should hold CSS stylsheets
// defined by the user separately.

export function removeMarkup(html_class, css_class, color, hide, style) {
    
    // find all provided classes
    var selected = document.querySelectorAll(`.${html_class}`);
    selected.forEach((el) => {

        // in case classes come as object of two classes
        // one of the classes must be part in HTML dom
        // if one is present it is removed and another class added
        // lets you control CSS styles
        if (typeof css_class === "object") {
            css_class.forEach((css) => {
                if (el.classList.contains(css)) {
                    el.classList.remove(css);
                } else {
                    el.classList.add(css);
                }
            });
        
        // if classes are a simple string
        // removes additional class
        } else {
            el.classList.remove(css_class);
        }

        // removes color class
        el.classList.remove(color);

        // adds additional class for element styling
        el.classList.add(style.css_class);

        // if hide is true it sets display to none
        if (hide) {
            el.style.display = "none";
        }
    });

    // returns number of nodes found as string
    return String(selected.length);
};

// same logic as above but for adding classes
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

export function uptState(hist, cit, state, href) {

    if (hist) {
        // update url and state of history
        window.history.replaceState({}, '', href);
        console.log("hist");
        console.log(window.history);
        console.log(location.href);
    } 
    
    if (state) {
        window.history.pushState(state, '', href);
        console.log("state");
        console.log(state);
        console.log(window.history);
    }

    if (cit) {
        // update citations url with current url
        cit.innerHTML = href;
        cit.setAttribute("href", href);
        console.log("cit");
        console.log(cit.innerHTML);
        console.log(href);
    }

}

export function hideLoading(id) { 
    let spinnerID2 = "spinner_" + id;
    if ( document.getElementById(spinnerID2) ) {
        document.getElementById(spinnerID2).remove();
    }
}