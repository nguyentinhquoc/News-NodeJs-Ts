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
// Cấu hình lưu trữ cho sản phẩm
const storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg');
    }
});

// Tạo các middleware upload
const uploadAvatar = multer({
    storage: storageAvatar
});
const uploadNews = multer({
    storage: storageProduct
});
// Export các middleware
export {
    uploadAvatar,
    uploadNews
};
