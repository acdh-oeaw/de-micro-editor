const config = []

export class WindowResize extends HTMLElement {

    "use strict";

    static get observedAttributes() {
        return ["opt", "pos"];
    }

    connectedCallback() {
        this.render();
        this.childNodes[1].childNodes[1].addEventListener("mousedown", this.resize);
    }

    resize() {
        var isResizing = true;

        let id = this.getAttribute("id");
        let variant = config.find((v) => `${v.opt}-${v.pos}` === id);
        let container = document.getElementById(`container-resize-${variant["pos"]}`);
        let left_container = document.getElementById(`text-resize-${variant["pos"]}`);
        let right_container = document.getElementById(`img-resize-${variant["pos"]}`);
        let handle = document.getElementById(`${variant["opt"]}-${variant["pos"]}`);
        let viewer = document.getElementById(`viewer-${variant["pos"]}`).childNodes[0];
        let text = left_container.childNodes[0];

        document.addEventListener('mousemove', function (e) {
            // we don't want to do anything if we aren't resizing.
            if (!isResizing) 
                return;

            let offsetLeft = container.offsetWidth - (e.clientX);
            let offsetRight = container.offsetWidth - handle.value;
            let w = window.innerWidth;
            if (handle.value < ((w / 2) - 10)) {
                left_container.style.maxWidth = `${container.offsetWidth - offsetLeft}px`;
                right_container.style.maxWidth = `${offsetLeft}px`;
                viewer.style.width = `${offsetLeft}px`;
                viewer.style.height = `${offsetLeft}px`;
            } else if (handle.value > ((w / 2) + 10)) {
                left_container.style.maxWidth = `${handle.value}px`;
                text.style.width = `${handle.value}px`;
                right_container.style.maxWidth = `${offsetRight}px`;
                viewer.style.width = `${offsetRight}px`;
                viewer.style.height = `${offsetRight}px`;
            } else if (handle.value === ((w / 2) + 9) || handle.value === ((w / 2) - 9)) {
                left_container.style.maxWidth = '50%';
                text.style.width = '50%';
                right_container.style.maxWidth = '50%';
                viewer.style.width = `${right_container.offsetWidth}px`;
                viewer.style.height = `${right_container.offsetHeight}px`;
            }
            

        });

        document.addEventListener('mouseup', function () {
            // stop resizing
            isResizing = false;
        });
    }

    render() {
        let w = window.innerWidth;
        let opt = this.getAttribute("opt");
        let pos = this.getAttribute("pos");
        config.push({
            "opt": opt,
            "pos": pos
        });
        this.innerHTML = `
            <div class="expand-wrapper text-center hide-reading">
                <input title="change size" id="${opt}-${pos}" type="range" min="0" max="${w}" value="${w / 2}" class="slider"/>
            </div>
        `;
    }

}
