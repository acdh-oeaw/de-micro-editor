const { addMarkup, removeMarkup } = require("../../utils/utils");
const OpenSeadragon = require("openseadragon");

export class UrlSearchParamUpdate {

    fullSreen() {
        let el = document.getElementsByTagName('full-size');
        let data = "conf_fullsize";
        let opt = el[0].getAttribute("opt");
        let options = JSON.parse(localStorage.getItem(data));
        if (!options) {
            alert("Please turn on cookies to display content!")
        }
        let url = new URL(window.location.href);
        let urlParam = new URLSearchParams(url.search);
        let variant = options.variants.find((v) => v.opt === opt);
        let hide = variant.hide.class_to_hide;
        let urlparam = variant.urlparam;
        let citation_url = document.getElementById(variant.chg_citation);
        let svg_show = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
                <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
            </svg>
        `;
        let svg_hide = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
            </svg>
        `;
        if (urlParam.get(urlparam) == null) {
            urlParam.set(urlparam, "off");
        }
        if (!["on", "off"].includes(urlParam.get(urlparam))) {
            console.log(`fullscreen=${urlParam.get(urlparam)} is not a selectable option.`);
            urlParam.set(urlparam, "off");
        }
        if (urlParam.get(urlparam) == "off") {
            document.querySelectorAll(`.${hide}`).forEach((el) => {
                el.classList.remove("fade");
                options.rendered_element.svg = svg_show;
            });
        }
        if (urlParam.get(urlparam) == "on") {
            document.querySelectorAll(`.${hide}`).forEach((el) => {
                el.classList.add("fade");
                options.rendered_element.svg = svg_hide;
            });
        }
        window.history.replaceState({}, '', `${location.pathname}?${urlParam}`);
        citation_url.innerHTML = `${location.hostname}${location.pathname}?${urlParam}`;
        citation_url.setAttribute("href", window.location.href);
    }

    fontSize() {
        let el = document.getElementsByTagName('font-size');
        let data = "conf_fontsize";
        let options = JSON.parse(localStorage.getItem(data));
        if (!options) {
            alert("Please turn on cookies to display content!")
        }
        let url = new URL(window.location.href);
        let urlParam = new URLSearchParams(url.search);
        let variants = options.variants;
        for (let v in variants) {
            let select = document.getElementById(variants[v].opt);
            let urlparam = variants[v].urlparam;
            var citation_url = document.getElementById(variants[v].chg_citation);
            let p_change = variants[v].paragraph;
            let p_class = variants[v].p_class;
            let size = variants[v].sizes;
            var css_class = variants[v].css_class;
            if (urlParam.get(urlparam) == null) {
                urlParam.set(urlparam, "default");
            }
            if (!Object.values(size).includes(urlParam.get(urlparam))) {
                console.log(`fontsize=${urlParam.get(urlparam)} is not a selectable option.`);
                urlParam.set(urlparam, "default");
            } else {
                let paragraph = document.querySelectorAll(`${p_change}.${p_class}`);
                if (urlParam.get(urlparam) !== "default") {
                    var new_value = css_class + urlParam.get(urlparam);
                } else {
                    var new_value = urlParam.get(urlparam);
                }
                select.value = new_value;
                paragraph.forEach((el) => {
                    for (let s in size) {
                        if (size[s] !== "default") {
                            el.classList.remove(css_class + size[s]);   
                        } 
                    }
                    if(new_value !== "default") {
                        el.classList.add(new_value);
                    }
                });
                
            } 
        }
        window.history.replaceState({}, '', `${location.pathname}?${urlParam}`);
        citation_url.innerHTML = `${location.hostname}${location.pathname}?${urlParam}`;
        citation_url.setAttribute("href", window.location.href);
    }

    fontFamily() {
        let el = document.getElementsByTagName('font-family');
        let data = "conf_font_family";
        let options = JSON.parse(localStorage.getItem(data));
        if (!options) {
            alert("Please turn on cookies to display content!")
        }
        let url = new URL(window.location.href);
        let urlParam = new URLSearchParams(url.search);
        let variants = options.variants;
        for (let v in variants) {
            let select = document.getElementById(variants[v].opt);
            var citation_url = document.getElementById(variants[v].chg_citation);
            let urlparam = variants[v].urlparam;
            let p_change = variants[v].paragraph;
            let p_class = variants[v].p_class;
            let family = variants[v].fonts;
            if (urlParam.get(urlparam) == null) {
                urlParam.set(urlparam, "default");
            }
            if (!Object.values(family).includes(urlParam.get(urlparam))) {
                console.log(`font=${urlParam.get(urlparam)} is not a selectable option.`);
                urlParam.set(urlparam, "default");
            } else {
                let paragraph = document.querySelectorAll(`${p_change}.${p_class}`);
                if (urlParam.get(urlparam) !== "default") {
                    var new_value = urlParam.get(urlparam);
                } else {
                    var new_value = urlParam.get(urlparam);
                }
                select.value = new_value;
                paragraph.forEach((el) => {
                    for (let f in family) {
                        if (family[f] !== "default") {
                            el.classList.remove(family[f].toLowerCase());   
                        } 
                    }
                    if(new_value !== "default") {
                        el.classList.add(new_value.toLowerCase());
                    }
                });
                
            } 
        }
        window.history.replaceState({}, '', `${location.pathname}?${urlParam}`);
        citation_url.innerHTML = `${location.hostname}${location.pathname}?${urlParam}`;
        citation_url.setAttribute("href", window.location.href);
    }

