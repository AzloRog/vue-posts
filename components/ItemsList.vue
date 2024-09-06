<template>
    <ul>
        <li v-for="post in data!.posts" :key="post.id">
            <Post v-bind="post" />
        </li>
    </ul>
    <Paginator :count-pages="data!.count" :current-page="currentPage" />
</template>


<script setup lang="ts">
import type IPost from "../types/post-type";
import { ref } from "vue";
import { useFetch } from "nuxt/app";

const DATA_URL = "https://jsonplaceholder.typicode.com/posts";
const PERPAGE_LIMIT = 10;

const currentPage = ref<number>(1);

const { data, error } = await useAsyncData(async () => {
    const res = await $fetch.raw<IPost[]>(DATA_URL, {
        query: { "_limit": PERPAGE_LIMIT, "_page": currentPage },
    })

    const totalElements = Number(res.headers.get("x-total-count"));
    console.log(totalElements)
    const totalPages = totalElements / PERPAGE_LIMIT;

    return {
        posts: res._data,
        count: totalPages
    }
})

</script>