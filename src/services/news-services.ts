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
async function createNews(data: object): Promise<any> {
    try {
        const newsItem = await news.create(data);
        return newsItem;
    } catch (err) {
        console.error('Error creating news:', err);
        throw err;
    }
}
async function editNews(data: object, slug: string): Promise<any> {
    try {
        const newsItem = await news.updateOne({ slug }, data);
        return newsItem;
    } catch (err) {
        console.error('Error creating news:', err);
        throw err;
    }
}
async function removeNews(slug: string): Promise<any> {
    try {
        const newsItem = await news.deleteOne({slug});
        return newsItem;
    } catch (err) {
        console.error('Error creating news:', err);
        throw err;
    }
}
async function loadObjIdNews(slug: string): Promise<any> {
    try {
        const newsItem = await news.findOne({ slug: slug });
        return newsItem?._id;
    } catch (err) {
        console.error('Error creating news:', err);
        throw err;
    }
}
export { allNews, oneNews, createNews, editNews, removeNews, loadObjIdNews };
