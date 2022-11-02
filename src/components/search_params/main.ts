const { addMarkup, removeMarkup, uptState, hideLoading, paramCheck } = require("../../utils/utils");
const OpenSeadragon = require("openseadragon");

export class UrlSearchParamUpdate {

    fullSreen() {

        // get custom element and access opt attribute
        let el = document.getElementsByTagName('full-size');
        let opt = el[0].getAttribute("opt");
        if (typeof opt !== "string") {
            
            console.log("No 'opt' attribute in custom element font-size found!");
        }

        // config name is predfined in index.ts
        let data = "fullsize";

        // get config by accessing sessions storage
        let storage: string | null = sessionStorage.getItem(data);

        if (storage) {

            var options: {
                name: string | null | undefined,
                variants: [{
                    opt: string | null | undefined,
                    title: string | null | undefined,
                    hide: string | null | undefined,
                    to_hide: string | null | undefined,
                    chg_citation: string | null | undefined,
                    urlparam: string | null | undefined
                }] | null,
                active_class: string | null | undefined,
                render_class: string | null | undefined,
                render_svg: string | null | undefined
            } | null | undefined = JSON.parse(storage);

            if (!options) {
                alert("Please turn on cookies to display content!");
            }

            // to manipulate url parameters construct url by getting current url
            let url: any = new URL(location.href);
            let urlParam: any = new URLSearchParams(url.search);

            // variant is found by comparing variant config opt with custom element attr opt
            try {
                var variant_check = options.variants.find((v) => v.opt === opt);
            } catch (err) {
                console.log("No option parameters found. Creating default parameters to continue.");
            }
            var variant = paramCheck(variant_check, {opt: opt});

            // if variant obj contains urlparam string check urlparams parameters
            var urlparam = paramCheck(variant.urlparam, "fullscreen");

            // check for option param or return default value
            var active = paramCheck(options.active_class, "active");

            var hide = paramCheck(variant.hide, "hide-container");

            var hidden = paramCheck(variant.to_hide, "fade");

            if (urlParam.get(urlparam) == null) {
                urlParam.set(urlparam, "off");
            }

            if (!["on", "off"].includes(urlParam.get(urlparam))) {
                console.log(`fullscreen=${urlParam.get(urlparam)} is not a selectable option.`);
                urlParam.set(urlparam, "off");
            }

            if (urlParam.get(urlparam) == "off") {
                document.querySelectorAll(`.${hide}`).forEach((el) => {
                    el.classList.remove(hidden);
                    let svg_show = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
                                            <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
                                        </svg>
                                    `;
                    let btn = document.getElementById(opt);
                    btn.innerHTML = svg_show;
                    btn.classList.remove(active);
                });
                
            }
            
            if (urlParam.get(urlparam) == "on") {
                document.querySelectorAll(`.${hide}`).forEach((el) => {
                    el.classList.add(hidden);
                    let svg_hide = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
                                            <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
                                        </svg>
                                    `;
                    let btn = document.getElementById(opt);
                    btn.innerHTML = svg_hide;
                    btn.classList.add(active);
                });
                
            }

            var citation_url_str = paramCheck(variant.chg_citation, "citation-url");
            var citation_url = document.getElementById(citation_url_str);
            let href = `?${urlParam}${location.hash}`;
            uptState({
                "hist": true,
                "cit": citation_url,
                "state": false,
                "href": href
            });
            
        }
    }

