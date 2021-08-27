import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../insurance.service';
import { GlobalService } from '../../../global.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insurance-property',
  templateUrl: './insurance-property.component.html',
  styleUrls: ['./insurance-property.component.css']
})
export class InsurancePropertyComponent implements OnInit {
  public tab = 1;
  constructor(public IN:InsuranceService,public GL:GlobalService,private http: HttpClient) { }

  ngOnInit() {
  }

  public AddInsurance(ADDINS){
    
    if(ADDINS.valid)
    {
    var INS = Object.assign( {},this.IN.OtherIn); 
    INS["applicationUser"] = {"id": this.GL.user.id   };
    if( this.IN.OtherIn.id)
    {
        this.http.put(this.GL.HOST+'insurance/other',INS ,{ observe: 'response' }).subscribe( (data)=>{
          if(data.status == 200){
            this.IN.getMotorInLst();
            this.GL.addmessage('Insurance detail updated Successfully.','S');
            ADDINS.resetForm();
          }
        })
    }
    else
    {
        this.http.post( this.GL.HOST+'insurance/other',INS ,{ observe: 'response' }).subscribe( (data)=>{
          console.log(data);
          if(data.status == 201){
            this.IN.getMotorInLst();
            this.GL.addmessage('Insurance detail added Successfully.','S');
            ADDINS.resetForm();
          }
        })
      
    }}
    
    else{
      this.GL.addmessage(5000,'W');
    }
  }
}