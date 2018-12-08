import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpHeaders} from '@angular/common/http'
import {Router, ActivatedRoute} from '@angular/router';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { directiveInject } from '@angular/core/src/render3';
@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
registerForm:FormGroup;
uri = 'http://127.0.0.1:3000/api/upload';
signupsubmitted:any;
imagearray=[];


public uploader: FileUploader = new FileUploader({url: this.uri, itemAlias: 'photo'});

  constructor(private formBuilder: FormBuilder,private http:HttpClient,private router: ActivatedRoute,
    private route: Router) { 
      window.onload=function()
      {
        document.getElementById('hide').style.display="none"

      }


    }

  ngOnInit() {

    if(localStorage.getItem("user")==null)
    {
      this.route.navigate([''])
    }

    window.onscroll=function()
    {
      

      if(window.pageYOffset>0)
{
   this.document.getElementById('hide').style.display="none";
   
}
    }
    
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      Image: ['', [Validators.required]],
      Rate: ['', [Validators.required]],
      Category: ['', [Validators.required]],



      
  });

  this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  
  this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
       console.log(status,response);
       
       if(status===500)
       {
         alert("Error While Processing Product Please Reload")
       }
       else

       {
         this.registerForm.value.Image=JSON.parse(response)[0]['fileurl']
        this.imagearray.push(JSON.parse(response)[0]['fileurl'])
         console.log(this.registerForm)

        alert('File uploaded successfully');
           const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      this.uploader.onCompleteAll=()=>{
        console.log(this.imagearray)
        
        this.http.post("http://127.0.0.1:3000/api/product",[{"data":this.registerForm.value,"images":this.imagearray,"user":document.cookie.split("=")[1]}],httpOptions).subscribe(res=>{
          console.log(res)
                  })
      }

       }
       
   };


   
  }

  

get s() { return this.registerForm.controls; }

  
onSubmit() {

 
console.log(this.registerForm)
  
        this.signupsubmitted = true;
  
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
  
  var s=this.registerForm.value.Image;
 this.uploader
        

 var filecheck=false;
 this.uploader.queue.forEach(element => {

 console.log(element.file.size/1000000)
 
 if(element.file['name'].match(/\.(jpg|jpeg|png|gif)$/)===null) 
 {
   
  filecheck=true;

 }
});
if(filecheck)
{
alert("Files are not invalid.Please reupload");
this.registerForm.reset();
this.uploader.clearQueue();
this.signupsubmitted=false;
return;
}

this.uploader.uploadAll();
      //  const httpOptions = {
      //   headers: new HttpHeaders({
      //     'Content-Type':  'application/json'
      //   })
      // };


}





preview(event,id)


{
 
  
var reader = new FileReader();
            
reader.onload = function (e) {
 
   document.getElementById('image1pre').setAttribute('src',  e.target['result'])
}

reader.readAsDataURL(event.target.files[0]);
}


preview2(event)



{
  
  
var reader = new FileReader();
            
reader.onload = function (e) {
 
  
   document.getElementById('image2pre').setAttribute('src',  e.target['result'])
}

reader.readAsDataURL(event.target.files[0]);
}
}