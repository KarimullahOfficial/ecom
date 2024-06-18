
interface ISortPaging {
    sort: any;
    skip: number;
    limit: number;
}


export function getSortPaging(query): ISortPaging {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    let sort: any = { createdAt: -1 };


    if (query?.sort && query.order) {
        const newSort = {};
        newSort[query?.sort] = query.order;
        sort = newSort;
    }

    return { sort, skip: (page - 1) * limit, limit };
}
