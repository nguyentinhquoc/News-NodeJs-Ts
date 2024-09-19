import users from "../models/users-model";
async function allUsers(): Promise<any> {
  try {
    return await users.find({});
  } catch (err) {
    throw new Error('Lỗi err' + err);
  }
}
async function oneUsers(id: string): Promise<any> {
  try {
    return await users.findOne({ id: id });
  } catch (err) {
    throw new Error('Lỗi err' + err);
  }
}
async function createUser(data: object): Promise<any> {
  try {
    return await users.create(data);
  } catch (err) {
    throw new Error('Lỗi err' + err);
  }
}
async function checkDataRegister(data: Array<object>): Promise<boolean> {
  try {
    if ((await users.find({ $or: data })).length < 1) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error('Lỗi err' + err);
  }
}
async function checkDataLogin(data: Array<object>): Promise<boolean> {
  try {
    if ((await users.find({ $and: data })).length > 0) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error('Lỗi err' + err);
  }
}
async function checkAdmin(userName: string): Promise<boolean> {
  try {
    let user = await users.findOne({ username: userName })
    if (user && user.admin == 1) {
      return true;
    }
    return false;
  } catch (err) {
    throw new Error('Lỗi err' + err);
  }
}
export { allUsers, oneUsers, createUser, checkDataRegister, checkDataLogin, checkAdmin };