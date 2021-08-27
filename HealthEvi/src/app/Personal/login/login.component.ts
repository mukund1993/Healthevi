import { Component, OnInit, ViewChildren, ViewChild, NgZone } from '@angular/core';

import { GlobalService, USER } from '../../global.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PersonalService } from '../personal.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user:USER;
  public FormS = 0;
  public userReadonly=0;
  public LoginU:LOGIN;
  public isCustomer = '1';
  public upload = 0;


  public openFilemanager(userFile){
    userFile.click();
    console.log(userFile)
  }
  public welcome =0;
  constructor(private http: HttpClient,public PS:PersonalService, public GL:GlobalService, public router : Router,private zone: NgZone) { 
    this.LoginU = new LOGIN();
    if( this.GL.user )
    { this.user = JSON.parse( JSON.stringify( this.GL.user)) ;
      if( this.user['email'] ){ 
        this.LoginU = new LOGIN(this.user);
        this.FormS = 1;
        this.getlotp();
      }

    }
    else
    {
      this.welcome = 1;
      this.user = new USER();
    }
    this.userReadonly = 1;
    this.GL.Auth = null;
  }

  public userimgERR = 0;

  @ViewChildren('files') files;
  @ViewChild('userImg', {static: false}) userImg;
  
  public forget(F){

      // hit request for new password
      this.zone.run(() => {
        this.router.navigateByUrl('index/(inner:Personal/forget)')
      })
  }
  
  public onFileChange(event,name)
  { 
    this.userimgERR =  this.PS.onfileupload(event,this.userImg,this.user);
  }
  public isOTPRequired = 0;

  public getrotp(login?){
    if(login && !login.controls.email.valid){
      return false;
    }
    this.isOTPRequired = 0;
    this.http.post( this.GL.HOST+'getrotp', {'email': this.user.email } ,{ observe: 'response'}).subscribe((data)=>{    
        if( data.status == 200)
        this.GL.addmessage('OTP is send over your e-mail.','S');
        if( data.status == 208)
        this.GL.addmessage('OTP is already send over your e-mail.','S');
      
    })
  }

  public getlotp(login?){
    if(login && !login.controls.email.valid){
      return false;
    }
    this.isOTPRequired = 0;
    this.http.post( this.GL.HOST+'getlotp', {'email': this.LoginU.email } ,{ observe: 'response'}).subscribe((data)=>{
      
        this.isOTPRequired = 1;
        if( data.status == 200)
        this.GL.addmessage('OTP is send over your e-mail.','S');
        if( data.status == 208)
        this.GL.addmessage('OTP is already send over your e-mail.','S');
      
    })
  }
  public login(login, event?){
    //
    this.router.navigateByUrl('/index');
    if( (!this.LoginU.email && !this.LoginU.mobile) || !this.LoginU.token ){
      if( !login.controls.email.valid || !login.controls.mobile.valid)
      {
        this.GL.addmessage('Please enter Email or Mobile Number.','W');
      }      
      if( !this.LoginU.token )
      this.GL.addmessage('Please enter your 4 digit PIN.','W');
      if(event) {
        return false;
      }
    }
    if( this.isOTPRequired && !login.controls.otp.valid)
      {
        this.GL.addmessage('OTP is required for your login.','W');
        return false;
      }
    if(login.valid){
    this.http.post( this.GL.LoginHost, this.LoginU ,{responseType: 'text'}).subscribe((data)=>{
      this.GL.Auth = data; 
      localStorage.setItem('USERAuth', data);
      this.GL.getUserDetail( this.LoginU.email);
      this.router.navigateByUrl('/index');
      this.LoginU = new LOGIN();
    })
    }
  }



  public Register(KYCDocuments){
    if(KYCDocuments.valid)
          {            
              this.http.post( this.GL.HOST + 'register', KYCDocuments.value ,{ observe: 'response' }).subscribe((data)=>{
              //this.router.navigateByUrl('/index')
              
              this.user.token = null;
              this.FormS = 1;
              localStorage.setItem('USER', JSON.stringify ( KYCDocuments.value));
              this.GL.user = KYCDocuments.value;
              this.LoginU.email = this.user.email;
              localStorage.setItem(this.user.email,  this.user.image);
              this.user = new USER();

            })
          }
            
  }
}


 export class LOGIN{
  public email:string = null;
  public mobile:string = null;
  public otp:string = null;
  public token:string = null;
  constructor(U?){
    if(U){this.email = U.email;}
  }
}