import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../insurance.service';
import { GlobalService } from '../../../global.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insurance-add',
  templateUrl: './insurance-add.component.html',
  styleUrls: ['./insurance-add.component.css']
})
export class InsuranceAddComponent implements OnInit {
  public tab = 1;
  public FilterSel;
  constructor(public IN:InsuranceService,public GL:GlobalService,private http: HttpClient) { }

  ngOnInit() {
  }

  public AddInsurance(ADDINS){
    
    if(ADDINS.valid)
    {
    var INS = Object.assign( {},this.IN.LifeIN); 
    INS["applicationUser"] = {"id": this.GL.user.id   };
    if( this.IN.LifeIN.id)
    {
        this.http.put(this.GL.HOST+'insurance/life',INS ,{ observe: 'response' }).subscribe( (data)=>{
          if(data.status == 200){
            this.IN.getLifeInLst();
            this.GL.addmessage('Life Insurance detail updated Successfully.','S');
            ADDINS.resetForm();
          }
        })
    }
    else
    {
        this.http.post( this.GL.HOST+'insurance/life',INS ,{ observe: 'response' }).subscribe( (data)=>{
          if(data.status == 201){
            this.IN.getLifeInLst();
            this.GL.addmessage('Life Insurance detail added Successfully.','S');
            ADDINS.resetForm();
          }
        })
      
    }
    }
    else{
      this.GL.addmessage(5000,'W');
    }
  }
}
