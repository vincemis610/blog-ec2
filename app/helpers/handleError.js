const handleError = (res, err) => {
    res.status(500);
    return res.json({error: err})
}

module.exports = { handleError }