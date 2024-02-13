const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var mysql = require('mysql');

var db = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "1234",
    database: "dbtheory_task" //db name
});

db.connect(function(err) {
    if (err) throw err;  
    console.log('DB connected'); 
});

app.set('view engine', 'ejs');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    var page = parseInt(req.query.page) || 1;

    var sql = 'select * from post order by postID desc';  
    db.query(sql, function (err, rows, fields) {
        if(err) console.log('select fail...\n' + err);
        var howmanyposts = rows.length;
        var howmanypages = Math.ceil(howmanyposts / 10);
        // res.render('mainpage.ejs', {list : rows});
        const posts = rows.slice((page - 1) * 10, (page - 1) * 10 + 10);
        console.log(posts.length); // posts num in a page
        console.log(rows.length); //all posts num
        res.render('mainpage', { list : posts, thispage: page, howmanypages });
    });
});


// app.get('/', (req, res) => {
//     const perPage = 10;
//     const page = parseInt(req.query.page) || 1;
  
//     // 게시글 조회 쿼리(고유넘버 내림차순별 구성해놓기 페이징시 넘버링 편하게할수있음)
//     db.query('SELECT * FROM post ORDER BY postID DESC', (err, results) => {
//       if (err) throw err;
  
//       const totalPosts = results.length;
//       const totalPages = Math.ceil(totalPosts / perPage);
  
//       // 게시글 범위 계산 페이징 입력 값
//       const startIndex = (page - 1) * perPage;
//       const endIndex = startIndex + perPage;
  
//       const posts = results.slice(startIndex, endIndex);
  
//       res.render('mainpage', { posts, currentPage: page, totalPages, perPage });
//     });
//   });
  

app.get('/posting', function (req, res) {
    res.render('posting.ejs');
});

app.post('/postingL', function (req, res) {
    var body = req.body;
    var params = [body.title, body.author, body.content];
    var sql = 'insert into post(title, author, content, date) values (?, ?, ?, NOW())';
    db.query(sql, params, function(err) {
        if(err) console.log('insert fail\n' + err);
        else res.redirect('/');
    });
});

app.get("/post:postID", function (req, res) {
    db.query('select * from post where postID = ?', [req.params.postID], function (error, result1) {
        var post = result1[0];
        db.query('select * from comment where postID = ?', [req.params.postID], function (error, comment) {
            res.render('post.ejs', {post, comment});
        });
    });
});

app.get("/delete:postID", function (req, res) {
    db.query('delete from post where postID = ?', [req.params.postID], function (err) {
        if(err) console.log('delete fail\n' + err);
        res.redirect('/');
    });
    //댓글 유무에 따라 댓글 먼저 삭제해야 하나? cascade라 안 해도 괜찮네..
});

app.post('/commenting:postID', (req, res) => {
    var body = req.body;
    var params = [req.params.postID, body.content ,body.author];
    var sql = 'insert into comment(postID, content, author, date) values (?, ?, ?, NOW())';
    db.query(sql, params, function(err) {
        if(err) console.log('insert fail\n' + err);
        res.redirect('back');
    });
});
 
app.post('/commentdelete:commentID', (req, res) => {
    db.query('delete from comment where commentID = ?', [req.params.commentID], function (err) {
        if(err) console.log('delete fail\n' + err);
        res.redirect('back');
    });
});
  
app.listen(3000);
