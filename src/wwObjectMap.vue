<template>
    <div class="ww-map" :style="{'padding-bottom':(ratio) +'%'}">
        <div class="map-container">
            <div class="map"></div>
        </div>
    </div>

    <!-- <div class="ww-map" v-bind:class="{'ww-video-loaded' : videoLoaded}">
        <div class="ww-video-container">
        
            <div v-if="wwAttrs.wwCategory == 'background'" class="ww-video-preview" v-bind:class="{'ww-video-loaded' : videoLoaded}" v-bind:style="{'background-image' : 'url(' + wwObject.content.data.preview + ')'}"></div>

            <video v-if="wwObject.content.data.provider == 'local' && wwAttrs.wwCategory == 'background'" class="ww-video-element ww-local-video ww-video-bg" autoplay="true" loop="true" preload="metadata" playsinline>
                <source v-bind:src="wwObject.content.data.id +  '#t=0.1'" type="video/mp4">
            </video>
            
            <video v-if="wwObject.content.data.provider == 'local' && wwAttrs.wwCategory != 'background'" class="ww-video-element ww-local-video" controlslist="nodownload" preload="metadata" playsinline v-bind:loop="wwObject.content.data.loop" v-bind:autoplay="wwObject.content.data.autoplay" v-bind:muted="wwObject.content.data.muted" v-bind:controls="wwObject.content.data.controls">
                <source v-bind:src="wwObject.content.data.id +  '#t=0.1'" type="video/mp4">
            </video>

 
            <iframe v-if="wwObject.content.data.provider == 'youtube' && wwAttrs.wwCategory == 'background'" class="ww-video-element ww-video-bg" v-bind:src="'//www.youtube.com/embed/' + wwObject.content.data.id + '?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&playlist=' + wwObject.content.data.id " frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            
            <iframe v-if="wwObject.content.data.provider == 'youtube' && wwAttrs.wwCategory != 'background'" class="ww-video-element" v-bind:src="'//www.youtube.com/embed/' + wwObject.content.data.id + '?rel=0' + 
			(wwObject.content.data.loop ? '&loop=1&playlist=' + wwObject.content.data.id : '') + 
			(wwObject.content.data.autoplay ? '&autoplay=1' : '') + 
			(wwObject.content.data.muted ? '' : '') + 
			(!wwObject.content.data.controls ? '&controls=0' : '') + 
			(!wwObject.content.data.showinfo ? '&showinfo=0' : '')" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

          
            <iframe v-if="wwObject.content.data.provider == 'vimeo' && wwAttrs.wwCategory == 'background'" class="ww-video-element ww-video-bg" v-bind:src="'//player.vimeo.com/video/' + wwObject.content.data.id + '?autoplay=1&loop=1&background=1' " frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            
            <iframe v-if="wwObject.content.data.provider == 'vimeo' && wwAttrs.wwCategory != 'background'" class="ww-video-element" v-bind:src="'//player.vimeo.com/video/' + wwObject.content.data.id + '?a=0' + 
			(wwObject.content.data.loop ? '&loop=1' : '') + 
			(wwObject.content.data.autoplay ? '&autoplay=1' : '') + 
			(wwObject.content.data.muted ? '&mute=1' : '') + 
			(!wwObject.content.data.controls ? '&controls=0' : '')" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

     
            <iframe v-if="wwObject.content.data.provider == 'dailymotion' && wwAttrs.wwCategory == 'background'" class="ww-video-element ww-video-bg" v-bind:src="'//www.dailymotion.com/embed/video/' + wwObject.content.data.id + '?autoplay=1&mute=1' " frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            
            <iframe v-if="wwObject.content.data.provider == 'dailymotion' && wwAttrs.wwCategory != 'background'" class="ww-video-element" v-bind:src="'//www.dailymotion.com/embed/video/' + wwObject.content.data.id" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

  
            <iframe v-if="wwObject.content.data.provider == 'twitch' && wwAttrs.wwCategory == 'background'" class="ww-video-element ww-video-bg" v-bind:src="'//player.twitch.tv/?channel=' + wwObject.content.data.id + '?autoplay=1&muted=1' " frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
            
            <iframe v-if="wwObject.content.data.provider == 'twitch' && wwAttrs.wwCategory != 'background'" class="ww-video-element" v-bind:src="'//player.twitch.tv/?channel=' + wwObject.content.data.id" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </div>
    </div>-->
