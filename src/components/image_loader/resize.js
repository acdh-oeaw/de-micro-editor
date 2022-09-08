var config = {}

export class WindowResize extends HTMLElement {

    "use strict";

    static get observedAttributes() {
        return ["opt", "pos"];
    }

    connectedCallback() {
        this.render();
    }

    resize() {
        let isResizing = false,
        lastDownX = 0;


        let container = document.querySelectorAll(`#container-resize-${position}`),
            left_container = document.querySelectorAll(`#text-resize-${position}`),
            right_container = document.querySelectorAll(`#img-resize-${position}`),
            handle = document.querySelectorAll(`#img-expand-${position}`),
            viewer = document.querySelectorAll(`#viewer-${position}`).children('div'),
            text = document.querySelectorAll(left_container).children('div');
        
        handle.addEventListener('mousedown', function (e) {
            isResizing = true;
            lastDownX = e.clientX;
        });

        document.addEventListener('mousemove', function (e) {
            // we don't want to do anything if we aren't resizing.
            if (!isResizing) 
                return;
            
            let offsetLeft = container.width() - (e.clientX + container.offset().left);
            let offsetRight = container.width() - handle.val();

            if (handle.val() < 936) {
                left_container.css('max-width', `${container.width() - offsetLeft}px`);
                right_container.css('max-width', `${offsetLeft}px`);
                viewer.style.width = `${offsetLeft}px`;
                viewer.style.height = `${offsetLeft}px`;
            } else if (handle.val() > 936) {
                left_container.style.width = `${handle.val()}px`;
                text.style.width = `${handle.val()}px`;
                right_container.style.width = `${offsetRight}px`;
                viewer.style.width = `${offsetRight}px`;
                viewer.style.height = `${offsetRight}px`;
            } else if (handle.val() === 936) {
                left_container.css('max-width', '50%');
                text.css('width', '50%');
                right_container.css('max-width', '50%');
                viewer.style.width = `${right_container.offsetWidth}px`;
                viewer.style.height = `${right_container.offsetHeight}px`;
            }
            

            }).addEventListener('mouseup', function () {
                // stop resizing
                isResizing = false;
            });
    }

    render() {
        let data = "conf_image_loader";
        let options = JSON.parse(sessionStorage.getItem(data));
        let pos = this.getAttribute("pos");
        this.innerHTML = `
            <div class="expand-wrapper text-center hide-reading">            
                <input title="change size" id="img-expand-${pos}" type="range" min="1" max="1870" value="936" class="slider"/>
            </div>
        `;
    }

}
