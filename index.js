var express = require('express');
var bcrypt= require('bcrypt');
var path = require('path')

var msg91 = require("msg91")("197611ACBvIjqJZM5a7ed724","AAYYUU", "4" );

var MongoClient = require('mongodb').MongoClient;

var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');

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
 
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
 

 
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
  MongoClient.connect("mongodb://localhost:27017/Users",{useNewUrlParser: true},function(err,client){
    if(err){
      console.log("Unable to connect");
    }
    console.log("Connected to Mongodb");
    const db = client.db('Users');

    
    var mobileNo = req.body[0]['data']['Phone']; 
    console.log(req.body[0]['OTP'])
    
    var data = req.body[0]['data'];
    console.log(data);

    const saltRounds = 10;
	  bcrypt.hash(data.Password, saltRounds, function(err, hash) {
      if(err){
        console.log("Error");
      }
      else{
          data.Password = hash;
          db.collection('Users').insertOne(data,function(err,result){
            console.log("saved!");   
          });
          client.close();
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
})



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

app.listen(port,console.log('Your server available at http://localhost:3000'));
