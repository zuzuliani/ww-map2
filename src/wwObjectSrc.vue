<template>
	<div class="ww-icon">
		<div class="ww-icon-container">
			<div v-bind:class="[wwObject.content.data.icon]" aria-hidden="true"></div>
		</div>
	</div>
</template>
 

<script>
export default {
	name: "ww-icon",
	props: {
		wwObject: {
			type: Object,
			default: {}
		},
		wwAttrs: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {

		}
	},
	computed: {
	},
	watch: {
	},
	beforeDestroy() { },
	methods: {
		init() {

		}
	},
	mounted() {
		this.init()

		wwLib.wwElementsStyle.applyAllStyles({
			wwObject: this.wwObject,
			lastWwObject: null,
			element: this.$el,
			noAnim: this.wwAttrs.wwNoAnim,
		});
	}
};
</script>

<style scoped>
.ww-icon {
  text-align: center;
}

.ww-icon-container {
  display: inline-flex;
  justify-content: center;
}

.ww-icon-container > div {
  align-self: center;
}

.ww-button-wrapper {
  width: 100%;
  height: 100%;
  text-align: center;
  /*margin-bottom: 10px;*/
}

.ww-button {
  display: inline-block;
}
/* ww-class-btn-bg */
.ww-class-btn-bg-none {
  background-color: rgba(0, 0, 0, 0) !important;
}

/* ww-class-btn-border */
.ww-class-btn-border-none {
  border: none !important;
}

.ww-class-btn-border-small {
  border-style: solid !important;
  border-width: 1px !important;
}

.ww-class-btn-border-medium {
  border-style: solid !important;
  border-width: 2px !important;
}

.ww-class-btn-border-big {
  border-style: solid !important;
  border-width: 5px !important;
}

/* ww-class-btn-format */
.ww-class-btn-format-square {
  border-radius: 0 !important;
}

.ww-class-btn-format-round-small {
  border-radius: 5px !important;
}

.ww-class-btn-format-round-medium {
  border-radius: 10px !important;
}

.ww-class-btn-format-round-big {
  border-radius: 500px !important;
}

/* ww-class-btn-padding */
.ww-class-btn-padding-none {
  padding: 0 !important;
}

.ww-class-btn-padding-small {
  padding: 5px 10px !important;
}

.ww-class-btn-padding-medium {
  padding: 10px 20px !important;
}

.ww-class-btn-padding-big {
  padding: 20px 40px !important;
}

/* ww-class-btn-shadow */
.ww-class-btn-shadow-box-small {
  -webkit-box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 0px 0px 5px 0px rgba(50, 50, 50, 0.75);
}

.ww-class-btn-shadow-box-medium {
  -webkit-box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 0px 0px 10px 0px rgba(50, 50, 50, 0.75);
}

.ww-class-btn-shadow-box-big {
  -webkit-box-shadow: 0px 0px 20px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0px 0px 20px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 0px 0px 20px 0px rgba(50, 50, 50, 0.75);
}

.ww-class-btn-shadow-bottom-small {
  -webkit-box-shadow: 0px 2px 5px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0px 2px 5px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 0px 2px 5px 0px rgba(50, 50, 50, 0.75);
}

.ww-class-btn-shadow-bottom-medium {
  -webkit-box-shadow: 0px 3px 10px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0px 3px 10px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 0px 3px 10px 0px rgba(50, 50, 50, 0.75);
}

.ww-class-btn-shadow-bottom-big {
  -webkit-box-shadow: 0px 7px 20px 0px rgba(50, 50, 50, 0.75);
  -moz-box-shadow: 0px 7px 20px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 0px 7px 20px 0px rgba(50, 50, 50, 0.75);
}

/* ww-class-btn-width */
.ww-class-btn-width-full {
  width: 100% !important;
}
</style>
