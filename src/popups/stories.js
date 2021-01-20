wwLib.wwPopups.addStory('WWMAP_MARKERS', {
    title: {
        en: 'Edit markers',
        fr: 'Editer les marqueurs',
    },
    type: 'wwHandleMarkers',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    storyData: {},
    buttons: {
        NEXT: {
            text: {
                en: 'Save',
                fr: 'Enregistrer',
            },
            next: false,
        },
    },
});

// let editList = {
//     WW_MAP_CONFIG: {
//         title: {
//             en: 'Config the map element',
//             fr: 'Configurer la carte',
//         },
//         desc: {
//             en: 'Edit google key, origin and zoom',
//             fr: "Configurez la clé google, l'origine de la carte et le zoom.",
//         },
//         icon: 'wwi wwi-config',
//         shortcut: 'r',
//         next: 'WWMAP_CONFIG',
//     },
//     WW_MAP_MARKERS: {
//         title: {
//             en: 'Manage map markers',
//             fr: 'Editer les marqueurs sur la carte',
//         },
//         desc: {
//             en: 'Add, delete, edit markers',
//             fr: 'Ajoutez, éditez, suppprimez les marqueurs.',
//         },
//         icon: 'wwi wwi-map',
//         shortcut: 'r',
//         next: 'WWMAP_MARKERS',
//     },
//     EDIT_RATIO: {
//         title: {
//             en: 'Change map ratio',
//             fr: 'Changer le ratio de la carte',
//         },
//         desc: {
//             en: 'Portrait, square, landscape, etc.',
//             fr: 'Portrait, carré, paysage, etc.',
//         },
//         icon: 'wwi wwi-ratio',
//         shortcut: 'r',
//         next: 'WWMAP_RATIO',
//     },
//     WW_MAP_EDIT_STYLES: {
//         title: {
//             en: 'Edit map style',
//             fr: 'Editer le style de la carte',
//         },
//         desc: {
//             en: 'Add Google map configuration style',
//             fr: 'Editer la configuration du style de la carte',
//         },
//         icon: 'wwi wwi-color',
//         shortcut: 'r',
//         next: 'WWMAP_STYLES',
//     },
// };

// wwLib.wwPopups.addStory('WW_MAP_EDIT', {
//     title: {
//         en: 'Edit Map',
//         fr: 'Editer la carte',
//     },
//     type: 'wwPopupEditWwObject',
//     buttons: null,
//     storyData: {
//         list: editList,
//     },
// });
// wwLib.wwPopups.addStory('WW_MAP_RATIO', {
//     title: {
//         en: 'Map Ratio',
//         fr: 'Ratio de la carte',
//     },
//     type: 'wwPopupWwObjectRatio',
//     buttons: {
//         NEXT: {
//             text: {
//                 en: 'Finish',
//                 fr: 'Terminer',
//             },
//             next: null,
//         },
//     },
// });
// wwLib.wwPopups.addStory('WW_MAP_STYLES', {
//     title: {
//         en: 'Add Google map configuration style',
//         fr: 'Editer la configuration du style de la carte',
//     },
//     type: 'wwPopupForm',
//     storyData: {
//         fields: [
//             {
//                 label: {
//                     en: 'Style Array :',
//                     fr: '"Array" de style :',
//                 },
//                 type: 'textarea',
//                 key: 'mapStyles',
//                 valueData: 'mapStyles',
//                 desc: {
//                     en: 'The configuration will be added to the map',
//                     fr: 'La configuration sera ajouté à la carte',
//                 },
//                 style: {
//                     height: '600px',
//                 },
//             },
//         ],
//     },
//     buttons: {
//         NEXT: {
//             text: {
//                 en: 'Finish',
//                 fr: 'Terminer',
//             },
//             next: null,
//         },
//     },
// });
// wwLib.wwPopups.addStory('WW_MAP_CONFIG', {
//     title: {
//         en: 'Add Google map configuration',
//         fr: 'Editer la configuration de la carte',
//     },
//     type: 'wwPopupForm',
//     storyData: {
//         fields: [
//             {
//                 label: {
//                     en: 'Google key :',
//                     fr: 'Clé Google :',
//                 },
//                 type: 'text',
//                 key: 'googleKey',
//                 valueData: 'googleKey',
//                 desc: {
//                     en: 'Google API key',
//                     fr: "Clé de l'API de Google",
//                 },
//             },
//             {
//                 label: {
//                     en: 'Origin latitude :',
//                     fr: "latitude de l'origine :",
//                 },
//                 type: 'text',
//                 key: 'lat',
//                 valueData: 'lat',
//                 desc: {
//                     en: 'Latitude of the center of the map',
//                     fr: 'Latitude du centre de la carte',
//                 },
//             },
//             {
//                 label: {
//                     en: 'Origin longitude :',
//                     fr: "Longitude de l'origine :",
//                 },
//                 type: 'text',
//                 key: 'lng',
//                 valueData: 'lng',
//                 desc: {
//                     en: 'Longitude of the center of the map',
//                     fr: 'Longitude du centre de la carte',
//                 },
//             },
//             {
//                 label: {
//                     en: 'Zoom :',
//                     fr: 'Zoom :',
//                 },
//                 type: 'text',
//                 key: 'zoom',
//                 valueData: 'zoom',
//                 desc: {
//                     en: 'Manage zoom of the map',
//                     fr: 'Éditer le zoom de la carte',
//                 },
//             },
//         ],
//     },
//     buttons: {
//         NEXT: {
//             text: {
//                 en: 'Finish',
//                 fr: 'Terminer',
//             },
//             next: null,
//         },
//     },
// });

// wwLib.wwPopups.addStory('WW_MAP_MARKERS', {
//     title: {
//         en: 'Add Google map markers',
//         fr: 'Ajouter des points sur la carte',
//     },
//     type: 'markerPopup',
//     buttons: {
//         FINISH: {
//             text: {
//                 en: 'Finish',
//                 fr: 'Terminer',
//             },
//             next: false,
//         },
//     },
// });