    viewerSwitch() {
        let el = document.getElementsByTagName('image-switch');
        let data = "conf_image_switch";
        let opt = el[0].getAttribute("opt");
        let options = JSON.parse(localStorage.getItem(data));
        if (!options) {
            alert("Please turn on cookies to display content!")
        }
        let url = new URL(window.location.href);
        let urlParam = new URLSearchParams(url.search);
        // let opt = options
        let variant = options.variants.find((v) => v.opt === opt);
        let active = options.active_class;
        let hide = variant.hide.class_to_hide;
        let show = variant.hide.class_to_show;
        let parent = variant.hide.class_parent;
        let urlparam = variant.urlparam;
        let citation_url = document.getElementById(variant.chg_citation);
        if (urlParam.get(urlparam) == null) {
            urlParam.set(urlparam, "on");
        }
        if (!["on", "off"].includes(urlParam.get(urlparam))) {
            console.log(`image=${urlParam.get(urlparam)} is not a selectable option.`);
            urlParam.set(urlparam, "on");
        }
        if (urlParam.get(urlparam) == "on") {
            document.querySelectorAll(`.${hide}`).forEach((el) => {
                el.classList.remove("fade");
                el.classList.add("col-md-6");
                el.style.maxWidth = "50%";
                el.classList.add(active);
            });
            document.querySelectorAll(`.${show}`).forEach((el) => {
                el.classList.add("col-md-6");
                el.classList.remove("col-md-12");
                el.style.maxWidth = "50%";
                el.classList.add(active);
            });
        }
        if (urlParam.get(urlparam) == "off") {
            document.querySelectorAll(`.${hide}`).forEach((el) => {
                el.classList.add("fade");
                el.classList.remove("col-md-6");
                el.style.maxWidth = "100%";
                el.classList.remove(active);
            });
            document.querySelectorAll(`.${show}`).forEach((el) => {
                el.classList.remove("col-md-6");
                el.classList.add("col-md-12");
                el.style.maxWidth = "100%";
                el.classList.remove(active);
            });
            // works only with one image viewer
            const viewer = document.querySelector(`.${parent}.${active} .${hide}`);
            const facs = viewer.querySelectorAll("*")[0];
            facs.style.width = `${viewer.offsetWidth}px`;
            facs.style.height = `${viewer.offsetHeight}px`;
        }
        window.history.replaceState({}, '', `${location.pathname}?${urlParam}`);
        citation_url.innerHTML = `${location.hostname}${location.pathname}?${urlParam}`;
        citation_url.setAttribute("href", window.location.href);
    }

    textFeatures() {
        let data = "conf_annotation_slider";
        let options = JSON.parse(localStorage.getItem(data));
        if (!options) {
            alert(`Please turn on cookies to display content.\n
                Or check if configuration files path match data-target and data-path property.`)
        }
        let url = new URL(window.location.href);
        let urlParam = new URLSearchParams(url.search);
        var variantAll = options.variants.filter((v) => v.features.all === true);
        let variants = options.variants.filter((v) => v.features.all === false);
        let wrg_ft = options.variants.filter((v) => typeof v.features.all !== "boolean");
        if (wrg_ft) {
            for (let w of wrg_ft) {
                console.log(`Type of variant ${w.opt} config. "features.all" must be boolean (true or false)`);
            }
        }
        let style = options.span_element;
        let active = options.active_class;
        let count_active = 0;
        for (let v in variants) {
            if (urlParam.get(variants[v].opt) === null) {
                urlParam.set(variants[v].opt, "off");
            }
            else if (!["on", "off"].includes(urlParam.get(variants[v].opt))) {
                console.log(`${variants[v].opt}=${urlParam.get(variants[v].opt)} is not a selectable option.`);
                urlParam.set(variants[v].opt, "off");
            }
            else if (urlParam.get(variants[v].opt) === "off") {
                const color = variants[v].color;
                const html_class = variants[v].html_class;
                const css_class = variants[v].css_class;
                const hide = variants[v].hide;
                removeMarkup(html_class, css_class, color, hide, style);
                const slider = document.getElementById(variants[v].opt_slider);
                slider.classList.remove(color);
                if (document.getElementById(variants[v].opt).checked === true) {
                    document.getElementById(variants[v].opt).checked = false;
                    document.getElementById(variants[v].opt).classList.remove(active);
                }
            }
            else if (urlParam.get(variants[v].opt) === "on") {
                count_active += 1;
                let color = variants[v].color;
                let html_class = variants[v].html_class;
                let css_class = variants[v].css_class;
                let hide = variants[v].hide;
                addMarkup(html_class, css_class, color, hide, style);
                let slider = document.getElementById(variants[v].opt_slider);
                slider.classList.add(color);
                if (document.getElementById(variants[v].opt).checked === false) {
                    document.getElementById(variants[v].opt).checked = true;
                    document.getElementById(variants[v].opt).classList.add(active);
                }
            }
            if (variants[v].chg_citation) {
                var citation_url = document.getElementById(variants[v].chg_citation);
            }
            if (count_active === variants.length) {
                if (document.getElementById(variantAll[0].opt).checked === false) {
                    document.getElementById(variantAll[0].opt).checked = true;
                    document.getElementById(variantAll[0].opt).classList.add(active);
                }
            };
        }
        window.history.replaceState({}, '', `${location.pathname}?${urlParam}`);
        if (citation_url) {
            citation_url.innerHTML = `${location.hostname}${location.pathname}?${urlParam}`;
            citation_url.setAttribute("href", window.location.href);
        }
    }

