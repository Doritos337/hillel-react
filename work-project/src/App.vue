<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import VehicleTable from './components/VehicleTable.vue';
import VehicleSummary from './components/VehicleSummary.vue';
import VehicleMap from './components/VehicleMap.vue';

// --- STATE ---
const count = ref(100);
const vehicles = ref([]);
const isLoading = ref(false);

// --- COMPUTED PROPERTIES ---
const averageSpeed = computed(() => {
  if (vehicles.value.length === 0) return 0;
  const totalSpeed = vehicles.value.reduce((sum, vehicle) => sum + vehicle.speed, 0);
  return (totalSpeed / vehicles.value.length).toFixed(2);
});

const countSpeedRange = (min, max) => {
    return computed(() => vehicles.value.filter(v => v.speed >= min && v.speed < max).length);
};

const vehiclesUnder50 = countSpeedRange(0, 50);
const vehiclesBetween50And80 = countSpeedRange(50, 80);
const vehiclesAbove80 = countSpeedRange(80, Infinity);


// --- METHODS ---
const generateVehicles = async () => {
  if (count.value < 100 || count.value > 500) {
    alert('Invalid count. Please enter a number between 100 and 500.');
    return;
  }
  isLoading.value = true;
  try {
    const response = await axios.get(`http://localhost:3000/vehicles?count=${count.value}`);
    vehicles.value = response.data;
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    alert("Failed to load data. Please make sure the server is running.");
  } finally {
    isLoading.value = false;
  }
};

// --- LIFECYCLE HOOKS ---
onMounted(() => {
  generateVehicles();
  setInterval(generateVehicles, 30000);
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen font-sans p-4 sm:p-6 lg:p-8">
    <div class="max-w-7xl mx-auto">
      <header class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800">Vehicle Dashboard</h1>
        <p class="text-gray-500">Real-time display and analysis of vehicle data</p>
      </header>

      <div class="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 class="text-2xl font-semibold mb-4 text-gray-700">Vehicle Generator</h2>
        <div class="flex items-center space-x-4">
          <label for="vehicle-count" class="text-gray-600">Number of vehicles (100-500):</label>
          <input
            id="vehicle-count"
            type="number"
            v-model.number="count"
            min="100"
            max="500"
            class="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <button
            @click="generateVehicles"
            :disabled="isLoading"
            class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Loading...' : 'Generate' }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <VehicleTable :vehicles="vehicles" />
        </div>
        <div class="space-y-8">
          <VehicleSummary
            :avg-speed="averageSpeed"
            :slow-count="vehiclesUnder50"
            :medium-count="vehiclesBetween50And80"
            :fast-count="vehiclesAbove80"
          />
          <VehicleMap :vehicles="vehicles" />
        </div>
      </div>
    </div>
  </div>
</template>