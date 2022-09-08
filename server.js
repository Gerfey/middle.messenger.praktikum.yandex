const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', express.static(path.join(__dirname, 'dist')));

const indexPath = path.join(__dirname, 'dist', 'index.html');

app.get('*', (req, res) => {
    res.sendFile(indexPath);
});


app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