    pageUrl() {
        const url = new URL(window.location.href);
        const urlParam = new URLSearchParams(url.search);
        const _current = urlParam.get('page');
        // const item = document.querySelector('.pagination .nav-tabs .nav-item .nav-link.active');
        // const href = item.getAttribute('href').replace('#', '');
        const citation_url = document.getElementById("citation-url");
        if (_current == null) {
            urlParam.set('page', "1");
        } else {
            // deactivate all tabs
            let tabs = document.querySelectorAll(`.pagination-tab.tab-pane[data-tab="paginate"]`);
            tabs.forEach(function(el) {
                el.classList.remove('active');
                el.classList.add('fade');
            });
            // activate tab base on urlparams
            const tab = document.getElementById(`paginate-${_current}`);
            tab.classList.remove('fade');
            tab.classList.add('active');
            tab.classList.add('show');
            // deactivate pagination links
            const link = document.querySelectorAll('.pagination .nav-tabs .nav-item .nav-link');
            link.forEach(function(el) {
                el.classList.remove('active');
                el.classList.remove('show');
            });
            // get all nav tabs matching href tabs based on urlparams and set to active
            let linkActive = document.querySelectorAll(`.pagination .nav-tabs li a[href="#paginate-${_current}"]`);
            linkActive.forEach(function(el) {
                el.classList.add('active');
                el.classList.add('show');
            });
            // create OSD container
            let _container_id = `envelope_container_${_current}`
            let _container = document.getElementById(_container_id);
            let _image_type = "";
            if (_container) {
                _image_type = "envelope";
            } else {
                _image_type = "sheet";
            }
            let _osd_container_id = `${_image_type}_container_${_current}`;
            let _osd_container_id2 = `${_image_type}_container2_${_current}`;
            let osd_container = document.getElementById(_osd_container_id);
            let osd_container_2 = document.getElementById(_osd_container_id2);
            if ( osd_container_2 ) {
                osd_container.style.height = "1000px";
                let image = document.getElementById(`${_image_type}_img_${_current}`);
                let image_src = image.getAttribute('src');
                let image_url = {type: 'image', url: image_src};
                let viewer = OpenSeadragon({
                    id: _osd_container_id,
                    prefixUrl: 'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/3.1.0/images/',
                    tileSources: image_url
                });
                // hides static images
                osd_container_2.remove();
        
                // hide loading spinner if image fully loaded status changes
                // see issue: https://github.com/openseadragon/openseadragon/issues/1262
                viewer.addHandler('open', function() {
                    let tiledImage = viewer.world.getItemAt(0);
                    if (tiledImage.getFullyLoaded()) {
                        hideLoading(_osd_container_id);
                    } else {
                        tiledImage.addOnceHandler('fully-loaded-change', function() {
                            let spinnerID2 = "spinner_" + _osd_container_id;
                            if ( document.getElementById(spinnerID2) ) {
                                document.getElementById(spinnerID2).remove();
                            }
                        });
                    }
                });
            }
        }
        window.history.replaceState({}, '', `?${urlParam}`);
        citation_url.innerHTML = `${location.hostname}${location.pathname}?${urlParam}`;
        citation_url.setAttribute("href", window.location.href);
    
        function hideLoading(id) { 
            let spinnerID2 = "spinner_" + id;
            if ( document.getElementById(spinnerID2) ) {
                document.getElementById(spinnerID2).remove();
            }
        }
    }

}