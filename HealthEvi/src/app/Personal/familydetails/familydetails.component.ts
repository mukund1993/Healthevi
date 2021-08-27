import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PersonalService } from '../personal.service';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-familydetails',
  templateUrl: './familydetails.component.html',
  styleUrls: ['./familydetails.component.css']
})
export class FamilydetailsComponent implements OnInit {

  public row = 1;
  public Family;
  public FilterSelVal = '';
  public FilterSel = new FuturePaln();
  constructor(private http: HttpClient,public PS:PersonalService, public GL:GlobalService, public router : Router,private zone: NgZone) { 
    this.FamilyList = new FamilyDetail();
    this.getAllFamilyMember();
  }

  ngOnInit() {
  }
  public delete(i){
    this.FamilyList.familyDetails.splice(i,1)
    this.http.put(this.GL.HOST+'userdetail', this.FamilyList,{ observe: 'response' }).subscribe((data)=>{
      this.getAllFamilyMember();
      this.GL.addmessage('Plan deleted Successfully.','S');
      this.row = 1;
    })
  }

  public add(){
    this.Family = new Fam();
    // this.FamilyList.familyDetails.push( this.Family);
  }
  public edit(L){
    this.row = 0;
    this.Family = L;
  }
  
  public FamilyList;
  public getAllFamilyMember(){
    this.http.post(this.GL.HOST+'getuserdetail',{}).subscribe((data)=>{
       data ? this.FamilyList =  data : null ;
      this.row = 1;
    })
  }


  public submitFuturePlan(Future){
    console.log( this.FamilyList)
    if(Future.valid) 
    { 
        
    if(this.FamilyList['id'])  {  
      this.FamilyList.familyDetails.push( this.Family);    
      this.http.put( this.GL.HOST+'userdetail', this.FamilyList ,{ observe: 'response' }).subscribe((data)=>{
        if(data.status == 200){
          this.GL.addmessage('Family Details updated Successfully.','S');
          Future.resetForm();
          this.getAllFamilyMember();
        } 
        })      
    }
    else{
      this.http.post( this.GL.HOST+'userdetail', this.FamilyList ,{ observe: 'response' }).subscribe((data)=>{
        if(data.status == 201){
          this.GL.addmessage('Family Details added Successfully.','S');
          Future.resetForm();
          this.getAllFamilyMember();
        } 
        })
    }
    }
  }
}

class FamilyDetail{
  public familyDetails;
  public quickReferences;

  constructor(){
    this.familyDetails = [];
    this.quickReferences = [];
  }
}

class Fam{
  public name:string = null;
  public relationship:string = null;
  public dob:string = null;
}
class QRef{
  public category:string = null;
  public mobileNumber:string = null;
  public email:string = null;
  public name:string = null;
}
export class FuturePaln{
  public productName:string=null;
  public description:string=null;
  public planDate:string = null;
  public id:string=null;
}