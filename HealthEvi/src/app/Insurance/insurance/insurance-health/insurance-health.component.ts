import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../insurance.service';
import { GlobalService } from '../../../global.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insurance-health',
  templateUrl: './insurance-health.component.html',
  styleUrls: ['./insurance-health.component.css']
})
export class InsuranceHealthComponent implements OnInit {
  public tab = 1;
  constructor(public IN:InsuranceService,public GL:GlobalService,private http: HttpClient) { }

  ngOnInit() {
  }

  public AddInsurance(ADDINS){
    
    if(ADDINS.valid)
    {
    var INS = Object.assign( {},this.IN.HealthIn); 
    INS["applicationUser"] = {"id": this.GL.user.id   };
    console.log(INS);
    if( this.IN.HealthIn.id)
    {
        this.http.put(this.GL.HOST+'insurance/health',INS ,{ observe: 'response' }).subscribe( (data)=>{
          if(data.status == 200){
            this.IN.getHealthInLst();
            this.GL.addmessage('Healt Insurance detail updated Successfully.','S');
            ADDINS.resetForm();
          }
        })
    }
    else
    {
        this.http.post( this.GL.HOST+'insurance/health',INS ,{ observe: 'response' }).subscribe( (data)=>{
          console.log(data);
          if(data.status == 201){
            this.IN.getHealthInLst();
            this.GL.addmessage('Healt Insurance detail added Successfully.','S');
            ADDINS.resetForm();
          }
        })
      
    }}
    
    else{
      this.GL.addmessage(5000,'W');
    }
  }
}
