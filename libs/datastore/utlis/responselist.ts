export async function listResponse(model, queryObject, items, query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const total = await model.countDocuments(queryObject).exec()
    return { total, items, page, limit }
}
