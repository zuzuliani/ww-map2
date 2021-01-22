<template>
    <div class="ww-map">
        <div class="map-container">
            <div class="map-placeholder" v-if="isError" :class="{ error: isError }">
                <div class="placeholder-content">
                    If you want to use a Google map, you need to have a Google API Key. If you already have one, you can
                    add it in the map settings. <br /><br />
                    Otherwise you can follow theses instructions :
                    <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank">
                        <button>API Key documentation</button></a
                    >
                    <span v-if="wrongKey" class="wrongKey">Your API key has the wrong format</span>
                </div>
            </div>
            <div class="map" ref="map" :class="{ error: isError }"></div>
        </div>
    </div>
</template>

<script>
import { Loader } from './googleLoader';
/* wwEditor:start */
import { addMarkers } from './popups';
/* wwEditor:end */
import stylesConfig from './stylesConfig.json';

export default {
    name: '__COMPONENT_NAME__',
    props: {
        /* wwEditor:start */
        wwEditorState: Boolean,
        /* wwEditor:end */
        content: Object,
    },
    data() {
        return {
            markerInstances: [],
            markers: [
                {
                    name: 'Paris',
                    lat: '48.859923',
                    lng: '2.344065',
                    isActive: true,
                },
            ],

            loader: null,
            google: null,
            wrongKey: false,
        };
    },
    wwDefaultContent: {
        googleKey: '',
        lat: '48.859923',
        lng: '2.344065',
        zoom: 15,
        mapsRand: Math.floor(Math.random() * 1000000000),
        mapStyle: 'dark',
        initialMarker: false,
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwSectionHelper.EDIT_MODES.CONTENT;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        ratio() {
            if (this.content.ratio > 0) {
                return this.content.ratio;
            } else {
                return 60;
            }
        },
        isError() {
            if (this.content && this.content.googleKey) {
                return !this.isGoogleKeyMatch;
            }
            return true;
        },
        isGoogleKeyMatch() {
            return this.content.googleKey.match(/^(AIza[0-9A-Za-z-_]{35})$/);
        },
    },
    watch: {
        // 'content.googleKey'() {
        //     this.initMap();
        // },
        // 'content.lat'() {
        //     this.initMap();
        // },
        // 'content.lng'() {
        //     this.initMap();
        // },
        // 'content.zoom'() {
        //     this.initMap();
        // },
        // 'content.mapsRand'() {
        //     this.initMap();
        // },
        // 'content.mapStyle'() {
        //     this.initMap();
        // },
    },
    methods: {
        initMap() {
            // const { lat, lng, zoom, googleKey } = this.content;
            // if (!this.isGoogleKeyMatch) {
            //     if (googleKey.length) this.wrongKey = true;
            //     setTimeout(() => {
            //         this.wrongKey = false;
            //     }, 8000);
            //     return;
            // }
            // this.wrongKey = false;
            // if (!lat || !lng || !zoom || !googleKey.length) return;
            // if (this.loader) {
            //     this.loader.reset();
            // }
            // this.loader = new Loader({
            //     apiKey: googleKey,
            //     language: wwLib.wwLang.lang,
            // });
            // const mapOptions = {
            //     center: {
            //         lat: parseFloat(lat),
            //         lng: parseFloat(lng),
            //     },
            //     zoom: zoom,
            //     styles: stylesConfig[`${this.content.mapStyle}`],
            // };
            // this.loader
            //     .load()
            //     .then(() => {
            //         this.googleMapInstance = new google.maps.Map(this.$refs.map, mapOptions);
            //     })
            //     .catch(err => {
            //         wwLib.wwLog.error(err);
            //     });
            // if (this.markers && this.markers.length) {
            //     this.addMarkers();
            // }
        },
        async openMarkersPopup() {
            try {
                const result = await addMarkers({
                    markers: this.markers,
                });
                if (result.markers && result.markers.length) {
                    this.markers = result.markers;
                    this.addMarkers();
                }
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        addMarkers() {
            if (this.markerInstances.length > 0) {
                for (let markerInstance of this.markerInstances) {
                    markerInstance.setMap(null);
                    markerInstance = null;
                }
                this.markerInstances = [];
            }

            if (this.loader) {
                for (let marker of this.markers) {
                    this.loader
                        .load()
                        .then(() => {
                            if (!marker.isActive) return;

                            const latlng = { lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) };
                            let _marker = new google.maps.Marker({
                                position: latlng,
                                map: this.googleMapInstance,
                                animation: google.maps.Animation.DROP,
                            });

                            this.markerInstances.push(_marker);
                            if (marker.name) {
                                const infowindow = new google.maps.InfoWindow({
                                    content: marker.name,
                                    maxWidth: 200,
                                });
                                _marker.addListener('mouseover', function () {
                                    infowindow.open(this.googleMapInstance, _marker);
                                });
                                _marker.addListener('mouseout', function () {
                                    infowindow.close();
                                });
                            }
                        })
                        .catch(err => {
                            wwLib.wwLog.error(err);
                        });
                }
            }
        },
        mounted() {
            this.initMap();
        },
    },
};
</script>

<style lang="scss" scoped>
.ww-map {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 20%;

    .map-container {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;

        .map-iframe {
            width: 100%;
            height: 100%;
        }

        .map {
            z-index: 1;
            height: 100%;
            width: 100%;

            &.error {
                filter: blur(8px);
            }
        }
        .map-placeholder {
            z-index: 2;
            position: absolute;
            top: 0px;
            left: 0px;

            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            &.error {
                background-color: rgba(0, 0, 0, 0.4);
            }

            .placeholder-content {
                text-align: center;
                width: 90%;
                background: white;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 0.8em 1.2em;
                border-radius: 12px;

                .wrongKey {
                    color: #f44336;
                    padding: 10px;
                }

                button {
                    margin-top: 20px;
                    padding: 0.8em 1.2em;
                    border: none;
                    border-radius: 12px;
                    background-color: #099af2;
                    color: white;
                    font-weight: 500;
                    font-size: 1.1em;
                    transition: 0.3s;

                    &:hover {
                        cursor: pointer;
                        background-color: #077ac0;
                        transition: 0.3s;
                    }
                }
            }
        }
    }
}
</style>
