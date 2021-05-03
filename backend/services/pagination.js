//MODIFICACIONES: LIMITE Y BASE URL COMO VARIABLES DE ENTORNO
const getPagination = (page, size) => {
    const limit = size ? +size : Number(String(process.env.PAGE_SIZE)); 
    const offset = page ? page * limit : 0;
    return { limit, offset };
}
      
const getPagingData = (data, page, limit, endpoint) => {

    let { count: count, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(count / limit);
    count=items.length;

    let previousPage;
    if (currentPage > 0) {
        previousPage = `${process.env.BASE_URL}${endpoint}?page=${currentPage - 1}&size=${limit}`
    }
    let nextPage;
    if (items.length == limit) {
        nextPage = `${process.env.BASE_URL}${endpoint}?page=${currentPage+ 1}&size=${limit}`
    }

    return { count, items, totalPages, currentPage, previousPage, nextPage };
}

module.exports = {getPagination, getPagingData};