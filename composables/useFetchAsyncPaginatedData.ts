export const useFetchAsyncPaginatedData = async <Type>(
        watchElement: Ref,
        dataUrl: string, 
        perPageLimit: number, 
        currentPage: Ref, // сохранение реактивности таким образом?  
        headerCountFieldName: string
    ) => {
    const { data, error, status, refresh, execute } = await useAsyncData(`posts/${currentPage.value}`, async () => {
        const currPage = Math.random();
        const res = await $fetch.raw<Type[]>(dataUrl, {
            query: { "_limit": perPageLimit, "_page": currentPage.value },
            
        })
    
        const totalElements = Number(res.headers.get(headerCountFieldName));
        const totalPages = totalElements / perPageLimit;
    
        return {
            posts: res._data,
            count: totalPages
        }}, {
            watch: [watchElement]
        })
    return {data, status, refresh, error, execute}
        
}

