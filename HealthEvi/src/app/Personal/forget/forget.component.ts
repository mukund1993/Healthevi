import { Component, OnInit, NgZone } from '@angular/core';
import { GlobalService } from '../../global.service';
import { PersonalService } from '../personal.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  constructor(private http: HttpClient,public PS:PersonalService, public GL:GlobalService, private route: ActivatedRoute,public router : Router,private zone: NgZone) {
    this.forget = new Forget( this.GL.user.email );
    localStorage.setItem('USERAuth',''); 
   }

   public forget;
   ngOnInit() {
      
  }
  public getfotp(Forget){
    if(Forget && !Forget.controls.email.valid){
      return false;
    }
    this.http.post( this.GL.HOST+'getfotp', {'email': this.forget.email } ,{ observe: 'response' }).
    subscribe((data)=>{
      if(data.status == 200){
        this.GL.addmessage('OTP is send over your e-mail.','S');
      }
    },(err)=>{
      console.log(err);
    })
  }

  public resettoken(Forget){
    if( Forget.valid)
      {    
        this.http.put( this.GL.HOST+"resettoken", Forget.value,{ observe: 'response' }).subscribe((data)=>{
          if(data.status == 200){
            this.GL.addmessage('Password changed successfully.','S');
            this.router.navigateByUrl('/login');
          }
          else {
            this.GL.addmessage('Password not changed.','F');
          }
          })
        } 
      }
  
}

class Forget{
  public email:string = null;
  public otp:string = null;
  public token:number = null;
  constructor(email){
    this.email = email;
  }
  }
  