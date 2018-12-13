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
    
console.log(window.pageYOffset);
    if(window.pageYOffset>30)
{
 document.getElementById('top').style.display="none";
 document.getElementById('companyprofilepage').style.marginTop="0px";
 document.getElementById('companyprofilepagetop').style.position="fixed";
 document.getElementById('companyprofilepagetop').style.zIndex="999";
document.getElementById('companyprofilepagetop').style.top="0";
document.getElementById('companyprofilepagetop').style.left="0";
document.getElementById('companyprofilepagetop').style.backgroundColor="white"
document.getElementById('companyprofilepagetop').style.boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";

console.log(document.querySelectorAll('#contactbuttons'));

}
else
{
document.getElementById('top').style.display="block";
document.getElementById('companyprofilepage').style.marginTop="120px";

document.getElementById('companyprofilepagetop').style.position="unset";
document.getElementById('companyprofilepagetop').style.boxShadow="";
document.getElementById('companyprofilepagetop').style.zIndex="";
document.getElementById('companyprofilepagetop').style.top="";
document.getElementById('companyprofilepagetop').style.left="";
document.getElementById('companyprofilepagetop').style.backgroundColor="white"


}
  }


 
  }



  querysubmit(sent)
  {
console.log(sent)
  }

}
