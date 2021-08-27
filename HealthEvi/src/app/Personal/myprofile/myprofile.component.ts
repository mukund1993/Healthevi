import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  public tab = 1;
  public read = false;
  public Profile;
  constructor(private http: HttpClient, public GL:GlobalService, public router : Router, public zone:NgZone) { 
    this.getProfile();
  }

  ngOnInit() {
  }

  public getProfile(){
    this.http.post( this.GL.HOST+'getprofile', {} ).subscribe((data)=>{
      data ? this.Profile =  data : this.Profile = new PROFILE();  
      })
  }

  public submitFuturePlan(ADDPRO){
    if(ADDPRO.valid) 
    {
      this.Profile["applicationUser"] = {"id": this.GL.user.id   } 
      if(this.Profile['id'])  {           
      this.http.put( this.GL.HOST+'profile', this.Profile ,{ observe: 'response' }).subscribe((data)=>{
        if(data.status == 200){
          this.GL.addmessage('Your Details updated Successfully.','S');
          ADDPRO.resetForm();
          this.getProfile();
          this.tab = 1;
        } 
        })      
    }
    else{this.http.post( this.GL.HOST+'profile', this.Profile ,{ observe: 'response' }).subscribe((data)=>{
      if(data.status == 201){
        this.GL.addmessage('Your Details added Successfully.','S');
        ADDPRO.resetForm();
        this.getProfile();
        this.tab = 1;
      } 
      })
      }
      }
  }

}

class PROFILE{
  public name:string = null;
  public dob:string = null;
  public bloodGroup:string = null;
  public anniversaryDate:string = null;
  public faxNumber:string = null;
  public residenceAddress:string = null;
  public landline:string = null;
  public officeAddress:string = null;
  public officeNumber:string = null;
  public aadharNumber:string = null;
  public drivingLicenseNumber:string = null;
  public pan:string = null;
  public passportNumber:string = null;
  public passportValidity:string = null;
}