import wwObject from './wwObjectSrc.vue'

const name = "ww-video";
const wwEnableMetrics = false;

const addComponent = function () {
    if (window.vm) {

        wwLib.wwObject.registerContentType(
            name,
            {
                type: name,
                data: {
                    provider: "local",
                    id: "https://wewebprod.s3-eu-west-1.amazonaws.com/designs/2/sections/7vR07WitdkyFFqzV39C1Hw6oMODecsvx.mp4",
                    loop: false,
                    controls: true,
                    muted: false,
                    autoplay: false,
                    showinfo: true,
                    preview: "https://wewebdev.s3-eu-west-1.amazonaws.com/designs/2/sections/oTDMqrEOtEET8pe0xz4rg5INkzgxQg3c.jpg",
                    alt: {
                        "fr_FR": "Une vidéo"
                    },
                    videoRatio: 16 / 9
                }
            },
            wwEnableMetrics
        );

        window.vm.addComponent(name, wwObject);

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