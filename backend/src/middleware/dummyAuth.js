module.exports = (req, res, next) => {
    req.user = {
        id: parseInt(req.header('x-user-id')) || 1,
        role: req.header('x-user-role') || 'USER',
    };
    next();
};