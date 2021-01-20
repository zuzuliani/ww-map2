import wwHandleMarkers from './wwHandleMarkers.vue';
wwLib.wwPopups.addPopup('wwHandleMarkers', wwHandleMarkers);

import './stories';

export async function addMarkers(options) {
    try {
        return await wwLib.wwPopups.open({
            firstPage: 'WWMAP_MARKERS',
            data: {
                options,
            },
        });
    } catch (error) {
        return null;
    }
}
