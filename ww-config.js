export default {
    "options": {
        "sizable": true
    },
    "editor": {
        "label": {
            "fr": "Map",
            "en": "Map"
        },
        icon: 'tracking'
    },
    properties: {
        "mapStyle": {
            "label": {
                "en": "Map style",
                "fr": "Style de la map"
            },
            "type": "TextSelect",
            "options": {
                "options": [
                    { "value": null, "label": "Standard" },
                    { "value": "silver", "label": "Silver" },
                    { "value": "retro", "label": "Retro" },
                    { "value": "dark", "label": "Dark" },
                    { "value": "night", "label": "Night" },
                    { "value": "aubergine", "label": "Aubergine" }
                ]
            },
            defaultValue: 'dark',
        },
        "defaultMapType": {
            "label": {
                "en": "Map type",
                "fr": "Type de map"
            },
            "type": "TextSelect",
            "options": {
                "options": [
                    { "value": "roadmap", "label": "Standard" },
                    { "value": "satellite", "label": "Satellite" },
                    { "value": "hybrid", "label": "Hybrid" },
                    { "value": "terrain", "label": "Terrain" },
                ]
            },
            defaultValue: 'roadmap',
        },
        "googleKey": {
            section: 'settings',
            "label": { "en": "Google key", "fr": "Clé Google" },
            "type": "Text",
            "options": {
                "placeholder": "Google API key"
            },
            defaultValue: '',
        },
        "lat": {
            section: 'settings',
            "label": { "en": "Latitude origin", "fr": "Origine - Latitude" },
            "type": "Text",
            "options": {
                "placeholder": "Latitude"
            },
            defaultValue: '48.859923',
        },
        "lng": {
            section: 'settings',
            "label": { "en": "Longitude origin", "fr": "Origine - Longitude" },
            "type": "Text",
            "options": {
                "placeholder": "Longitude"
            },
            defaultValue: '2.344065',
        },
        "zoom": {
            section: 'settings',
            "type": "Number",
            "label": { "en": "Zoom", "fr": "Zoom" },
            "options": {
                "min": 0,
                "max": 20,
                "step": 1
            },
            defaultValue: 15,
        },
        "addMarker": {
            "type": "Button",
            section: 'settings',
            editorOnly: true,
            "options": {
                "text": { "en": "Markers", "fr": "Marqueurs" },
                "color": "blue",
                "action": "openMarkersPopup"
            },
        },
        mapsRand: {
            hidden: true,
            defaultValue: Math.floor(Math.random() * 1000000000),
        },
        markers: {
            hidden: true,
            defaultValue: [
                {
                    name: 'Paris',
                    lat: '48.859923',
                    lng: '2.344065',
                    isActive: true,
                },
            ],
        }
    }
}
