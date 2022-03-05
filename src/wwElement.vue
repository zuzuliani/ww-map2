<template>
    <div class="ww-map" :class="{ inactive: isEditing }">
        <div class="map-container">
            <div v-if="isError" class="map-placeholder" :class="{ error: isError }">
                <div class="placeholder-content">
                    If you want to use a Google map, you need to have a Google API Key. If you already have one, you can
                    add it in the map settings. <br /><br />
                    Otherwise you can follow theses instructions:
                    <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank">
                        <button>API Key documentation</button>
                    </a>
                    <span v-if="wrongKey" class="wrongKey">Your API key has the wrong format</span>
                </div>
            </div>
            <div ref="map" class="map" :class="{ error: isError }"></div>
        </div>
    </div>
</template>

<script>
import { Loader } from './googleLoader';
import stylesConfig from './stylesConfig.json';

export default {
    props: {
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
        content: { type: Object, required: true },
    },
    emits: ['trigger-event', 'update:content:effect'],
    setup() {
        const markerInstances = [];
        const mapBounds = null;

        return { markerInstances, mapBounds };
    },
    data() {
        return {
            map: null,
            loader: null,
            wrongKey: false,
        };
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
        isError() {
            if (this.content && this.content.googleKey) {
                return !this.isGoogleKeyMatch;
            }
            return true;
        },
        isGoogleKeyMatch() {
            if (this.content.googleKey) {
                return this.content.googleKey.match(/^(AIza[0-9A-Za-z-_]{35})$/);
            }
            return false;
        },
        mapOptions() {
            return {
                center: {
                    lat: parseFloat(this.content.lat),
                    lng: parseFloat(this.content.lng),
                },
                zoom: this.content.zoom,
                styles:
                    this.content.mapStyle === 'custom'
                        ? JSON.parse(this.content.mapStyleJSON.code)
                        : stylesConfig[this.content.mapStyle],
                mapTypeId: this.content.defaultMapType,
                zoomControl: this.content.zoomControl,
                scaleControl: this.content.scaleControl,
                rotateControl: this.content.rotateControl,
                streetViewControl: this.content.streetViewControl,
                fullscreenControl: this.content.fullscreenControl,
                mapTypeControl: this.content.mapTypeControl,
            };
        },
    },
    watch: {
        /* wwEditor:start */
        'content.googleKey'() {
            this.initMap();
        },
        'content.lat'() {
            this.initMap();
        },
        'content.lng'() {
            this.initMap();
        },
        'content.markers'() {
            this.updateMarkers();
        },
        'content.zoom'(value) {
            if (this.map) this.map.setZoom(value);
        },
        'content.mapStyle'() {
            this.initMap();
        },
        'content.defaultMapType'(value) {
            if (value === 'satellite') this.$emit('update:content:effect', { mapStyle: null });
            this.initMap();
        },
        'content.mapStyleJSON'() {
            this.initMap();
        },
        'content.fixedBounds'(fixedBounds) {
            if (fixedBounds) {
                this.updateMarkers();
            } else {
                this.mapBounds = null;
                this.initMap();
            }
        },
        'content.zoomControl'() {
            this.initMap();
        },
        'content.scaleControl'() {
            this.initMap();
        },
        'content.rotateControl'() {
            this.initMap();
        },
        'content.streetViewControl'() {
            this.initMap();
        },
        'content.fullscreenControl'() {
            this.initMap();
        },
        'content.mapTypeControl'() {
            this.initMap();
        },
        /* wwEditor:end */
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            const { lat, lng, zoom, googleKey } = this.content;
            if (!this.isGoogleKeyMatch) {
                if (googleKey && googleKey.length) this.wrongKey = true;
                setTimeout(() => {
                    this.wrongKey = false;
                }, 8000);
                return;
            }

            this.wrongKey = false;
            if (!lat || !lng || !zoom || !googleKey.length) return;
            if (this.loader) {
                this.loader.reset();
            }
            this.loader = new Loader({
                apiKey: googleKey,
                language: wwLib.wwLang.lang,
            });

            this.loader
                .load()
                .then(() => {
                    this.map = new google.maps.Map(this.$refs.map, this.mapOptions);
                    this.updateMarkers();
                })
                .catch(err => {
                    wwLib.wwLog.error(err);
                });
        },
        updateMarkers() {
            if (!this.content.markers) return;
            let data = this.content.markers;

            if (data && !Array.isArray(data) && typeof data === 'object') {
                data = new Array(data);
            } else if ((data && !Array.isArray(data)) || typeof data !== 'object') {
                return [{}];
            }

            if (this.loader && data) {
                for (let markerInstance of this.markerInstances) {
                    markerInstance.setMap(null);
                    markerInstance = null;
                }
                this.markerInstances = [];

                for (let marker of data) {
                    this.loader
                        .load()
                        .then(() => {
                            const latlng = { lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) };
                            let _marker = new google.maps.Marker({
                                position: latlng,
                                map: this.map,
                                animation: google.maps.Animation.DROP,
                            });
                            this.markerInstances.push(_marker);
                            if (marker.name) {
                                const infowindow = new google.maps.InfoWindow({
                                    content: marker.name,
                                    maxWidth: 200,
                                });
                                _marker.addListener('mouseover', () => {
                                    this.$emit('trigger-event', { name: 'marker:mouseover', event: { marker } });
                                    infowindow.open(this.map, _marker);
                                });
                                _marker.addListener('mouseout', () => {
                                    this.$emit('trigger-event', { name: 'marker:mouseout', event: { marker } });
                                    infowindow.close();
                                });
                            }
                        })
                        .catch(err => {
                            wwLib.wwLog.error(err);
                        });
                }
            }

            if (this.content.fixedBounds) {
                this.mapBounds = new google.maps.LatLngBounds();
                for (let marker of data) {
                    if (typeof marker === 'object' && 'lat' in marker && 'lng' in marker) {
                        let { lat, lng } = marker;
                        this.mapBounds.extend({ lat: parseFloat(lat), lng: parseFloat(lng) });
                    }
                }
                this.map.fitBounds(this.mapBounds);

                if (this.map && this.map.getZoom() > this.content.zoom) {
                    this.map.setZoom(this.content.zoom);
                }
            }
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
    pointer-events: initial;

    &.inactive {
        pointer-events: none;
    }

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
