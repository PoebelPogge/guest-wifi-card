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
    name: "show wifi qr code",
    description: "Displays the QR Code of your guest wifi",
});
