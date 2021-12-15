export default {
    options: {
        sizable: true,
    },
    editor: {
        label: {
            fr: 'Map',
            en: 'Map',
        },
        icon: 'tracking',
    },
    properties: {
        defaultMapType: {
            label: {
                en: 'Map type',
                fr: 'Type de map',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'roadmap', label: 'Standard' },
                    { value: 'satellite', label: 'Satellite' },
                    { value: 'hybrid', label: 'Hybrid' },
                    { value: 'terrain', label: 'Terrain' },
                ],
            },
            defaultValue: 'roadmap',
        },
        mapStyle: {
            hidden: content => content.defaultMapType === 'satellite',
            label: {
                en: 'Map style',
                fr: 'Style de la map',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: null, label: 'Standard' },
                    { value: 'silver', label: 'Silver' },
                    { value: 'retro', label: 'Retro' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'night', label: 'Night' },
                    { value: 'aubergine', label: 'Aubergine' },
                ],
            },
            defaultValue: 'dark',
        },
        googleKey: {
            section: 'settings',
            label: { en: 'Google key', fr: 'Clé Google' },
            type: 'Text',
            options: {
                placeholder: 'Google API key',
            },
            defaultValue: 'AIzaSyCtcuLlu2_7aP1ZCUI6kAVZY8K4KMJ-BJA',
        },
        lat: {
            section: 'settings',
            label: { en: 'Latitude origin', fr: 'Origine - Latitude' },
            type: 'Text',
            options: {
                placeholder: 'Latitude',
            },
            defaultValue: '48.859923',
            bindable: true,
        },
        lng: {
            section: 'settings',
            label: { en: 'Longitude origin', fr: 'Origine - Longitude' },
            type: 'Text',
            options: {
                placeholder: 'Longitude',
            },
            defaultValue: '2.344065',
            bindable: true,
        },
        zoom: {
            section: 'settings',
            type: 'Number',
            label: { en: 'Zoom', fr: 'Zoom' },
            options: {
                min: 0,
                max: 20,
                step: 1,
            },
            defaultValue: 15,
            bindable: true,
        },
        markers: {
            label: { en: 'Markers', fr: 'Markers' },
            bindable: true,
            type: 'Array',
            options: {
                item: {
                    type: 'Object',
                    options: {
                        item: {
                            name: {
                                label: { en: 'Name' },
                                type: 'Text',
                                options: { placeholder: 'Value' },
                            },
                            lat: {
                                label: { en: 'Latitude' },
                                type: 'Text',
                                options: { placeholder: 'Latitude' },
                            },
                            lng: {
                                label: { en: 'Longitude' },
                                type: 'Text',
                                options: { placeholder: 'Longitude' },
                            },
                        },
                    },
                },
            },
            defaultValue: [
                {
                    name: 'Paris',
                    lat: '48.859923',
                    lng: '2.344065',
                    isActive: true,
                },
            ],
        },
        zoomControl: {
            label: { en: 'Zoom control', fr: 'Zoom control' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
        },
        scaleControl: {
            label: { en: 'Scale control', fr: 'Scale control' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
        },
        rotateControl: {
            label: { en: 'Rotate control', fr: 'Rotate control' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
        },
        streetViewControl: {
            label: { en: 'Street View control', fr: 'Street View control' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
        },
        fullscreenControl: {
            label: { en: 'Fullscreen control', fr: 'Fullscreen control' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
        },
        mapTypeControl: {
            label: { en: 'Map Type control', fr: 'Map Type control' },
            type: 'OnOff',
            section: 'settings',
            defaultValue: true,
        },
        mapsRand: {
            hidden: true,
            defaultValue: Math.floor(Math.random() * 1000000000),
        },
    },
};
