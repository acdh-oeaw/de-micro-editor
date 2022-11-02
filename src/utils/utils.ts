
// ## functions for accessing parsed class and adding or removing markup
// by adding or removing classes. classes should hold CSS stylsheets
// defined by the user separately.

export function removeMarkup(html_class: string, css_class: string | [], color: string, hide: boolean, style: {css_class: string}) {
    
    // find all provided classes
    var selected = document.querySelectorAll(`.${html_class}`);
    selected.forEach((el: any) => {

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
export function addMarkup(html_class: string, css_class: string | [], color: string, hide: boolean, style: {css_class: string}) {
    var selected = document.querySelectorAll(`.${html_class}`);
    selected.forEach((el: any) => {
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

export function uptState(options: {
    "hist": string,
    "cit": any,
    "state": boolean,
    "href": string
}) {

    if (options.hist) {
        // update url and state of history
        window.history.replaceState({}, '', options.href);
    } 
    
    if (options.state) {
        window.history.pushState(options.state, '', options.href);
    }

    if (options.cit) {
        options.cit.innerHTML =  `${location.hostname}${location.pathname}${options.href}`;
        options.cit.setAttribute("href", options.href);
    }

}

export function hideLoading(id: string) { 
    let spinnerID = "spinner_" + id;
    if ( document.getElementById(spinnerID) !== null ) {
        document.getElementById(spinnerID)!.remove();
    }
}

export function paramCheck(param: string | null | undefined, def: string | {}) {
    if(param) {
        return param;
    } else {
        return def;
    }
}