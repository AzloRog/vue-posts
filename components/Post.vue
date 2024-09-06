<script setup lang="ts">
import type IPost from '../types/post-type';
import { ref } from 'vue';
const { id, userId, title, body } = defineProps<IPost>();

const posts = ref<IPost[]>([]);
const page = ref<number>(1);
</script>

<template>
    <div class="p-4 border border-red-300 relative ">
        <h2 class="text-2xl font-semibold">{{ title }}</h2>
        <p class="mt-4 pl-8">{{ body }}</p>
        <div class="absolute top-2 right-3"><span class="font-semibold">userId:</span> {{ userId }}</div>
    </div>
</template>
