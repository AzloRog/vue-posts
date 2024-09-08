<template>
    <div v-if="status == 'error'">
        <h1 class="text-red-600 text-2xl font-semibold">Fatal Error</h1>
        <pre>{{ error?.message }}</pre>
    </div>
    <div v-else-if="status == 'pending'" class="min-h-[100vh] flex items-center justify-center">
        <div class="loader"></div>
    </div>

    <div v-else>
        <ul class="pb-6">
            <li v-for="post in data!.posts" :key="post.id">
                <Post v-bind="post" />
            </li>
        </ul>

        <Paginator :count-pages="data!.count" :current-page="currentPage" @change-page="(id) => handleChangePage(id)" />

    </div>
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

const { data, status, error } = await useFetchAsyncPaginatedData<IPost>(
    currentPage,
    DATA_URL,
    PERPAGE_LIMIT,
    currentPage,
    "x-total-count"
);


</script>