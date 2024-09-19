import Comment from "../models/comments-model";

async function createComments(data: object): Promise<any> {
  try {
    return await Comment.create(data);
  } catch (err) {
    console.error('Error creating comments:', err);
    throw err;
  }
}
export { createComments };