<script setup>
import { ref, onMounted, watch } from 'vue';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Circle, Fill } from 'ol/style';
import TileJSON from 'ol/source/TileJSON';

const props = defineProps({
  vehicles: {
    type: Array,
    required: true,
  },
});

const mapContainer = ref(null);
let map = null;
let vehiclesLayer = null;

const getVehicleColor = (speed) => {
  if (speed < 50) return 'green';
  if (speed < 80) return 'orange';
  return 'red';
};

const updateVehiclesOnMap = (vehicles) => {
  if (!vehiclesLayer) return;

  const source = vehiclesLayer.getSource();
  source.clear();

  vehicles.forEach((vehicle) => {
    const marker = new Feature({
      geometry: new Point(fromLonLat([vehicle.longitude, vehicle.latitude])),
    });

    marker.setStyle(
      new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: getVehicleColor(vehicle.speed) }),
        }),
      })
    );
    source.addFeature(marker);
  });
};

onMounted(() => {
  if (mapContainer.value) {
    vehiclesLayer = new VectorLayer({
      source: new VectorSource(),
    });

    map = new Map({
      target: mapContainer.value,
      layers: [
        new TileLayer({
          source: new TileJSON({
            url: 'https://api.maptiler.com/maps/basic-v2/tiles.json?key=cDK2WaroaH9jSoMSgxSn', // Your key
            tileSize: 512,
          }),
        }),
        vehiclesLayer,
      ],
      view: new View({
        center: fromLonLat([18.77048, 49.21583]),
        zoom: 12,
      }),
    });
    updateVehiclesOnMap(props.vehicles);
  }
});

watch(() => props.vehicles, (newVehicles) => {
    updateVehiclesOnMap(newVehicles);
}, { deep: true });

</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-2xl font-semibold mb-4 text-gray-700">Map</h3>
    <div ref="mapContainer" class="w-full h-[400px] rounded-md"></div>
  </div>
</template>