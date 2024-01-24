const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler())
        // we also use .catch method in the place of reject
        .reject((err) => next(err))
    }
}

export { asyncHandler }

















// another method which is using  try catch 

// const asyncHandler = (fn) => async (req, res, next) => {
//     try{
//         await fn(req, res, next)
//     }catch(error){
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }