
import inputAfterHTML from "./templates/after.html";
import inputBeforeHTML from "./templates/before.html";
import inputLabel from "./templates/label.html";

const settings = {
    id: "input-last-name",
    type: "text",
    name: "lastname",
    beforeHtml: {
        html: inputBeforeHTML,
        classes: "custom-before-html"
    },
    afterHtml: {
        html: inputAfterHTML,
        classes: "custom-after-html"
    },
    labelHTML: inputLabel,
    input: {},
    container: {},
    attributes: {
        required: true
    },
    settings: {
        width: "1/2"
    },
    errors: {}
}

export default settings;