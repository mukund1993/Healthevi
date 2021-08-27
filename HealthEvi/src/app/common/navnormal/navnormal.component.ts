import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-navnormal',
  templateUrl: './navnormal.component.html',
  styleUrls: ['./navnormal.component.css']
})
export class NavnormalComponent implements OnInit {
  public disableBack = 0;
  public Left = 0;
  constructor(public location:Location,private router: Router, public GL:GlobalService) {

    router.events
    .subscribe(event => {
      if (event instanceof NavigationEnd)
      {console.log('prev:', event.url);
        if( event.url == '/index' || event.url.indexOf( '/login') > -1 || event.url == '/')
          this.disableBack =0;
          else 
          this.disableBack = 1;

          if( event.urlAfterRedirects.indexOf( '/login') > -1)
          this.Left =0;
          else 
          this.Left = 1;  
      }
    });
   }

  ngOnInit() {
  }
  public back(){
    this.location.back();
  }

}
