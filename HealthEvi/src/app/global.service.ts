import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse ,HttpResponse, HttpClient} from '@angular/common/http';
import { Injectable, NgZone, OnInit } from '@angular/core';
import { map, filter, tap,finalize } from 'rxjs/operators';
import * as ER from './ER';
import { Router } from '@angular/router';
import { isNumber } from 'util';
import { PersonalService } from './Personal/personal.service';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
const Messages = {
  206: "Record added Successfully.",
  401: "Need to authonticate again.",
  5000: "Please check all fields validation."
}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public HOST = "http://internshakti.co.in/internshakti/api/";
  public LoginHost = "http://internshakti.co.in/login";

  // public HOST = "http://35.185.82.93/internshakti/api/";
  // public LoginHost = "http://35.185.82.93/login";
  public Loader = 0;
  public Auth:string;
  public user;
  public ACTuser;  // Active user
  public authorization ;
  public LeftShow = 0;
  constructor(private http: HttpClient,public PS:PersonalService) {
    this.user = new USER();
    var USL = localStorage.getItem('USER');
    if( 1 )
    { 
      //this.user = JSON.parse(USL); 
      this.ACTuser = this.user;
      
    }

   var auth = localStorage.getItem('USERAuth');
   this.Auth = auth? auth : null;
   setTimeout(()=>{
    if (1)  //(this.Auth)
    this.getmasterList();
   },10)
    
  }

  public message:Array<Object>=[];
    
  public addmessage(msg:string|number,type:string){
          // S W F I
          if( this.message[this.message.length - 1] == msg) return;
          if( isNumber(msg) ) msg = Messages[msg];
          if(msg){this.message.push({ Type:type ,Message: msg});
          setTimeout(()=>{
              this.message.shift();
          },4000)}
  }

  

  public getUserDetail(email){
    this.http.get( this.HOST+"user").subscribe( (data)=>{
      this.user = data;
      this.ACTuser = this.user;  
      localStorage.setItem('USER', JSON.stringify ( data));
      this.PS.updateImage( this.user.email);
      this.getMembers(); 
    })
  }

  public masterObject;
  public getmasterList(){
    this.http.get( environment.apistatic + "masterData").subscribe( (data)=>{
      this.masterObject = data;
      console.log( this.masterObject );
    })
  }
  public reconstructor(k){
    let arr = [];
    for( let I of this.masterObject[k]){
      arr.push({'k':I}) ;
    }
    this.masterObject[k] = arr;
  }
 
  public MembersList;
  public getMembers(){
    console.log(this.user)
    if( this.user.role == "ROLE_ADMIN"  || this.user.role == "ROLE_EMPLOYEE")
     {
     this.http.get( this.HOST+'getchild' ).subscribe((data)=>{
      this.MembersList =[];
      let user  = Object.assign( {}, this.user);
      this.MembersList.push(user);
      this.MembersList = this.MembersList.concat( data); })
     }
   }

  public readonly V_name:RegExp =/^[a-zA-Z][a-zA-Z ]{2,90}$/;
  public readonly V_email:RegExp =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  public readonly V_policy:RegExp =/^[a-zA-Z0-9_-]*$/;
  public readonly V_adhar:RegExp =/^\d{4}\s\d{4}\s\d{4}$/;
  public readonly V_pan:RegExp =/[a-zA-z]{5}\d{4}[a-zA-Z]{1}/;
  public readonly V_mob:RegExp =/^\d{10}$/;
  public readonly V_acc:RegExp =/^\d{15}$/;
  public readonly V_hsn:RegExp =/^\d{8}$/;
  public readonly V_pin:RegExp =/^[1-9][0-9]{5}$/;
  public readonly V_num:RegExp =/^\d/;
  public readonly V_age:RegExp =/^([1-9]|[1-9][0-9]|[1][0-1][0-9]|[1][2][0-7])$/;
  public readonly V_int:RegExp =/^[1-9][0-9]*$/;
  public readonly V_pass:RegExp =/^\d{4,4}$/;
  public readonly V_gst:RegExp =/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  public readonly V_price:RegExp =/^[0]$|([1-9][0-9]*([.][0-9]{2}|))$/;
  public readonly V_percent:RegExp =/^\d{1,3}$/;
  public readonly V_Time:RegExp =/^(10|11|12|13|14|15|16|17|18|19|20|21|22|23|[1-9]|[0][1-9]):[0-5][0-9]$/;

  readonly monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
}


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
      this.GL.Loader++;         
        if (this.GL.Auth ) {
            request = request.clone({
                setHeaders: { 
                      authorization: `${this.GL.Auth}`
                }
            });
        }
        else{
          
        }

        return next.handle(request).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        if(event.status != 200)
        {this.GL.addmessage( event.status, 'S');}
      }
    }, error => {
      if( request.url.indexOf('/login') > 0){         // login Services
        if(error.status == 401)
          this.GL.addmessage( 'Email & Password Combination is not valid.', 'F');
      }
      else{         // Other Services
              
        if(error.status == 401)
        { 
          this.GL.addmessage( 'Your session expired.', 'F');
          this.zone.run(() => {
          this.router.navigateByUrl('login')
          })
        }
        else{
          if( error.url ){
          // let mes = ER.ER[ error.url.split('/').pop() ][error.status] || '';
          // this.GL.addmessage(mes , 'F');
          }
        }
       
      }
      //console.error('NICE ERROR', error)
    })
    ,finalize(() => {
      this.GL.Loader--;
    })
  )
    }

constructor( public router: Router,public GL:GlobalService, public zone:NgZone){}
}

export class USER{
  public name:string = "mp";
  public email:string = "mp@mp.mp";
  public mobile:string = "9999999999";
  public token:string = null;
  public empId:string =null;
  public id:string = "99"; 
  public image:string;
  public otp:string = null;
}
