import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService, USER } from '../../global.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private http: HttpClient, public GL:GlobalService, public router : Router, public zone:NgZone) {
    
   }

    public ngOnInit(){
   }
   public LINKS = [
    ['My Profile','index/(inner:Personal/myprofile)','person_outline'],
    ['Family Details','index/(inner:Personal/familydetails)','people_outline'],
    ['Quick Contacts','index/(inner:Personal/quickcontacts)','phone'],
    // ['Import Export','index/(inner:Personal/importexport)','chevron_right'],
    ['About Us','index/(inner:Personal/aboutexide)','chevron_right'],
    ['Change Pin','index/(inner:Personal/changepin)','lock_outline']   
      ]

      

  public Logout(){
    this.GL.user = new USER();
    this.Navigate('login');
    localStorage.setItem('USERAuth','');
  }

  public Navigate(Link){
    // [{ outlets: { inner: ['Insurance'] } }]
    this.zone.run(() => {
      this.router.navigateByUrl(Link)
    })
    this.GL.LeftShow =0;
  }
}
