exports.requireTitle = function (req, res, next) {
    const title = req.body.title;
    if (title) {
    next();
    } else {
    res.error('Title is required.');
    res.redirect('/post');
    }
    }
exports.requireTitleLengthAbove = function(len) {
    return (req, res, next) => {
    const title = req.body.title;
    if (title.length > len) {
    next();
    } else {
    res.send(`Title must be longer than ${len}.`);
    res.redirct('/post');
    }
    }
    }
    