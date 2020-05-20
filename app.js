const express = require("express");
const path = require("path");
const pageRouter = require("./routes/pages");

const app = express();

app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// router
app.use('/', pageRouter);

// page not found
app.use((req, res, next)=>{
    var err = new Error("Trang khn4g tim thay");
    err.status = 404;
    next(err);
});
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send(err.message);
});
//.....................................
app.listen(4500, ()=>{
    console.log("server running in port 4500 ...");
});

module.exports = app;