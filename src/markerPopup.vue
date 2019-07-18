<template>
    <div class="popup__container">
        <div class="loader" :style="{'display': loader ? 'absolute':'none'}">
            <i class="fas fa-circle-notch fa-spin"></i>
        </div>
        <div v-if="markers.length">
            <div class="subtitle">Fill in the address input to update marker coordinates</div>
            <div class="grid header">
                <div class="name">name</div>
                <div class="address">address</div>
                <div class="coordinate">latitude</div>
                <div class="coordinate">longitude</div>
            </div>
            <div class="grid marker" v-for="(marker, index) in markers" :key="marker.uniqueId">
                <div class="name">
                    <input type="text" name="name" v-model="marker.name" />
                </div>
                <div class="address">
                    <input type="text" name="address" :class="'marker-address-' + marker.uniqueId" v-model="marker.address" />
                </div>
                <div class="coordinate">{{marker.lat.toFixed(4)}}</div>
                <div class="coordinate">{{marker.lng.toFixed(4)}}</div>
                <div class="remove">
                    <div class="btn" @click="removeMarker(index)">
                        <span class="wwi wwi-cross"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="add-btn" @click="addMarker()">ADD A MARKER</div>
        </div>
    </div>
</template>

<script> 
import { setTimeout } from 'timers';

export default {
    name: "markerPopup",
    props: {
        options: {
            type: Object,
            default: function () {
                return {}
            }
        },
    },
    data() {
        return {
            markers: [],
            loader: true
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
        init() {
            this.markers = this.options.data.markers || []
            this.options.result.markers = this.markers
            this.loader = true

            this.$nextTick(() => {
                for (const marker of this.markers) {
                    this.initAutocomplete(marker)
                }
                this.loader = false
            })


        },
        initAutocomplete(marker) {
            // Create the autocomplete object, restricting the search to geographical
            // location types.

            // const markerElement = this.$el.querySelector(`.marker-address-${marker.uniqueId}`)

            setTimeout(() => {
                const markerElement = this.$el.querySelector(`.marker-address-${marker.uniqueId}`)
                let autocomplete = new (wwLib.getManagerWindow().google).maps.places.Autocomplete(
                    markerElement,
                    { types: ['geocode'] });
                // When the user selects an address from the dropdown, populate the address
                // fields in the form.

                autocomplete.addListener('place_changed', fillInMarker);
                function fillInMarker() {
                    const place = autocomplete.getPlace();
                    marker.address = place.formatted_address;
                    marker.lat = place.geometry.location.lat();
                    marker.lng = place.geometry.location.lng();
                }

            }, 1000)
        },
        addMarker() {
            this.markers.push({
                name: '',
                lat: 0,
                lng: 0,
                uniqueId: wwLib.wwUtils.getUniqueId()
            })
            this.$nextTick(() => {
                this.initAutocomplete(this.markers[this.markers.length - 1])
            })
        },
        removeMarker(index) {
            this.markers.splice(index, 1);
        }
    },
    mounted: function () {
        // Add google api to manager app which loads this popup
        this.scriptSrc = 'https://maps.googleapis.com/maps/api/js?key=' + this.options.data.googleKey + '&libraries=places'
        let ckeditor = wwLib.getManagerDocument().createElement('script');
        ckeditor.type = 'text/javascript'
        ckeditor.setAttribute('src', this.scriptSrc);
        wwLib.getManagerDocument().head.appendChild(ckeditor);

        ckeditor.onload = this.init



    }
}
</script>

<style scoped lang="scss">
.popup__container {
    position: relative;
    font-family: "Monserrat", sans-serif;
    font-size: 1.2rem;
    flex-grow: 1;
    .loader {
        height: 100%;
        width: 100%;
        background-color: #fafafa;
        i {
            color: grey;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
        }
    }
    .title {
        color: #e02a4d;
        font-family: "Monserrat", sans-serif;
        font-size: 1.2rem;
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .subtitle {
        color: #5e5e5e;
        margin: 20px 50px;
    }
    .button {
        margin-top: 20px;
        width: fit-content;
    }

    .grid {
        display: grid;
        grid-template-columns: 200px 300px 100px 100px 100px;
        max-width: 950px;
        min-width: 800px;
        margin: 0 auto;
        @media (max-width: 668px) {
            .dashboard-table {
                width: 90%;
                margin-left: 5%;
            }
        }
    }
    .header {
        text-transform: uppercase;
        font-size: 0.8em;
        color: #5e5e5e;
        .address,
        .coordinate,
        .name {
            padding-left: 45px;
        }
    }
    .marker {
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
        margin-top: 10px;
        background-color: #fafafa;
        .address,
        .coordinate,
        .name,
        .remove {
            padding: 15px 15px 15px 45px;
        }
        .address input,
        .name input {
            width: 100%;
        }
        .remove .btn {
            width: 25px;
            height: 25px;
            color: white;
            background-color: #ce003b;
            border-radius: 20px;
            font-size: 0.8em;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
    }
    .footer {
        margin-top: 50px;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .add-btn {
        padding: 5px 20px;
        text-align: center;
        color: white;
        background-color: #1763a9;
        width: auto;
        border-radius: 20px;
        font-size: 0.9em;
        cursor: pointer;
    }
}
</style>