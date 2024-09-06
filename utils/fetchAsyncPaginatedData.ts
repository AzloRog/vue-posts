const fetchAsyncPaginatedData = async <Type>(dataUrl: string, perPageLimit: number, currentPage: number, headerCountFieldName: string) => {
    const { data, error } = await useAsyncData(async () => {
        const res = await $fetch.raw<Type[]>(dataUrl, {
            query: { "_limit": perPageLimit, "_page": currentPage },
        })
    
        const totalElements = Number(res.headers.get(headerCountFieldName));
        console.log(totalElements)
        const totalPages = totalElements / perPageLimit;
    
        return {
            posts: res._data,
            count: totalPages
        }})
    return {data, error}
        
}

export default fetchAsyncPaginatedData;