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
async function loadObjIdUsers(username: string): Promise<any> {
  try {
    const usersItem = await users.findOne({ username: username });
    return usersItem?._id;
  } catch (err) {
    console.error('Error creating users:', err);
    throw err;
  }
}
async function changeStatus(username: string): Promise<any> {
  let user = await users.findOne({ username: username })
  if (user?.status == 1) {
    await users.updateOne({ username }, { status: 0 });
  } else {
    await users.updateOne({ username }, { status: 1 });
  }
}
async function changeRole(username: string): Promise<any> {
  let user = await users.findOne({ username: username })
  if (user?.admin == 1) {
    await users.updateOne({ username }, { admin: 0 });
  } else {
    await users.updateOne({ username }, { admin: 1 });
  }
}

export {
  allUsers, oneUsers, createUser, checkDataRegister, checkDataLogin, checkAdmin, loadObjIdUsers, changeStatus,
  changeRole
};