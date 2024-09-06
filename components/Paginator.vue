<script setup lang="ts">
interface IProps {
    countPages: number,
    currentPage: number,
}
const { countPages, currentPage } = defineProps<IProps>();
const emit = defineEmits<{
    (e: "changePage", id: number): void
}>();




</script>

<template>
    <div class="ml-8 mb-4 flex flex-row gap-4">
        <span v-for="page in countPages" @click="emit('changePage', page)" :key="page"
            class="cursor-pointer py-1 px-3 border-2 border-gray-400 rounded-full">
            {{ page }}
        </span>
    </div>
</template>