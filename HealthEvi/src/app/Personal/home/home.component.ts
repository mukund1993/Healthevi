import { Component, OnInit,NgZone, ViewChildren, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService, USER } from '../../global.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { PersonalService } from '../personal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public image;
  constructor(private http: HttpClient,public PS:PersonalService, public GL:GlobalService,private sanitizer:DomSanitizer, public router : Router,private zone: NgZone) {
    this.GL.LeftShow = 0;
    this.PS.updateImage( this.GL.user.email);
    this.user = new USER();
    this.GL.getMembers();
    if(this.GL.ACTuser)
    this.Mselected =this.GL.ACTuser;
 }
   public openFilemanager(userFile){
    userFile.click();
    console.log(userFile)
  }
  public user:USER;
  @ViewChildren('files') files;
  public userimgERR = 0;
  public onFileChange(event,name)
  { 
    this.user = this.GL.user;
    var b = this.callback.bind(this);
   this.userimgERR = this.PS.onfileupload(event,null,this.user,b);
  }

  public callback(){
    localStorage.setItem(this.user.email,  this.user.image);
    this.PS.updateImage(this.user.email);
  }
  ngOnInit() {
  }

  public Mod = [ 
                  {label: 'Insurance' ,Link: 'index/(inner:Insurance)',icon:'security'},
                  {label: 'Health Records' ,Link: 'index/(inner:Insurance)',icon:'local_hospital'},
                  {label: 'Track' ,Link: 'index/(inner:Insurance)',icon:'art_track'},
                  {label: 'Notes' ,Link: 'index/(inner:Insurance)',icon:'article'},
                  {label: 'Medrefil' ,Link: 'index/(inner:Insurance)',icon:'local_pharmacy'},
                  {label: 'Link Reports' ,Link: 'index/(inner:Insurance)',icon:'assignment'},
                ];
  public Navigate(Link){
    this.zone.run(() => {
      this.router.navigateByUrl(Link)
    })
  }

  public open(){
    setTimeout(()=>{ this.DisplayM = 1;},2)
  }

  public setActiveUser(event){
    this.GL.ACTuser = event;
    this.DisplayM =0;
  }
  public Mselected;
  public DisplayM = 0;
}
