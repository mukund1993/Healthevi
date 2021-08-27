import { Component, OnInit } from '@angular/core';
import { GlobalService } from './global.service';
import { Location, ViewportScroller } from '@angular/common';
import { Router, Scroll, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
declare var device;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  ngOnInit() {  
    } 


    constructor(private loc: Location, private router: Router, private viewportScroller: ViewportScroller ,public GL : GlobalService,) {
      this.router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
        console.log(e);
  
        // this is fix for dynamic generated(loaded..?) content
        setTimeout(() => {
          if (e.position) {
            this.viewportScroller.scrollToPosition(e.position);
          } else if (e.anchor) {
            this.viewportScroller.scrollToAnchor(e.anchor);
          } else {
            this.viewportScroller.scrollToPosition([0, 0]);
          }
        });
      });
    }
  
    locationBack() {
      window.history.back();
    }
  
    locationBackAngular() {
      this.loc.back();
    }
}
