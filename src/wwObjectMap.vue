<template>
    <div class="ww-map" :style="{'padding-bottom':(ratio) +'%'}">
        <div class="map-container">
            <!-- {{editMode}} -->
            <div class="map"></div>
        </div>
    </div>
</template>
 

<script>			
import Vue from 'vue';
/* wwManager:start */
import markerPopup from './markerPopup.vue'
wwLib.wwPopups.addPopup('markerPopup', markerPopup);
/* wwManager:end */

export default {
    name: "__COMPONENT_NAME__",
    props: {
        wwObjectCtrl: Object,
        wwAttrs: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            markers: [],
            loaded: false
        }
    },
    computed: {
        wwObject() {
            return this.wwObjectCtrl.get();
        },
        editMode() {
            return this.wwObjectCtrl.getEditMode() == 'CONTENT'
        },
        ratio() {
            console.log('RATIO : ', this.wwObject.ratio)
            if (this.wwObject.ratio > 0) {
                return this.wwObject.ratio
            } else {
                return 50
            }
        }
    },
    watch: {
    },
    methods: {
        init() {
            this.loaded = true
            this.initMap()
        },
        initMap() {
            const self = this;
            this.wwObject.content.data.lat = this.wwObject.content.data.lat || "48.859923";
            this.wwObject.content.data.lng = this.wwObject.content.data.long || "2.344065";
            this.wwObject.content.data.zoom = this.wwObject.content.data.zoom || 15
            this.mapsRand = Math.floor(Math.random() * 1000000000);
            window["initMap" + this.mapsRand] = function () {
                const myLatLng = { lat: parseFloat(self.wwObject.content.data.lat), lng: parseFloat(self.wwObject.content.data.lng) };

                self.map = new google.maps.Map(self.$el.getElementsByClassName('map')[0], {
                    center: myLatLng,
                    scrollwheel: false,
                    zoom: self.wwObject.content.data.zoom,
                    styles: self.wwObject.content.data.mapStyles || []
                });

                // ADD SAVED MARKERS
                self.updateMarkers()
            }
            var googleKey = this.wwObject.content.data.googleKey || 'AIzaSyCV0YKPp78GUBiMzBdDY2QBIuDMwaKLnHw';
            // Prepare specific script for this specific element
            this.scriptSrc = 'https://maps.googleapis.com/maps/api/js?key=' + googleKey + '&libraries=places&callback=initMap' + this.mapsRand;
            // Add script google map to head
            let ckeditor = document.createElement('script');
            ckeditor.setAttribute('src', this.scriptSrc);
            document.head.appendChild(ckeditor);
        },
        updateMarkers() {
            // REMOVE MARKERS ON THE MAP
            if (this.wwObject.content.data.markers.length > 0) {
                for (const marker of this.wwObject.content.data.markers) {
                    // marker.setMap(null);
                }
            }
            for (const marker of this.wwObject.content.data.markers) {
                const latlng = { lat: marker.lat, lng: marker.lng };
                let icon = '';
                let image = {};
                let _marker = new google.maps.Marker({
                    position: latlng,
                    map: this.map,
                    animation: google.maps.Animation.DROP,
                });
                if (marker.name) {
                    const infowindow = new google.maps.InfoWindow({
                        content: marker.name,
                        maxWidth: 200
                    });
                    _marker.addListener('mouseover', function () {
                        infowindow.open(this.map, _marker);
                    });
                    _marker.addListener('mouseout', function () {
                        infowindow.close();
                    });
                }

            }
        },
        async edit() {
            wwLib.wwObjectHover.setLock(this);
            let editList = {
                WWMAP_CONFIG: {
                    title: {
                        en: 'Config the map element',
                        fr: 'Configurer la carte'
                    },
                    desc: {
                        en: 'Edit google key, origin and zoom',
                        fr: 'Configurez la clé google, l\'origine de la carte et le zoom.'
                    },
                    icon: 'wwi wwi-config',
                    shortcut: 'r',
                    next: 'WWMAP_CONFIG'
                },
                WWMAP_MARKERS: {
                    title: {
                        en: 'Manage map markers',
                        fr: 'Editer les marqueurs sur la carte'
                    },
                    desc: {
                        en: 'Add, delete, edit markers',
                        fr: 'Ajoutez, éditez, suppprimez les marqueurs.'
                    },
                    icon: 'wwi wwi-map',
                    shortcut: 'r',
                    next: 'WWMAP_MARKERS'
                },
                EDIT_RATIO: {
                    title: {
                        en: 'Change map ratio',
                        fr: 'Changer le ratio de la carte'
                    },
                    desc: {
                        en: 'Portrait, square, landscape, etc.',
                        fr: 'Portrait, carré, paysage, etc.'
                    },
                    icon: 'wwi wwi-ratio',
                    shortcut: 'r',
                    next: 'WWMAP_RATIO'
                },
                WWMAP_EDIT_STYLES: {
                    title: {
                        en: 'Edit map style',
                        fr: 'Editer le style de la carte'
                    },
                    desc: {
                        en: 'Add Google map configuration style',
                        fr: 'Editer la configuration du style de la carte'
                    },
                    icon: 'wwi wwi-color',
                    shortcut: 'r',
                    next: 'WWMAP_STYLES'
                }
            }

            wwLib.wwPopups.addStory('WWMAP_EDIT', {
                title: {
                    en: 'Edit Map',
                    fr: 'Editer la carte'
                },
                type: 'wwPopupEditWwObject',
                buttons: null,
                storyData: {
                    list: editList
                }
            })
            wwLib.wwPopups.addStory('WWMAP_RATIO', {
                title: {
                    en: 'Map Ratio',
                    fr: 'Ratio de la carte'
                },
                type: 'wwPopupImageRatio',
                buttons: {
                    NEXT: {
                        text: {
                            en: 'Finish',
                            fr: 'Terminer'
                        },
                        next: null
                    }
                }
            })
            wwLib.wwPopups.addStory('WWMAP_STYLES', {
                title: {
                    en: 'Add Google map configuration style',
                    fr: 'Editer la configuration du style de la carte'
                },
                type: 'wwPopupForm',
                storyData: {
                    fields: [
                        {
                            label: {
                                en: 'Style Array :',
                                fr: '"Array" de style :'
                            },
                            type: 'textarea',
                            key: 'mapStyles',
                            valueData: 'mapStyles',
                            desc: {
                                en: 'The configuration will be added to the map',
                                fr: 'La configuration sera ajouté à la carte'
                            },
                            style: {
                                height: '600px'
                            }
                        }
                    ]
                },
                buttons: {
                    NEXT: {
                        text: {
                            en: 'Finish',
                            fr: 'Terminer'
                        },
                        next: null
                    }
                }
            })
            wwLib.wwPopups.addStory('WWMAP_CONFIG', {
                title: {
                    en: 'Add Google map configuration',
                    fr: 'Editer la configuration de la carte'
                },
                type: 'wwPopupForm',
                storyData: {
                    fields: [
                        {
                            label: {
                                en: 'Google key :',
                                fr: 'Clé Google :'
                            },
                            type: 'text',
                            key: 'googleKey',
                            valueData: 'googleKey',
                            desc: {
                                en: 'Google API key',
                                fr: 'Clé de l\'API de Google'
                            }
                        },
                        {
                            label: {
                                en: 'Origin latitud :',
                                fr: 'latitude de l\'origine :'
                            },
                            type: 'text',
                            key: 'lat',
                            valueData: 'lat',
                            desc: {
                                en: 'latitud of the center of the map',
                                fr: 'Latitude du centre de la carte'
                            }
                        },
                        {
                            label: {
                                en: 'Origin longitud :',
                                fr: 'Longitude de l\'origine :'
                            },
                            type: 'text',
                            key: 'lng',
                            valueData: 'lng',
                            desc: {
                                en: 'latitud of the center of the map',
                                fr: 'Latitude du centre de la carte'
                            }
                        },
                        {
                            label: {
                                en: 'Zoom :',
                                fr: 'Zoom :'
                            },
                            type: 'text',
                            key: 'zoom',
                            valueData: 'zoom',
                            desc: {
                                en: 'Manage zoom of the map',
                                fr: 'Éditer le zoom de la carte'
                            }
                        }
                    ]
                },
                buttons: {
                    NEXT: {
                        text: {
                            en: 'Finish',
                            fr: 'Terminer'
                        },
                        next: null
                    }
                }
            })

            wwLib.wwPopups.addStory('WWMAP_MARKERS', {
                title: {
                    en: 'Add Google map markers',
                    fr: 'Ajouter des points sur la carte'
                },
                type: 'markerPopup',
                buttons: {
                    FINISH: {
                        text: {
                            en: 'Finish',
                            fr: 'Terminer'
                        },
                        next: false
                    }
                }

            })



            let options = {
                firstPage: 'WWMAP_EDIT',
                data: {
                    wwObject: this.wwObject,
                    mapStyles: JSON.stringify(this.wwObject.content.data.mapStyles),
                    lat: this.wwObject.content.data.lat,
                    lng: this.wwObject.content.data.lng,
                    zoom: this.wwObject.content.data.zoom,
                    googleKey: this.wwObject.content.data.googleKey || 'AIzaSyCV0YKPp78GUBiMzBdDY2QBIuDMwaKLnHw',
                    markers: this.wwObject.content.data.markers
                }
            }

            try {
                const result = await wwLib.wwPopups.open(options);
                console.log('RESULT : ', result)
                /*=============================================m_ÔÔ_m=============================================\
                  STYLE
                \================================================================================================*/
                if (typeof (result.ratio) != 'undefined') {
                    this.wwObject.ratio = result.ratio;
                }
                if (typeof (result.mapStyles) != 'undefined') {
                    this.wwObject.content.data.mapStyles = JSON.parse(result.mapStyles || '[]');
                    this.initMap()
                }
                if (typeof (result.lat) != 'undefined') {
                    this.wwObject.content.data.lat = result.lat;
                }
                if (typeof (result.lng) != 'undefined') {
                    this.wwObject.content.data.lng = result.lng;
                }
                if (typeof (result.zoom) != 'undefined') {
                    this.wwObject.content.data.zoom = parseInt(result.zoom);
                    this.map.setZoom(parseInt(result.zoom))
                }
                if (typeof (result.googleKey) != 'undefined') {
                    this.wwObject.content.data.googleKey = result.googleKey;
                }
                if (typeof (result.markers) != 'undefined') {
                    this.wwObject.content.data.markers = result.markers;
                    this.updateMarkers()
                }

                // this.wwObjectCtrl.globalEdit(result);
                this.wwObjectCtrl.update(this.wwObject);
                console.log(this.wwObject.content.data)
            } catch (error) {
                console.log(error);
            }
            wwLib.wwObjectHover.removeLock();
        }
    },
    mounted() {
        this.init();

        wwLib.wwElementsStyle.applyAllStyles({
            wwObject: this.wwObject,
            lastWwObject: null,
            element: this.$el,
            noAnim: this.wwAttrs.wwNoAnim,
            noClass: false,
        });

        this.$emit('ww-loaded', this);

    },
    beforeDestroyed() {
        //window.removeEventListener('resize', this.wwOnResize);
    }
};
</script>

<style lang="scss" scoped>
.ww-map {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .map-container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        .map {
            height: 100%;
            width: 100%;
        }
    }
}
</style>
