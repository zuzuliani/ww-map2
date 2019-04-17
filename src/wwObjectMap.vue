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


            //window.addEventListener('resize', this.wwOnResize);
            this.loaded = true
            console.log('this.mapHeight', this.mapHeight)
            this.initMap()
            //this.wwLoadVideo();
        },
        initMap() {
            const self = this;
            this.wwObject.content.data.lat = this.wwObject.content.data.lat || "48.859923";
            this.wwObject.content.data.long = this.wwObject.content.data.long || "2.344065";
            this.mapsRand = Math.floor(Math.random() * 1000000000);
            window["initMap" + this.mapsRand] = function () {
                const myLatLng = { lat: parseFloat(self.wwObject.content.data.lat), lng: parseFloat(self.wwObject.content.data.long) };

                self.map = new google.maps.Map(self.$el.getElementsByClassName('map')[0], {
                    center: myLatLng,
                    scrollwheel: false,
                    zoom: 15,
                    styles: mapStyles
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
        async edit() {
            wwLib.wwObjectHover.setLock(this);
            let editList = {
                EDIT_RATIO: {
                    title: {
                        en: 'Change color ratio',
                        fr: 'Changer le ratio de la couleur'
                    },
                    desc: {
                        en: 'Portrait, square, landscape, ...',
                        fr: 'Portrait, carré, paysage, ...'
                    },
                    icon: 'wwi wwi-ratio',
                    shortcut: 'r',
                    next: 'WWMAP_RATIO'
                }
            }
            wwLib.wwPopups.addStory('WWMAP_EDIT', {
                title: {
                    en: 'Edit Color',
                    fr: 'Editer la couleur'
                },
                type: 'wwPopupEditWwObject',
                buttons: null,
                storyData: {
                    list: editList
                }
            })
            wwLib.wwPopups.addStory('WWMAP_RATIO', {
                title: {
                    en: 'Color Ratio',
                    fr: 'Ratio de la couleur'
                },
                type: 'wwPopupImageRatio',
                buttons: {
                    NEXT: {
                        text: {
                            en: 'Next',
                            fr: 'Suivant'
                        },
                        next: 'WWCOLOR_STYLE'
                    }
                }
            })
            let options = {
                firstPage: 'WWMAP_EDIT',
                data: {
                    wwObject: this.wwObject
                }
            }
            try {
                const result = await wwLib.wwPopups.open(options);
                /*=============================================m_ÔÔ_m=============================================\
                  STYLE
                \================================================================================================*/
                if (typeof (result.ratio) != 'undefined') {
                    this.wwObject.ratio = result.ratio;
                }
                this.wwObjectCtrl.update(this.wwObject);
                this.wwObjectCtrl.globalEdit(result);
            } catch (error) {
                console.log(error);
            }
            wwLib.wwObjectHover.removeLock();
        }
        // wwCheckRatio() {

        //     //If ratio is fixed in ww-object directive, override it here
        //     if (this.wwAttrs.wwFixedRatio) {
        //         try {
        //             var ratio = parseFloat(this.wwAttrs.wwFixedRatio);
        //             if (ratio) {
        //                 return ratio;
        //             }
        //         }
        //         catch (error) {
        //             console.log("wwRatio error", error);
        //         }
        //     }

        //     if (!this.wwObject.ratio || this.wwObject.ratio < 0) {
        //         if (this.wwAttrs.wwDefaultRatio) {
        //             return this.wwAttrs.wwDefaultRatio;
        //         }
        //         else {
        //             return 100 / 3 * 2;
        //         }
        //     }

        //     return this.wwObject.ratio;
        // },
        // wwApplyVideoRatio() {

        //     if (this.wwAttrs.wwCategory != "background") {

        //         var ratio = this.wwCheckRatio();
        //         this.$el.style.paddingBottom = ratio + "%";
        //     }

        //     this.videoLoaded = true;
        // },
        // wwAppendPreview() {
        //     var wwPreviewHTML = "<div class='ww-video-preview' style='background-image:url(" + this.wwObject.content.data.preview + ")'></div>";

        //     wwVideoContainer.append(wwPreviewHTML);
        // },
        // wwLoadVideo: async function () {

        //     try {
        //         let wwVideoData = this.wwObject.content.data;

        //         if (wwVideoData.provider == "local") {
        //             const wwVideoHTML = document.createElement("video");
        //             wwVideoHTML.appendChild(document.createElement('source', { src: this.wwObject.content.data.id + '#t=0.1', type: 'video/mp4' }));

        //             var self = this;

        //             await wwVideoHTML.addEventListener("loadedmetadata", function (e) {

        //                 self.wwObject.content.data.videoRatio = this.videoWidth / this.videoHeight;

        //                 self.wwApplyVideoRatio();

        //                 return;
        //             }, false);


        //             return;


        //         }
        //         //EXT VIDEO
        //         else {

        //             if (this.wwAttrs.wwCategory == "background") {

        //                 previewAndRatio = await wwGetVideoPreviewAndRatio(wwVideoData.provider, wwVideoData.id, wwVideoData.preview);
        //                 if (previewAndRatio) {
        //                     this.wwObject.content.data.videoRatio = previewAndRatio.ratio;
        //                 }
        //             }

        //             this.wwApplyVideoRatio();
        //             return;
        //         }
        //     }
        //     catch (e) {

        //     }

        // },
        // wwGetVideoPreviewAndRatio: async function (provider, videoId, videoPreview) {

        //     let noImage = videoPreview || "https://cdn.wewebapp.io/public/images/no_image_selected.png";

        //     let responce = null;

        //     try {
        //         switch (provider) {
        //             case "youtube":
        //                 var previewAndRatio = {
        //                     preview: videoPreview || '//img.youtube.com/vi/' + videoId + '/maxresdefault.jpg',
        //                     ratio: 1920 / 1080
        //                 }
        //                 return previewAndRatio;
        //                 break;
        //             case "dailymotion":

        //                 responce = await axios.get('https://api.dailymotion.com/video/' + videoId + '?fields=thumbnail_1080_url,height,width');

        //                 if (!responce) {
        //                     return {
        //                         preview: noImage,
        //                         ratio: 1920 / 1080
        //                     }
        //                 }

        //                 var previewAndRatio = {
        //                     preview: noImage,
        //                     ratio: 1920 / 1080
        //                 }

        //                 if (responce.data.thumbnail_1080_url) {
        //                     previewAndRatio.preview = videoPreview || responce.data.thumbnail_1080_url
        //                 }

        //                 if (responce.data.width && responce.data.height) {
        //                     previewAndRatio.ratio = responce.data.width / responce.data.height;
        //                 }

        //                 return previewAndRatio;


        //                 break;
        //             case "vimeo":

        //                 responce = await axios.get('https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/' + videoId);

        //                 if (!responce) {
        //                     return {
        //                         preview: noImage,
        //                         ratio: 1920 / 1080
        //                     }
        //                 }

        //                 var previewAndRatio = {
        //                     preview: noImage,
        //                     ratio: 1920 / 1080
        //                 }

        //                 if (responce.data.thumbnail_url) {

        //                     var thumb = responce.data.thumbnail_url;
        //                     var reg = /i.vimeocdn.com\/video\/([^_]*)_/;
        //                     var matches = thumb.match(reg);
        //                     if (matches.length == 2) {
        //                         previewAndRatio.preview = videoPreview || "//i.vimeocdn.com/video/" + matches[1] + "_1920x1080.jpg";
        //                     }
        //                 }

        //                 if (responce.data.width && responce.data.height) {
        //                     previewAndRatio.ratio = responce.data.width / responce.data.height;
        //                 }

        //                 return previewAndRatio;

        //                 break;
        //             default:
        //                 return {
        //                     preview: noImage,
        //                     ratio: 1920 / 1080
        //                 };
        //         }
        //     } catch (e) {
        //         return {
        //             preview: noImage,
        //             ratio: 1920 / 1080
        //         };
        //     }
        // }
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
