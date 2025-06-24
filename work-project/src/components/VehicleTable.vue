<script setup>
defineProps({
  vehicles: {
    type: Array,
    required: true,
  },
});

const getVehicleClass = (vehicle) => {
  if (vehicle.speed < 50) return 'bg-green-100 text-green-800';
  if (vehicle.speed < 80) return 'bg-orange-100 text-orange-800';
  return 'bg-red-100 text-red-800';
};
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4 text-gray-700">Vehicle List</h2>
    <div class="overflow-x-auto max-h-[600px]">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50 sticky top-0">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Speed (km/h)</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="vehicles.length === 0">
            <td colspan="3" class="px-6 py-4 text-center text-gray-500">Loading data...</td>
          </tr>
          <tr v-for="vehicle in vehicles" :key="vehicle.id" :class="getVehicleClass(vehicle)" class="transition-colors duration-300">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">{{ vehicle.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">{{ vehicle.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold">{{ vehicle.speed }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>