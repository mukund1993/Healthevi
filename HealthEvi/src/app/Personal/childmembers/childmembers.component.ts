import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonalService } from '../personal.service';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-childmembers',
  templateUrl: './childmembers.component.html',
  styleUrls: ['./childmembers.component.css']
})
export class ChildmembersComponent implements OnInit {

  public MemberList;
  public state = 0;
  public FilterSelVal = '';
  public FilterSel = new FuturePaln();
  constructor(private http: HttpClient,public PS:PersonalService, public GL:GlobalService, public router : Router,private zone: NgZone) { 

    this.http.get( this.GL.HOST+'employee').subscribe((data)=>{
      this.MemberList = data ?  data : null;; 
    })
  }

  public AddMemeber(addmem){
    if( addmem.valid){
    this.http.post( this.GL.HOST+'employee', addmem.value ).subscribe((data)=>{
      this.GL.addmessage("Member Slot created successfully.",'S');
      addmem.resetForm() 
    })
    }
    else{
      this.GL.addmessage("Both fields are required.",'W');
    }
  }

  public activate(L){
    this.GL.ACTuser = L;
  }
  ngOnInit() {
  }

}

export class FuturePaln{
  public productName:string=null;
  public description:string=null;
  public planDate:string = null;
  public id:string=null;
}