</template>
 

<script>			
import Vue from 'vue';

let mapStyles = [
    {
        "elementType": "geometry",
        "stylers": [{
            "color": "#f5f5f5"
        }
        ]
    }, {
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }
        ]
    }, {
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#616161"
        }
        ]
    }, {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#f5f5f5"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#dadada"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#e5e5e5"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c9c9c9"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#5baec5"
            },
            {
                "weight": 1
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#ff005a"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    }
]

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
            this.mapsRand = Math.floor(Math.random() * 1000000000);
            window["initMap" + this.mapsRand] = function () {
                const myLatLng = { lat: parseFloat(self.wwObject.content.data.lat), lng: parseFloat(self.wwObject.content.data.lng) };

                self.map = new google.maps.Map(self.$el.getElementsByClassName('map')[0], {
                    center: myLatLng,
                    scrollwheel: false,
                    zoom: 15,
                    styles: self.wwObject.content.data.mapStyles || []
                });

                // ADD SAVED PLACES (MARKERS)
                // self.updatePlaces()
                // INIT AUTOCOMPLETE FORM
                // self.initAutocomplete()
            }
            var googleKey = this.wwObject.content.data.googleKey || 'AIzaSyCV0YKPp78GUBiMzBdDY2QBIuDMwaKLnHw';
            // Prepare specific script for this specific element
            this.scriptSrc = 'https://maps.googleapis.com/maps/api/js?key=' + googleKey + '&libraries=places&callback=initMap' + this.mapsRand;
            // Add script google map to head
            let ckeditor = document.createElement('script');
            ckeditor.setAttribute('src', this.scriptSrc);
            document.head.appendChild(ckeditor);
        },
        updatePlaces() {
            // REMOVE MARKERS ON THE MAP
            if (this.markers.length > 0) {
                for (var marker of this.markers) {
                    marker.setMap(null);
                }
            }
            for (let marker of this.markers) {
                let latlng = { lat: marker.lat, lng: marker.lng };
                let icon = '';
                let image = {};
                let _marker = new google.maps.Marker({
                    position: latlng,
                    map: this.map,
                    title: 'Click to get details'
                });
            }
        },
        async edit() {
            wwLib.wwObjectHover.setLock(this);
            let editList = {
                WWMAP_MARKERS: {
                    title: {
                        en: 'Manage map markers',
                        fr: 'Editer les marqueurs sur la carte'
                    },
                    desc: {
                        en: 'Add, delete, edit markers',
                        fr: 'Ajoutez, éditez, suppprimez les marqueurs.'
                    },
                    icon: 'wwi wwi-ratio',
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
                    icon: 'wwi wwi-ratio',
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
            wwLib.wwPopups.addStory('WWMAP_MARKERS', {
                title: {
                    en: 'Add Google map configuration style',
                    fr: 'Editer la configuration du style de la carte'
                },
                type: 'wwPopupForm',
                storyData: {
                    fields: [
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
                                en: 'latitud of the center of the map',
                                fr: 'Latitude du centre de la carte'
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

            let options = {
                firstPage: 'WWMAP_EDIT',
                data: {
                    wwObject: this.wwObject,
                    mapStyles: JSON.stringify(this.wwObject.content.data.mapStyles),
                    lat: this.wwObject.content.data.lat,
                    lng: this.wwObject.content.data.lng,
                    zoom: this.wwObject.content.data.zoom
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
                this.wwObjectCtrl.update(this.wwObject);
                this.wwObjectCtrl.globalEdit(result);
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
