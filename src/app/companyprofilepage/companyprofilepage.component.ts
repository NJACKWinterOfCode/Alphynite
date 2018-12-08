import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companyprofilepage',
  templateUrl: './companyprofilepage.component.html',
  styleUrls: ['./companyprofilepage.component.css']
})
export class CompanyprofilepageComponent implements OnInit {
home:any;
  constructor() { }

  cities=["1","3","4","1","3","4","1","3","4"]
  ngOnInit() {
    this.home=true;
  document.getElementById('hide').style.display="none"
  window.onscroll=function()
  {
    
this.console.log(this.window.pageYOffset);
    if(window.pageYOffset>30)
{
 this.document.getElementById('top').style.display="none";
 this.document.getElementById('companyprofilepage').style.marginTop="0px";
this.document.getElementById('companyprofilepagetop').style.position="fixed";
this.document.getElementById('companyprofilepagetop').style.zIndex="999";
this.document.getElementById('companyprofilepagetop').style.top="0";
this.document.getElementById('companyprofilepagetop').style.left="0";
this.document.getElementById('companyprofilepagetop').style.backgroundColor="white"
this.document.getElementById('companyprofilepagetop').style.boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";

console.log(this.document.querySelectorAll('#contactbuttons'));

}
else
{
this.document.getElementById('top').style.display="block";
this.document.getElementById('companyprofilepage').style.marginTop="120px";

this.document.getElementById('companyprofilepagetop').style.position="unset";
this.document.getElementById('companyprofilepagetop').style.boxShadow="";
this.document.getElementById('companyprofilepagetop').style.zIndex="";
this.document.getElementById('companyprofilepagetop').style.top="";
this.document.getElementById('companyprofilepagetop').style.left="";
this.document.getElementById('companyprofilepagetop').style.backgroundColor="white"


}
  }


 
  }



  querysubmit(sent)
  {
console.log(sent)
  }

}
