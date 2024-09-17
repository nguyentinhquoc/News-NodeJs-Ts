import news from "./../models/news-model";
async function allNews(): Promise<any> {
    try {
        return await news.find({});
    } catch (err) {
        throw new Error('Lỗi err' + err);
    }
}
async function oneNews(slug: string): Promise<any> {
    try {
        return await news.findOne({ slug: slug });
    } catch (err) {
        throw new Error('Lỗi err' + err);
    }
}
export { allNews, oneNews };
