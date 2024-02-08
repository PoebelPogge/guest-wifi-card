import css from "bundle-text:./card.css";
import html from "bundle-text:./card.html";

export class GuestWifiCard extends HTMLElement {

    doStyle() {
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = css;
    }

    doHtml() {
        const importBox = document.createElement("div");
        importBox.innerHTML = html;
        this._elements.card = importBox.firstElementChild;
    }
}