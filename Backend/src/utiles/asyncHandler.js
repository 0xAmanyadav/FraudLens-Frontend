const asyncHandler = function (reqfn) {
    return (req, res, next) => {
        Promise.resolve(reqfn(req, res, next))
        .catch((error) => next(error))
    }

}


export { asyncHandler }