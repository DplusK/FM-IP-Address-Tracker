import Vue from 'vue';
import 'leaflet/dist/leaflet.css';
import {
  LMap,
  LTileLayer,
  LMarker,
  LIconDefault
} from 'vue2-leaflet';
import L from "leaflet";

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);

export default {
  name: "Map",
}