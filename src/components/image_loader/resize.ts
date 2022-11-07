const config: any = []

export class WindowResize extends HTMLElement {

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
        let variant = config.find((v: any) => `${v.opt}-${v.pos}` === id);

        let container = (document.getElementById(`container-resize-${variant.pos}`) as HTMLElement);
        let left_container = (document.getElementById(`text-resize-${variant.pos}`) as HTMLElement);
        let right_container = (document.getElementById(`img-resize-${variant.pos}`) as HTMLElement);
        let handle = (document.getElementById(`${variant.opt}-${variant.pos}`) as HTMLInputElement);
        let viewer = (document.getElementById(`viewer-${variant.pos}`).childNodes[0] as HTMLElement);
        let text = (left_container.childNodes[0] as HTMLElement);

        document.addEventListener('mousemove', function (e) {
            // we don't want to do anything if we aren't resizing.
            if (!isResizing) 
                return;

            let value: number | string = handle.value;

            let offsetLeft = container.offsetWidth - (e.clientX);
            let offsetRight = container.offsetWidth - parseInt(value);
            let w = window.innerWidth;

            if (parseInt(value) < ((w / 2) - 10)) {

                left_container.style.maxWidth = `${container.offsetWidth - offsetLeft}px`;
                right_container.style.maxWidth = `${offsetLeft}px`;
                viewer.style.width = `${offsetLeft}px`;
                viewer.style.height = `${offsetLeft}px`;

            } else if (parseInt(value) > ((w / 2) + 10)) {

                left_container.style.maxWidth = `${value}px`;
                text.style.width = `${value}px`;
                right_container.style.maxWidth = `${offsetRight}px`;
                viewer.style.width = `${offsetRight}px`;
                viewer.style.height = `${offsetRight}px`;

            } else if (parseInt(value) === ((w / 2) + 9) || parseInt(value) === ((w / 2) - 9)) {

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
        // check if user set opt attribute
        if (typeof opt !== "string") {
            console
            .log("No 'opt' attribute in custom element font-family found!");
        }
        let pos = this.getAttribute("pos");
        // check if user set opt attribute
        if (typeof pos !== "string") {
            console.log("No 'pos' attribute in custom element font-family found!");
        }

        config.push({
            opt: opt,
            pos: pos
        });

        this.innerHTML = `
            <div class="expand-wrapper text-center hide-reading">
                <input title="change size" id="${opt}-${pos}" type="range" min="0" max="${w}" value="${w / 2}" class="slider"/>
            </div>
        `;
    }

}
