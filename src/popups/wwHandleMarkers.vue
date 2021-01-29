<template>
    <div class="ww-markers-popup ww-scroll-bar">
        <div class="markers-wrapper" v-for="(marker, index) in markers" :key="index">
            <div class="marker-wrapper">
                <div class="name input">
                    <label for="name">Name</label> <br />
                    <input
                        v-model="marker.name"
                        name="name"
                        type="text"
                        class="ww-editor-input -large invit-input"
                        @input="setResult($event)"
                    />
                </div>
                <div class="coord input">
                    <label for="adress">Latitude</label> <br />
                    <input
                        v-model="marker.lat"
                        name="adress"
                        type="text"
                        class="ww-editor-input -large invit-input"
                        @input="setResult($event)"
                    />
                </div>
                <div class="coord input">
                    <label for="adress">longitude</label> <br />
                    <input
                        v-model="marker.lng"
                        name="adress"
                        type="text"
                        class="ww-editor-input -large invit-input"
                        @input="setResult($event)"
                    />
                </div>
            </div>
            <div class="remove-active-marker">
                <wwManagerRadio
                    class="toggle-marker"
                    :value="true"
                    v-model="marker.isActive"
                    @change="setResult($event)"
                ></wwManagerRadio>
                <wwEditorIcon
                    @click="removeMarker(index)"
                    class="remove-user-icon"
                    name="delete"
                    :class="{ disabled: lastField }"
                />
            </div>
        </div>

        <div class="add-marker-wrapper">
            <button class="ww-editor-button -icon -primary" @click="addMarker">
                <wwEditorIcon class="ww-editor-button-icon -left" name="add" small />
                Add Markers
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'wwHandleMarkers',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            markers: [],
        };
    },
    computed: {
        lastField() {
            return this.markers.length < 2;
        },
    },
    methods: {
        addMarker() {
            this.markers.push({
                name: '',
                lat: '',
                lng: '',
                isActive: true,
            });
            this.setResult();
        },
        removeMarker(index) {
            if (this.lastField) return;
            this.markers.splice(index, 1);
            this.setResult();
        },
        setResult() {
            this.options.result.markers = this.markers;
        },
    },
    mounted() {
        this.markers = this.options.data.options.markers;
        this.setResult();
    },
};
</script>

<style scoped lang="scss">
.ww-markers-popup {
    .markers-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;

        .marker-wrapper {
            width: 80%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;

            .input {
                width: 100%;
                margin-bottom: 24px;

                &.name {
                    width: 140%;
                }

                label {
                    font-size: var(--ww-font-size-02);
                    color: var(--ww-color-dark-400);
                    font-weight: 600;
                }

                input {
                    margin-top: 2px;
                    width: 95%;
                }
            }
        }
        .remove-active-marker {
            margin: auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .toggle-marker {
                margin-right: 10px;
                transform: translateY(-2px);
            }

            .remove-user-icon {
                color: var(--ww-color-dark-500);
                &:hover {
                    color: var(--ww-color-red-500);
                    cursor: pointer;
                    transition: 0.3s;
                }
                &.disabled {
                    cursor: no-drop;
                    color: var(--ww-color-dark-400);
                }
            }
        }
    }

    .add-marker-wrapper {
        margin-top: 24px;
    }
}
</style>
