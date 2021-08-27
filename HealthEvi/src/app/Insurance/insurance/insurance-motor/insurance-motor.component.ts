import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../insurance.service';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../global.service';

@Component({
  selector: 'app-insurance-motor',
  templateUrl: './insurance-motor.component.html',
  styleUrls: ['./insurance-motor.component.css']
})
export class InsuranceMotorComponent implements OnInit {
  public tab = 1;
  constructor(public IN:InsuranceService,public GL:GlobalService,private http: HttpClient) { }

  ngOnInit() {
  }

  public AddInsurance(ADDINS){
    
    if(ADDINS.valid)
    {
    var INS = Object.assign( {},this.IN.MotorIn); 
    INS["applicationUser"] = {"id": this.GL.user.id   };
    console.log(INS);
    if( this.IN.MotorIn.id)
    {
        this.http.put(this.GL.HOST+'insurance/motor',INS ,{ observe: 'response' }).subscribe( (data)=>{
          if(data.status == 200){
            this.IN.getMotorInLst();
            this.GL.addmessage('Motor Insurance detail updated Successfully.','S');
            ADDINS.resetForm();
          }
        })
    }
    else
    {
        this.http.post( this.GL.HOST+'insurance/motor',INS ,{ observe: 'response' }).subscribe( (data)=>{
          console.log(data);
          if(data.status == 201){
            this.IN.getMotorInLst();
            this.GL.addmessage('Motor Insurance detail added Successfully.','S');
            ADDINS.resetForm();
          }
        })
      
    }}
    
    else{
      this.GL.addmessage(5000,'W');
    }
  }
}
