<template>
    <div v-if="pending" class="min-h-[100vh] flex items-center justify-center">
        <div class="loader"></div>
    </div>
    <ul v-else class="pb-6">
        <li v-for="post in data" :key="post.id">
            <Post v-bind="post" />
        </li>
    </ul>
    <Paginator :count-pages="perPage" :current-page="currentPage" @change-page="(id) => currentPage = id" />
</template>


<script setup lang="ts">
import type IPost from "../types/post-type";
import { ref } from "vue";
import { useFetch } from "nuxt/app";

const DATA_URL = "https://jsonplaceholder.typicode.com/posts";
const PERPAGE_LIMIT = 10;

const currentPage = ref<number>(1);
let perPage = 10;

const { data, pending } = useFetch<IPost[]>(DATA_URL, {
    query: { "_limit": PERPAGE_LIMIT, "_page": currentPage },
    watch: [currentPage],
    //onResponse: ({ response }) => {
    //    perPage = Number(response.headers.get("x-total-count"));
    //} I DONT KNOW, ну не получается, чтобы получилось нужно времени куча, сбрасывается просто до значения по умолчанию.
})
</script>