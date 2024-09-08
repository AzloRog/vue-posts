<template>
    <div v-if="status == 'pending'" class="min-h-[100vh] flex items-center justify-center">
        <div class="loader"></div>
    </div>
    <ul v-else class="pb-6">
        <li v-for="post in data!.posts" :key="post.id">
            <Post v-bind="post" />
        </li>
    </ul>
    <Paginator :count-pages="perPage" :current-page="currentPage" @change-page="(id) => handleChangePage(id)" />
</template>


<script setup lang="ts">
import type IPost from "../types/post-type";
import { useFetchAsyncPaginatedData } from "~/composables/useFetchAsyncPaginatedData";

const currentPage = ref<number>(1);

const handleChangePage = (id: number) => {
    currentPage.value = id;
}

const DATA_URL = "https://jsonplaceholder.typicode.com/posts";
const PERPAGE_LIMIT = 10;

//const { data, error, status, refresh, execute } = await useAsyncData(`posts/${currentPage.value}`, async () => {
//    const currPage = Math.random();
//    console.log(currentPage.value);
//    const res = await $fetch.raw<IPost[]>(DATA_URL, {
//        query: { "_limit": 10, "_page": currentPage.value },
//
//    })
//
//    const totalElements = Number(res.headers.get("x-total-count"));
//    console.log(currentPage);
//    const totalPages = totalElements / PERPAGE_LIMIT;
//
//    return {
//        posts: res._data,
//        count: totalPages
//    }
//}, {
//    watch: [currentPage]
//})
//
const { data, execute, status, error } = await useFetchAsyncPaginatedData<IPost>(
    currentPage,
    DATA_URL,
    PERPAGE_LIMIT,
    currentPage,
    "x-total-count"
);

let perPage = 10;

</script>