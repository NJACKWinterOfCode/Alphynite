var express = require('express');
var bcrypt= require('bcrypt');
var path = require('path')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var msg91 = require("msg91")("197611ACBvIjqJZM5a7ed724","AAYYUU", "4" );
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');

const uri = "mongodb://aniket:aniket123@ds157349.mlab.com:57349/users-alphynite"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET','POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
 
app.use('/uploads/', express.static(path.join(__dirname, '/public/uploads')));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
   cb(null, path.join(__dirname + '/public/uploads'))
   },
   filename: function (req, file, cb) {
	 cb( null,file.originalname+Date.now()+".jpg",
	 
	 
	 )
   }
})



let upload = multer({storage: storage, fileFilter: function (req, file, callback) {
	var ext = path.extname(file.originalname);
	if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
		return callback(new Error('Only images are allowed'))
	}
	callback(null, true)
},
limits:{
	fileSize: 1024 * 1024
}});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
 
app.post('/api/upload',upload.single('photo'), function (req, res,err) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log("finally");
        console.log(req.file.filename)
        console.log('file received');
        console.log()
        return res.send(JSON.stringify([{
          "success": true,
          "fileurl":req.file.filename
        }]))
      }
     
});
 

app.post("/api/sendotp/",function(req,res){
    mongoose.connect(uri,{useNewUrlParser:true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    console.log(req.body[0]['OTP'])
    var mobileNo = req.body[0]['data']['Phone']; 
    var data = req.body[0]['data'];

    const saltRounds = 10;
	  bcrypt.hash(data.Password, saltRounds, function(err, hash) {
      if(err){
        console.log("Error");
      }
      else{
          data.Password = hash;
          db.once('open', function() {
            console.log("Connected");
            db.collection('Users').insertOne(data);
        });
      }

	  })
    var Message="Hi ! You OTP is "+req.body[0]['OTP'];
    msg91.send(mobileNo, Message, function(err, response){
        console.log(err);
        console.log(response);
    });
    console.log(req.connection.remoteAddress);
    res.send(["Done"]);
});

app.post("/api/login",function(req,res){
    mongoose.connect(uri,{useNewUrlParser:true});
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    var phone = req.body.Phone + '';
    var password = req.body.Password;

    db.collection('Users').findOne({'Phone':phone}, (err,doc) => {
        if(err){
          console.log("Error");
        }
        else{
        let auth = false;
        if( doc != null){
          bcrypt.compare(password, doc.Password, (err,val) => {
            if(!err){
              if(val){
                auth = true;
              }
            }
            res.send(auth);
          })
        }
        else{
          res.send(auth);
        }
      }
    });
});

app.post("/api/signup/",function(req,res){

  console.log(req.body[0]['data']['Phone']);


	const saltRounds = 10;
	bcrypt.hash(req.body[0]['data']['Phone'], saltRounds, function(err, hash) {
		console.log(hash);
	res.status(200).send({"hash":String(hash)});
	  });
	
  })
  

  app.post("/api/product",function(req,res){

    console.log("got")
  console.log(req.body);
    
  res.send(["Done"])
    })

    app.use(express.static(__dirname + '/dist/frontend/'))
    app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/frontend/index.html'))
    })
    
var port = process.env.PORT||3000;

app.listen(port,console.log(`Your server available at http://localhost:${port}`));
