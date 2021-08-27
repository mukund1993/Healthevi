import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../global.service';
import { LOGIN } from '../login/login.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepin',
  templateUrl: './changepin.component.html',
  styleUrls: ['./changepin.component.css']
})
export class ChangepinComponent implements OnInit {
  public USER:LOGIN;
  public type= 1;
  constructor(private http: HttpClient,public GL:GlobalService,public router : Router) { 
    this.USER = new LOGIN(this.GL.user);
  }

  ngOnInit() {
  }

  public ChangePin(CHANGE){
    if( CHANGE.valid){
      this.http.put( this.GL.HOST+'changetoken', { "token": this.USER.token },{ observe: 'response' }).subscribe((data)=>{
        if(data.status == 200){
          this.GL.addmessage('Password changed successfully.','S');
          this.router.navigateByUrl('/login');
        }
        else if(data.status == 204){
          this.GL.addmessage('Email does not exist.','F');
        }
        else {
          this.GL.addmessage('Password not changed.','F');
        }
      })
      
    }
  }

}

