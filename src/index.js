import wwObject from './wwObjectSrc.vue'

const name = "ww-icon";
const wwEnableMetrics = true;

const addComponent = function () {
    if (window.vm) {
        window.vm.addComponent(name, wwObject);

        wwLib.wwObject.registerContentType(
            name,
            {
                type: name,
                data: {
                    icon: "fa fa-thumbs-o-up",
                    color: "#FFFFFF",
                    backgroundColor: "#039BE5",
                    borderColor: '',
                    classes: ["ww-class-img-format-round", "ww-class-font-size-medium", "ww-class-icon-size-xbig"]
                }
            },
            wwEnableMetrics
        );

        return true;
    }
    return false;
}

if (!addComponent()) {
    const iniInterval = setInterval(function () {
        if (addComponent()) {
            clearInterval(iniInterval);
        }
    }, 10);
}