    fontSize() {
        // get element to access opt attribute
        // opt required to connect to specific custom element
        let el = document.getElementsByTagName('font-size');
        var id = el[0].getAttribute("opt");

        // check if user set opt attribute
        if (typeof id !== "string") {
            console.log("No 'opt' attribute in custom element font-size found!");
        }

        // string fontsize is variable to access session cookies
        let data = "fontsize";
        let storage: string | null = sessionStorage.getItem(data);

        if (storage) {

            // define options object and parse session cookie as json
            var options: {
                name: string | null | undefined,
                variants: [{
                    opt: string | null | undefined,
                    title: string  | null | undefined,
                    urlparam: string  | null | undefined,
                    sizes: {
                        default: string | null | undefined,
                        font_size_14: string  | null | undefined,
                        font_size_18: string | null | undefined,
                        font_size_22: string | null | undefined,
                        font_size_26: string | null | undefined
                    } | null | undefined,
                    paragraph: string | null | undefined,
                    p_class: string  | null | undefined,
                    css_class: string  | null | undefined
                }] | null | undefined,
                active_class: string | null | undefined,
                html_class: string  | null | undefined
            } |null | undefined = JSON.parse(storage);
        

            if (!options) {
                alert("Please turn on cookies to display content!");
            }

            // get url and urlparams to manipulate and update
            let url = new URL(location.href);
            let urlParam = new URLSearchParams(url.search);

            // variant is found by comparing variant config opt with custom element attr opt
            try {
                var variant_check = options.variants;
            } catch (err) {
                console.log("No option parameters found. Creating default parameters to continue.");
            }
            var variants = paramCheck(variant_check, [{opt: id}]);

            for (let v in variants) {

                // get urlparam key
                var urlparam = paramCheck(variants[v].urlparam, "fontsize");

                // get citation url key and HTMLElement
                var citation_url_str = paramCheck(variants[v].chg_citation, "citation-url");
                var citation_url = document.getElementById(citation_url_str);

                // define paragraph HTML element name
                let p_change = paramCheck(variants[v].paragraph, "p");
                // define class to change font sizes (not all paragraphs might need to be changed)
                let p_class = paramCheck(variants[v].p_class, "yes-index");

                // check if sizes object with font sizes is not null or undefined
                try {
                    var size_check = variants[v].sizes;
                } catch (err) {
                    console.log("Sizes obj not found. Creating default parameters.");
                }
                let size = paramCheck(size_check, {
                    default: "default",
                    font_size_14: "14",
                    font_size_18: "18",
                    font_size_22: "22",
                    font_size_26: "26"
                });

                // define font size name before size
                var css_class = paramCheck(variants[v].css_class, "font-size-");

                // check for null value in url params
                if (urlParam.get(urlparam) == null) {

                    urlParam.set(urlparam, "default");

                }

                // check if provides urlparam value is selectable
                if (!Object.values(size).includes(urlParam.get(urlparam))) {

                    console.log(`fontsize=${urlParam.get(urlparam)} is not a selectable option.`);
                    urlParam.set(urlparam, "default");

                } else {

                    // if valid urlparam is found change font sizes of paragraphs
                    let paragraph = document.querySelectorAll(`${p_change}.${p_class}`);
                    if (urlParam.get(urlparam) !== "default") {
                        var new_value = css_class + urlParam.get(urlparam);
                    } else {
                        var new_value = urlParam.get(urlparam);
                    }

                    // change select option value based on provided url param
                    var select = (document.getElementById(variants[v].opt) as HTMLSelectElement);
                    select.value = new_value;

                    // finally, changing selected paragraph font size
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

            // change browser history state
            let href = `?${urlParam}${location.hash}`;
            uptState({
                "hist": true,
                "cit": citation_url,
                "state": false,
                "href": href
            });
        }
        
    }

    fontFamily() {
        let el = document.getElementsByTagName('font-family');
        let id = el[0].getAttribute("opt");
        // check if user set opt attribute
        if (typeof id !== "string") {
            console.log("No 'opt' attribute in custom element font-family found!");
        }

        let data = "font_family";
        let storage = sessionStorage.getItem(data);

        if (storage) {

            let options: {
                name: string | null | undefined,
                variants: [
                    {
                        opt: string | null | undefined,
                        title: string | null | undefined,
                        urlparam: string | null | undefined,
                        chg_citation: string | null | undefined,
                        fonts: {
                            default: string | null | undefined,
                            font1: string | null | undefined,
                            font2: string | null | undefined,
                            font3: string | null | undefined,
                        } | null | undefined,
                        paragraph: string | null | undefined,
                        p_class: string | null | undefined,
                        css_class: string | null | undefined,
                    }
                ] | null | undefined,
                active_class: string | null | undefined,
                html_class: string | null | undefined,
            } | null | undefined = JSON.parse(storage);

            if (!options) {
                alert("Please turn on cookies to display content!")
            }

            let url = new URL(location.href);
            let urlParam = new URLSearchParams(url.search);

            // variant is found by comparing variant config opt with custom element attr opt
            try {
                var variant_check = options.variants;
            } catch (err) {
                console.log("No option parameters found. Creating default parameters to continue.");
            }
            var variants = paramCheck(variant_check, [{opt: id}]);

            for (let v in variants) {

                // get citation url key and HTMLElement
                var citation_url_str = paramCheck(variants[v].chg_citation, "citation-url");
                var citation_url = document.getElementById(citation_url_str);

                // get urlparam key
                var urlparam = paramCheck(variants[v].urlparam, "font");

                // get citation url key and HTMLElement
                var citation_url_str = paramCheck(variants[v].chg_citation, "citation-url");
                var citation_url = document.getElementById(citation_url_str);

                // define paragraph HTML element name
                let p_change = paramCheck(variants[v].paragraph, "p");
                // define class to change font sizes (not all paragraphs might need to be changed)
                let p_class = paramCheck(variants[v].p_class, "yes-index");

                // check if sizes object with font sizes is not null or undefined
                try {
                    var family_check = variants[v].fonts;
                } catch (err) {
                    console.log("Family ff obj not found. Creating default parameters.");
                }
                let family = paramCheck(family_check, {
                    default: "default",
                    font1: "Times-New-Roman",
                    font2: "Courier-New",
                    font3: "Arial-serif"
                });

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

                    // change select option value based on provided url param
                    var select = (document.getElementById(variants[v].opt) as HTMLSelectElement);
                    select.value = new_value;

                    // finally, change font-size of selected paragraphs
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

            // update browser history state
            let href = `?${urlParam}${location.hash}`;
            uptState({
                "hist": true,
                "cit": citation_url,
                "state": false,
                "href": href
            });
        }

    }

    // viewerSwitch() {

    //     let el = document.getElementsByTagName('image-switch');
    //     let data = "conf_image_switch";
    //     let opt = el[0].getAttribute("opt");
    //     let options = JSON.parse(sessionStorage.getItem(data));
    //     if (!options) {
    //         alert("Please turn on cookies to display content!")
    //     }
    //     let url = new URL(location.href);
    //     let urlParam = new URLSearchParams(url.search);

    //     // let opt = options
    //     let variant = options.variants.find((v) => v.opt === opt);
    //     let active = options.active_class;
    //     let hide = variant.hide.class_to_hide;
    //     let show = variant.hide.class_to_show;
    //     let parent = variant.hide.class_parent;
    //     let urlparam = variant.urlparam;
    //     let fade = variant.fade;
    //     let column_small = [variant.column_small["class"], variant.column_small["percent"]];
    //     let column_full = [variant.column_full["class"], variant.column_full["percent"]];
    //     if (urlParam.get(urlparam) == null) {
    //         urlParam.set(urlparam, "on");
    //     }
    //     if (!["on", "off"].includes(urlParam.get(urlparam))) {
    //         console.log(`image=${urlParam.get(urlparam)} is not a selectable option.`);
    //         urlParam.set(urlparam, "on");
    //     }
    //     if (urlParam.get(urlparam) == "on") {
    //         document.querySelectorAll(`.${hide}`).forEach((el) => {
    //             el.classList.remove(fade);
    //             el.classList.add(column_small[0]);
    //             el.style.maxWidth = column_small[1];
    //             el.classList.add(active);
    //         });
    //         document.querySelectorAll(`.${show}`).forEach((el) => {
    //             el.classList.add(column_small[0]);
    //             el.classList.remove(column_full[0]);
    //             el.style.maxWidth = column_small[1];
    //             el.classList.add(active);
    //         });
    //         document.getElementById(opt).classList.add(active); 
    //     }
    //     if (urlParam.get(urlparam) == "off") {
    //         document.querySelectorAll(`.${hide}`).forEach((el) => {
    //             el.classList.add(fade);
    //             el.classList.remove(column_small[0]);
    //             el.style.maxWidth = column_full[1];
    //             el.classList.remove(active);
    //         });
    //         document.querySelectorAll(`.${show}`).forEach((el) => {
    //             el.classList.remove(column_small[0]);
    //             el.classList.add(column_full[0]);
    //             el.style.maxWidth = column_full[1];
    //             el.classList.remove(active);
    //         });

    //         // works only with one image viewer
    //         const viewer = document.querySelector(`.${parent}.${active} .${hide}`);
    //         const facs = viewer.querySelectorAll("*")[0];
    //         facs.style.width = `${viewer.offsetWidth}px`;
    //         facs.style.height = variant.image_size;
    //         document.getElementById(opt).classList.remove(active); 
    //     }

    //     let citation_url = document.getElementById(variant.chg_citation);
    //     let href = `?${urlParam}${location.hash}`;
    //     uptState({
    //         "hist": true,
    //         "cit": citation_url,
    //         "state": false,
    //         "href": href
    //     });
        
    // }

    // textFeatures() {
    //     let data = "conf_annotation_slider";
    //     let options = JSON.parse(sessionStorage.getItem(data));
    //     if (!options) {
    //         alert(`Please turn on cookies to display content.\n
    //             Or check if configuration files path match data-target and data-path property.`)
    //     }
    //     let url = new URL(location.href);
    //     let urlParam = new URLSearchParams(url.search);
    //     var variantAll = options.variants.filter((v) => v.features.all === true);
    //     let variants = options.variants.filter((v) => v.features.all === false);
    //     let wrg_ft = options.variants.filter((v) => typeof v.features.all !== "boolean");
    //     if (wrg_ft) {
    //         for (let w of wrg_ft) {
    //             console.log(`Type of variant ${w.opt} config. "features.all" must be boolean (true or false)`);
    //         }
    //     }
    //     let style = options.span_element;
    //     let active = options.active_class;
    //     let count_active = 0;
    //     let count = 0;
    //     for (let v in variants) {
    //         if (urlParam.get(variants[v].opt) === null) {
    //             urlParam.set(variants[v].opt, "off");
    //         }
    //         else if (!["on", "off"].includes(urlParam.get(variants[v].opt))) {
    //             console.log(`${variants[v].opt}=${urlParam.get(variants[v].opt)} is not a selectable option.`);
    //             urlParam.set(variants[v].opt, "off");
    //         }
    //         else if (urlParam.get(variants[v].opt) === "on") {
    //             count_active += 1;
    //             let color = variants[v].color;
    //             let html_class = variants[v].html_class;
    //             let css_class = variants[v].css_class;
    //             let hide = variants[v].hide;
    //             let selected = addMarkup(html_class, css_class, color, hide, style);
    //             let slider = document.getElementById(variants[v].opt_slider);
    //             slider.setAttribute("data", selected);
    //             count += parseInt(selected);
    //             slider.classList.add("slider-number");
    //             slider.classList.add(color);
    //             if (document.getElementById(variants[v].opt).checked === false) {
    //                 document.getElementById(variants[v].opt).checked = true;
    //                 document.getElementById(variants[v].opt).classList.add(active);
    //             }
    //         }
    //         else if (urlParam.get(variants[v].opt) === "off") {
    //             let color = variants[v].color;
    //             let html_class = variants[v].html_class;
    //             let css_class = variants[v].css_class;
    //             let hide = variants[v].hide;
    //             let selected = removeMarkup(html_class, css_class, color, hide, style);
    //             let slider = document.getElementById(variants[v].opt_slider);
    //             slider.classList.remove(color);
    //             slider.removeAttribute("data");
    //             slider.classList.remove("slider-number");
    //             if (document.getElementById(variants[v].opt).checked === true) {
    //                 document.getElementById(variants[v].opt).checked = false;
    //                 document.getElementById(variants[v].opt).classList.remove(active);
    //             }
    //         }
    //         if (variants[v].chg_citation) {
    //             var citation_url = document.getElementById(variants[v].chg_citation);
    //         }
    //     }
    //     if (count_active == variants.length) {
    //         if (document.getElementById(variantAll[0].opt).checked === false) {
    //             let slider_all = document.getElementById(variantAll[0].opt);
    //             slider_all.checked = true;
    //             slider_all.classList.add(active);
    //             slider_all.classList.add("slider-number");
    //             slider_all.setAttribute("data", String(count));
    //         }
    //     } else {
    //         if (document.getElementById(variantAll[0].opt).checked === true) {
    //             let slider_all = document.getElementById(variantAll[0].opt);
    //             slider_all.checked = false;
    //             slider_all.classList.remove(active);
    //             slider_all.removeAttribute("data");
    //             slider_all.classList.remove("slider-number");
    //         }
    //     }
    //     let href = `?${urlParam}${location.hash}`;
    //     uptState({
    //         "hist": true,
    //         "cit": citation_url,
    //         "state": false,
    //         "href": href
    //     });
    // }

    // pageUrl() {

    //     // get session cookies as parameters
    //     let data = "conf_image_loader";
    //     let options = JSON.parse(sessionStorage.getItem(data));

    //     // get url params
    //     let url = new URL(location.href);
    //     let urlParam = new URLSearchParams(url.search);
    //     var _current = urlParam.get(options.urlparam);
    //     // const item = document.querySelector('.pagination .nav-tabs .nav-item .nav-link.active');
    //     // const href = item.getAttribute('href').replace('#', '');
    //     if (_current == null) {
    //         urlParam.set(options.urlparam, "1");
    //         _current = urlParam.get(options.urlparam);
    //     }

    //     // deactivate all tabs
    //     let tabs = document.querySelectorAll(`${options.pag_tab}[data-tab="paginate"]`);
    //     tabs.forEach(function(el) {
    //         el.classList.remove(options.active_class);
    //         el.classList.add(options.inactive_class);
    //     });

    //     // deactivate pagination linksshow metadata

    //     let link = document.querySelectorAll(`${options.pag_link}`);
    //     let pgOpt = [];
    //     link.forEach(function(el) {
    //         el.classList.remove(options.active_class);
    //         el.classList.remove(options.bootstrap_class);
    //         let el_id = el.getAttribute("id");
    //         if (el_id) {
    //             let idn = el_id.split('_');
    //             let idNo = idn[idn.length - 1];
    //             pgOpt.push(idNo);
    //         }
    //     });

    //     // check if page url param is valid
    //     if (!pgOpt.includes(_current)) {
    //         console.log(`${options.urlparam}=${_current} is not a selectable option.`);
    //         urlParam.set(options.urlparam, "1");
    //         _current = urlParam.get(options.urlparam);
    //     }

    //     // activate tab base on urlparams
    //     let tab = document.getElementById(`paginate-${_current}`);
    //     tab.classList.remove(options.inactive_class);
    //     tab.classList.add(options.active_class);
    //     tab.classList.add(options.bootstrap_class); 

    //     // get all nav tabs matching href tabs based on urlparams and set to active
    //     let linkActive = document.querySelectorAll(`${options.pag_link}[href="#paginate-${_current}"]`);
    //     linkActive.forEach(function(el) {
    //         el.classList.add(options.active_class);
    //         el.classList.add(options.bootstrap_class);
    //     });

    //     // create OSD container
    //     let i = 0;
    //     while (i < options.img_types.length) {
    //         if (document.getElementById(`${options.img_types[i]}_${options.osd_target}_${_current}`)) {
    //             var _image_type = options.img_types[i];
    //         }
    //         i++;
    //     }
    //     let _osd_container_id = `${_image_type}_${options.osd_target}_${_current}`;
    //     let _osd_container_id2 = `${_image_type}_${options.img_source}_${_current}`;
    //     let osd_container = document.getElementById(_osd_container_id);
    //     let osd_container_2 = document.getElementById(_osd_container_id2);
    //     if ( osd_container_2 ) {
    //         osd_container.style.height = options.img_size;
    //         let image = document.getElementById(`${_image_type}_img_${_current}`);
    //         let image_src = image.getAttribute('data-src');
    //         let image_url = {type: 'image', url: image_src};
    //         let viewer = OpenSeadragon({
    //             id: _osd_container_id,
    //             prefixUrl: 'https://cdnjs.cloudflare.com/ajax/libs/openseadragon/3.1.0/images/',
    //             tileSources: image_url
    //         });

    //         // hides static images
    //         osd_container_2.remove();
    
    //         // hide loading spinner if image fully loaded status changes
    //         // see issue: https://github.com/openseadragon/openseadragon/issues/1262
    //         viewer.addHandler('open', function() {
    //             let tiledImage = viewer.world.getItemAt(0);
    //             if (tiledImage.getFullyLoaded()) {
    //                 hideLoading(_osd_container_id);
    //             } else {
    //                 tiledImage.addOnceHandler('fully-loaded-change', function() {
    //                     let spinnerID2 = "spinner_" + _osd_container_id;
    //                     if ( document.getElementById(spinnerID2) ) {
    //                         document.getElementById(spinnerID2).remove();
    //                     }
    //                 });
    //             }
    //         });
    //     }

    //     // update state
    //     let citation_url = document.getElementById(options.chg_citation);
    //     let href = `?${urlParam}${location.hash}`;
    //     uptState({
    //         "hist": true,
    //         "cit": citation_url,
    //         "state": false,
    //         "href": href
    //     });

    // }

}