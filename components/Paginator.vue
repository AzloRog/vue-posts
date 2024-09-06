<script setup lang="ts">
interface IProps {
    countPages: number,
    currentPage: number,
}
const { countPages, currentPage } = defineProps<IProps>();

console.log(countPages);

</script>

<template>
    <div>
        <span v-for="page in countPages" :key="page">
            <span>{{ page }}</span>
        </span>
    </div>
</template>