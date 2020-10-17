import Vue from 'vue'
import VueMapbox, { MglMap, MglMarker } from 'vue-mapbox'
import Mapbox from 'mapbox-gl'

Vue.use(VueMapbox, { mapboxgl: Mapbox })
Vue.component('MglMap', MglMap)
Vue.component('MglMarker', MglMarker)
