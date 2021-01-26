module.exports = function (req, res, next) {
    const redirect = redirects.find(r => r.from === req.url)
    if (redirect) {
        res.end()
    } else {
        res.setHeader('Referrer-Policy', 'origin-when-cross-origin')
        res.setHeader('X-Frame-Options', 'SAMEORIGIN')
        next()
    }
}