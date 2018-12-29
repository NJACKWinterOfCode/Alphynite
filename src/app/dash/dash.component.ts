import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  public doughnutChartLabels:string[] = ['Producrs Approved', 'Products Rejected'];
  public doughnutChartData:number[] = [350, 450];
  public doughnutChartType:string = 'doughnut';
  constructor(private route:Router) { }

  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 public barChartcolor:any []=["red","blue"]
  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Leads Successful'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Unsucessful'}
  ];
   chartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#ff1','#ff1','#ff1','#ff1','#ff1','#ff1','#ff1']
    },
    { // all colors in order
      backgroundColor: ['#fb3','#fbb','#fbb','#fbb','#fbb','#fbb','#fbb']

    }
]

 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  


  ngOnInit() {
   
  
    if(localStorage.getItem("user")==null)
    {
      this.route.navigate([''])
    }
    document.getElementById('hide').style.display="none"
  }

}
