import plumber from "../assets/plumber.svg";
import painter from "../assets/painter.svg";
import repair from "../assets/repair.svg";
import cleaning from "../assets/cleaning.svg";
import carpenter from "../assets/carpenter.svg";
import electrician from "../assets/electrician.svg";
import labour from "../assets/labour.svg";

const types = [
    "Painter",
    "Electrician",
    "Plumber",
    "Cleaning",
    "Carpenter",
    "Appliance Repair",
];
const images = {
    Painter: painter,
    Electrician: electrician,
    Plumber: plumber,
    Cleaning: cleaning,
    Carpenter: carpenter,
    "Manual Labour": labour,
    "Appliance Repair": repair,
};
const emojis = {
    Painter: "🎨",
    Electrician: "🔌",
    Plumber: "👨‍🔧",
    Cleaning: "🧹",
    Carpenter: "🔨",
    "Manual Labour": "⚒️",
    "Appliance Repair": "🔧",
};
export { types, emojis, images };