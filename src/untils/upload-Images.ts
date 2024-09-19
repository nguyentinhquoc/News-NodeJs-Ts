import multer from 'multer';

// Cấu hình lưu trữ cho avatar
const storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images/user');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg');
    }
});
const uploadAvatar = multer({
    storage: storageAvatar
});
// Cấu hình lưu trữ cho sản phẩm
const storageNews = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images/news');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg');
    }
});

// Tạo các middleware upload

const uploadNews = multer({
    storage: storageNews
});
// Export các middleware
export {
    uploadAvatar,
    uploadNews
};
