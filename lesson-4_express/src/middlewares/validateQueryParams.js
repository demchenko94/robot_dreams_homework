export const validateQueryParams = schema => (req, res, next) => {
    const result = schema.safeParse(req.query);
    console.log(result);

    if (!result.success) {
        return res
            .status(400)
            .json({errors: result.error.format(), where: 'query'});
    }

    Object.assign(req.query, result.data);
    next();
};
