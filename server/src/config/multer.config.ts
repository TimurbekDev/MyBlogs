export const multerConfig = () => (
    multe.diskStorage({
        destination: function (__, file, cb) {
            cb(null, '/tmp/my-uploads')
        },
        filename: function (_, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix)
        }
    })
)