import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpHeaders} from '@angular/common/http'
import {Router, ActivatedRoute} from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  mobile:any;
  post:any;
  registerForm: FormGroup;
  loginForm:FormGroup;
  input :any;
  

  form:any;
  search:any;
  login:any;
  signupsubmitted :any;
  loginsubmitted:any;
  config="http://127.0.0.1:3000"
  signup:any;
  signupotp:any;
  errorotp:any;
 
  cities=['Delhi','Bengaluru','Chennai','Mumbai','Ahemdabad','Kolkata','Surat','Jaipur','Pune','Hyderabad']
  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router: ActivatedRoute,
    private route: Router) { }


  ngOnInit() {


  //   if (window.matchMedia("(orientation: portrait)").matches) {
  //    console.log("you're in PORTRAIT mode");
  //  }
   
  //  if (window.matchMedia("(orientation: landscape)").matches) {
  //     // you're in L
  //     console.log("you're in  LANDSCAPE mode");

  //   }

    this.login=true;
    this.signupsubmitted=false;

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      Phone: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      Password: ['', [Validators.required,Validators.minLength(6)]],
      City: ['', [Validators.required]]

      
  });
  this.loginForm = this.formBuilder.group({
    Phone: ['', Validators.required],
    Password: ['', [Validators.required,Validators.minLength(6)]],
    
});









    this.login=true;
   
         
    document.getElementById("input").addEventListener("blur",()=>{
      this.search=[];
  this.input=""
    }
    , true);

    
    
  }


  get s() { return this.registerForm.controls; }
 
  get l() { return this.loginForm.controls; }

  onSubmit() {

if(isNaN(this.registerForm.value.Phone))
{

  alert("Number Contains Character");
  this.registerForm.reset();
  this.signupsubmitted=false;

  return;
}

      this.signupsubmitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

     this.post=false;
     this.signupotp = Math.floor(1000 + Math.random() * 9000);
     this.mobile=true;

      
     
     const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
     this.http.post(this.config+'/api/sendotp/',JSON.stringify([{"data":this.registerForm.value,"OTP":this.signupotp}]),httpOptions).subscribe(res=>
      {

      console.log(res);
        
       })

      }





      loginSubmit() {





        if(isNaN(this.loginForm.value.Phone))
{

  alert("Number Contains Character");
  this.loginForm.reset();
  this.loginsubmitted=false;

  return;
}
       
        console.log("lofin")
        this.loginsubmitted = true;
        
  
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
  
        console.log(this.loginForm.value)
        
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };
        this.http.post(this.config+'/api/login',JSON.stringify(this.loginForm.value),httpOptions).subscribe(res=>
        {
  
        console.log(res);
        if(res){
          this.route.navigate(['dash']);
        }
        else{
          window.alert('Incorrect Username or password');
        }
          
         })
  
        }
       







//VERIFY




verifyotp(checkotp)
{

  console.log(checkotp,this.signupotp)
if(checkotp==this.signupotp)
{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  this.http.post(this.config+"/api/signup/",JSON.stringify([{"OTP":this.signupotp,"data":this.registerForm.value}]),httpOptions).subscribe(res=>
  {

  console.log(res);
  this.mobile=false;




var d = new Date();
    d.setTime(d.getTime() + (2*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = "user" + "=" + res['hash'] + ";" + expires + ";path=/";
  localStorage.setItem("user",res['hash']);
  document.getElementById('hide').style.display="none";
     this.route.navigate(['dash']);
    
   })

}
else
{
this.errorotp=true;

  
}

 
}





















keyup(event)
{
  var searchkey=event.target.value;
  console.log(searchkey)
  var newy =[];
  if(event.target.value=="")
  {
    this.search=[];
    return;
  }
  for ( let  x of this.cities)
  {
   if((x).match(searchkey)!=null || (x.toUpperCase().match(searchkey)!=null))
   {
     newy.push(x)
   }
  }
  console.log(newy)
  this.search=newy;

}






//hidehome to hide sliders in phone 
hidehome()
{
 
 
    document.getElementById('home').style.display="none";

  
 
}
unhidehome()
{

  document.getElementById('home').style.display="block";
}
}






