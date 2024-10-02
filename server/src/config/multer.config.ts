import { diskStorage } from 'multer';
import { join } from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: function (__, file, cb) {
      cb(null, join(__dirname, '..', '..','uploads'));
    },
    filename: function (_, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
    },
  }),
};

