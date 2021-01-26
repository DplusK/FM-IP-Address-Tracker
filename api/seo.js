module.exports = function (req, res, next) {
    res.setHeader('Referrer-Policy', 'origin-when-cross-origin')
    res.setHeader('X-Frame-Options', 'SAMEORIGIN')
    next()
}