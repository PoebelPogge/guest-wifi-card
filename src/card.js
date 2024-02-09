import html from "bundle-text:./card.html";
import css from "bundle-text:./card.css";

import QRCode from "qrcode";



export class GuestWifiCard extends HTMLElement {
    // private properties
    _config;
    _hass;
    _elements = {};


    // lifecycle
    constructor() {
        super();
        this.doHtml();
        this.doStyle();
        this.doAttach();
        this.doQueryElements();
        this.doListen();
    }

    setConfig(config) {
        this._config = config;
        this.doCheckConfig();
        this.doUpdateConfig();
    }

    set hass(hass) {
        this._hass = hass;
        this.doUpdateHass();
    }

    onClicked() {
        this.doToggle();
    }

    // accessors
    isOff() {
        return this.getState().state === "off";
    }

    isOn() {
        return this.getState().state === "on";
    }

    getHeader() {
        return this._config.header;
    }

    getSSID() {
        return this._config.ssid;
    }

    getEntityID() {
        return this._config.entity;
    }

    getState() {
        return this._hass.states[this.getEntityID()];
    }

    getAttributes() {
        return this.getState().attributes;
    }

    getName() {
        const friendlyName = this.getAttributes().friendly_name;
        return friendlyName ? friendlyName : this.getEntityID();
    }

    // jobs
    doCheckConfig() {
        if (!this._config.entity) {
            throw new Error("Please define an entity!");
        }
    }

    doHtml() {
        const importBox = document.createElement("div");
        importBox.innerHTML = html;
        this._elements.card = importBox.firstElementChild;
    }

    doStyle() {
        this._elements.style = document.createElement("style");
        this._elements.style.textContent = css;
    }

    doAttach() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(this._elements.style, this._elements.card);
    }

    doQueryElements() {
        const card = this._elements.card;
        this._elements.error = card.querySelector(".error");
        this._elements.dl = card.querySelector(".dl");
        this._elements.topic = card.querySelector(".dt");
    }

    doListen() {
        this._elements.dl.addEventListener(
            "click",
            this.onClicked.bind(this),
            false
        );
    }

    doUpdateConfig() {
        if (this.getHeader()) {
            this._elements.card.setAttribute("header", this.getHeader());
        } else {
            this._elements.card.removeAttribute("header");
        }
    }

    doUpdateHass() {
        if (!this.getState()) {
            this._elements.error.textContent = `${this.getEntityID()} is unavailable.`;
            this._elements.error.classList.remove("hidden");
            this._elements.dl.classList.add("hidden");
        } else {
            this._elements.error.textContent = "";
            this._elements.topic.textContent = this.getName();
            this._elements.error.classList.add("hidden");
            this._elements.dl.classList.remove("hidden");
        }

        var canvas = this._elements.card.querySelector('#canvas');
        var ssid = this.getSSID();

        console.log("SSID: " + ssid);

        if (canvas) {
            var content = `WIFI:S:${ssid};T:WPA;P:#####;;`;
            QRCode.toCanvas(canvas, content, function (error) {
                if (error) console.error(error)
                console.log('success!');
            });
        }
    }

    doToggle() {
/*         this._hass.callService("input_boolean", "toggle", {
            entity_id: this.getEntityID(),
        }); */
    }

    // card configuration
    static getConfigElement() {
        return document.createElement("guest-wifi-card-editor");
    }

    static getStubConfig() {
        return {
            entity: "input_boolean.tcwt",
            header: "",
        };
    }
}
