import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inherits } from 'util';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  input :any;
  
  
  cities=['Delhi','Bengaluru','Chennai','Mumbai','Ahemdabad','Kolkata','Surat','Jaipur','Pune','Hyderabad']
  top=['https://images-eu.ssl-images-amazon.com/images/G/31/img18/Software/Gateway/1101485_1500x300._CB503184633_.jpg','https://images-eu.ssl-images-amazon.com/images/G/31/img18/Wireless/CEEX/HuaweiNova/Aug7_Launch/D5739566_HuaweiNova_SaleDayGraphics_GoLiveAug7_PC_LP-graphics_Set2.jpg']
  index:any;
  data:any;
  search:any;

  constructor(private http:HttpClient) { 
    this.search=[]
    this.data=[]
  }

  ngOnInit() {
    window.onscroll=function()
    {
      

      if(window.pageYOffset>0)
{
   this.document.getElementById('hide').style.display="none";
   
}
else
{
  this.document.getElementById('hide').style.display="block";

}
    }
    this.index=0;
    this.http.get('http://bookboss.herokuapp.com/home').subscribe(res=>
    {
      console.log(res)
      this.data=res;
    });
   
    setInterval(()=>
  {
    this.index=(this.index+1)%this.top.length;


  },5000)
    
  }
left()
{
  this.index=(this.index+1)%this.top.length;


}

clearinput()
{
this.input="";
this.search=[];
}

keyup(event)
{
  var searchkey=event.target.value;
  console.log(searchkey)
  var newy =[];
  if(event.target.value=="")
  {
    this.search=[]
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

slide()
{
 
  

 document.getElementById('productsofday').scrollBy(100,0);
 
}
slideleft()
{
 document.getElementById('productsofday').scrollBy(-100, 0);
 
}
}
