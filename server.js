const express = require('express');
const bodyParser = require('body-parser');
const marked = require('marked');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'hbs');

app.get('/', function(req,res) {
  res.render('home.hbs', {
    title: 'Home'
  });
});

app.put('/documents/:filepath', function(req,res) {
  let filepath = './data/' + req.params.filepath;
  let contents = req.body.contents;
  fs.writeFile(filepath, contents, function(err) {
    if(err){
        res.status(500);
        res.json({ message: "Couldn't save file because: " + err.message });
    } else{
      res.json({ message: "File " + filepath + ' saved.'});
    }
  });
});


app.get('/documents/:filepath', function(req,res) {
  let filepath = 'data/' + req.params.filepath;
  // let contents = req.body.contents;
  fs.readFile(filepath, function(err,　buffer) {
    if(err){
      res.status(500);
      res.json({ message: "Couldn't show file details because: " + err.message});
    } else{
      let contents = buffer.toString();
      res.json({
        filepath: filepath,
        contents: contents
      });
    }
  });
});

app.get('/documents/:filepath/display', function(req, res) {
  let filepath = 'data/' + req.params.filepath;
  // let contents = req.body.contents;
  fs.readFile(filepath, function(err, buffer){
    if(err){
      res.status(500);
      res.json({ message: "Couldn't display file details because: " + err.message});
    } else{
      let contents = marked(buffer.toString());
      res.render('display.hbs', {
        title: filepath,
        contents: contents
      });
    }
  });
});



app.listen(3000, function() {
  console.log('Example app listening on part 3000');
});
