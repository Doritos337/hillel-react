<script setup>
defineProps({
    avgSpeed: [Number, String],
    slowCount: Number,
    mediumCount: Number,
    fastCount: Number
});
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-2xl font-semibold mb-4 text-gray-700">Summary</h3>
    <ul class="space-y-3">
      <li class="flex justify-between items-center">
        <span class="text-gray-600">Average Speed:</span>
        <span class="font-bold text-lg text-blue-600">{{ avgSpeed }} km/h</span>
      </li>
      <li class="flex justify-between items-center">
        <span class="text-gray-600">Vehicles &lt; 50 km/h:</span>
        <span class="font-bold text-lg text-green-600">{{ slowCount }}</span>
      </li>
      <li class="flex justify-between items-center">
        <span class="text-gray-600">Vehicles 50-80 km/h:</span>
        <span class="font-bold text-lg text-orange-500">{{ mediumCount }}</span>
      </li>
      <li class="flex justify-between items-center">
        <span class="text-gray-600">Vehicles &gt; 80 km/h:</span>
        <span class="font-bold text-lg text-red-600">{{ fastCount }}</span>
      </li>
    </ul>
  </div>
</template>