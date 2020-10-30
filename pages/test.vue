<template>
  <div id="map">
    <button type="button" @click="show = !show">show = {{ show }}</button>
    <MglMap
      :access-token="accessToken"
      :map-style="mapStyle"
      :center="center"
      :zoom="zoom"
    >
      <MglGeojsonLayer
        v-if="show"
        :source-id="geoJsonSource.data.id"
        :source="geoJsonSource"
        :layer-id="geoJsonLayer.id"
        :layer="geoJsonLayer"
      />

      <MglGeojsonLayer
        v-if="show"
        :source-id="geoJsonSource2.data.id"
        :source="geoJsonSource2"
        :layer-id="geoJsonLayer2.id"
        :layer="geoJsonLayer2"
      />
    </MglMap>
  </div>
</template>

<script>
import { MglMap, MglGeojsonLayer } from 'vue-mapbox'

export default {
  components: {
    MglMap,
    MglGeojsonLayer,
  },
  data() {
    return {
      accessToken:
        'pk.eyJ1IjoibWlrZWhhbWlsdG9uMDAiLCJhIjoiNDVjS2puUSJ9.aLvWM5BnllUGJ0e6nwMSEg', // your access token. Needed if you using Mapbox maps
      show: false,
      mapStyle: 'mapbox://styles/mapbox/streets-v11', // your map style
      center: [-122.486052, 37.830348],
      zoom: 14,
      showPath: true,
      geoJsonSource: {
        type: 'geojson',
        data: {
          id: 'points',
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [-122.483, 37.833],
              },
            },
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [-122.493, 37.833],
              },
            },
          ],
        },
      },
      geoJsonSource2: {
        type: 'geojson',
        data: {
          id: 'points2',
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [-122.483, 37.832],
              },
            },
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: [-122.493, 37.832],
              },
            },
          ],
        },
      },
      geoJsonLayer: {
        id: 'points',
        type: 'circle',
        paint: {
          'circle-radius': 6,
          'circle-color': '#ffffff',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#000000',
        },
      },
      geoJsonLayer2: {
        id: 'points2',
        type: 'circle',
        paint: {
          'circle-radius': 6,
          'circle-color': '#ff0000',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#000000',
        },
      },
    }
  },
}
</script>
