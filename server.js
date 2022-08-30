const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('./dist/'));

app.use(function(req, res) {
    res.send('404: Page not Found', 404);
});

app.use(function(error, req, res, next) {
    res.send('500: Internal Server Error', 500);
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});