export async function listenResponse(model, query, items, queryobject) {
    const page = query.page | 1;
    const limit = query.limit | 10;
    const total = await model.countDocument(queryobject).exec()
    return { items, page, limit, total }

}