import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { InsuranceService } from '../insurance.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.css']
})
export class InsuranceListComponent {
  public show = 0;
  constructor(public IN:InsuranceService,private http: HttpClient,public router : Router,private zone: NgZone) {
    this.IN.getInsuranceList();
    this.IN.ResetForms();
   }
   
   public setNorecord(change){
   if( this.IN.LifeList && this.IN.HealthList && this.IN.MotorList && this.IN.OtherList &&
    this.IN.LifeList.length + this.IN.HealthList.length+ this.IN.MotorList.length+this.IN.OtherList.length == 0 )
    {
      return 1;
    }
    if( this.FilterSel !=0 ){
      var k = 0;
      if( this.FilterSel == 1 && this.IN.LifeList.length == 0) return 1;
      if( this.FilterSel == 2 && this.IN.HealthList.length == 0) return 1;
      if( this.FilterSel == 3 && this.IN.MotorList.length == 0) return 1;   
      if( this.FilterSel == 4 && this.IN.OtherList.length == 0) return 1;   
     }

    return 0;
   }
   public Filter = [ {'id':0,'label':'All'} ,{'id':1,'label':'Life'} ,{'id':2,'label':'Health'} ,{'id':3,'label':'Motor'},{'id':4,'label':'Other'} ];
   public FilterSel = 0;
   public FilterSelVal = 'All';

  
  public delete(path,LID){
    if(LID){
        this.http.delete(this.IN.GL.HOST +'insurance/'+path +'/'+LID ,{ observe: 'response' }).subscribe((data)=>{
          if( data.status == 200)
          {
            this.IN.GL.addmessage('Row Deleted Successfully.','S');
          if( path == 'life' )
            this.IN.getLifeInLst();
          if( path == 'health' )
            this.IN.getHealthInLst();
          if( path == 'motor' )
            this.IN.getMotorInLst();
          if( path == 'other' )
            this.IN.getOtherLst();  
          }
      });
    }
  }
  public edit(type,L){
    if(type == 'life')
      {this.IN.LifeIN = L;
        this.Navigate( this.LINKS[0][1])
      }
    
    if(type == 'health')
    {this.IN.HealthIn = L;
      this.Navigate( this.LINKS[2][1])
    }
    
    if(type == 'motor')
    {this.IN.MotorIn = L;
      this.Navigate( this.LINKS[1][1])
    }

    if(type == 'other')
    {this.IN.OtherIn = L;
      this.Navigate( this.LINKS[3][1])
    }  
  }

  public LINKS = [
    ['Life Insurance Policy','index/(inner:Insurance/Add)'],
    ['Motor Insurance Policy','index/(inner:Insurance/Motor)'],
    ['Health Insurance Policy','index/(inner:Insurance/Health)'],
    ['Other Insurance','index/(inner:Insurance/other)'],
      ];
  

  public Navigate(Link){
    // [{ outlets: { inner: ['Insurance'] } }]
    this.zone.run(() => {
      this.router.navigateByUrl(Link)
    })
  }
}
