import { GuestWifiCard } from "./card";
import { GuestWifiCardEditor } from "./editor";

customElements.define(
    "guest-wifi-card",
    GuestWifiCard
);
customElements.define(
    "guest-wifi-card-editor",
    GuestWifiCardEditor
);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "guest-wifi-card",
    name: "toggle card created with a toolchain",
    description: "Turn an entity on and off",
});