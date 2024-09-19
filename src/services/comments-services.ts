import Comment from "../models/comments-model";

async function createComments(data: object): Promise<any> {
  try {
    return await Comment.create(data);
  } catch (err) {
    console.error('Error creating comments:', err);
    throw err;
  }
}
async function loadCommentsDetailNews(newsId: object): Promise<any> {
  try {
    return await Comment.find({ news: newsId }).populate('users');
  } catch (err) {
    console.error('Error loading comments:', err);
    throw err;
  }
}
async function loadAllComment(): Promise<any> {
  try {
    return await Comment.find({}).populate('users').populate('news');
  } catch (err) {
    console.error('Error loading comments:', err);
    throw err;
  }
}
async function deleteComments(id: string): Promise<any> {
  try {
    return await Comment.deleteOne({ _id: id });
  } catch (err) {
    console.error('Error deleting comments:', err);
    throw err;
  }
}
export { createComments, loadCommentsDetailNews, loadAllComment, deleteComments };