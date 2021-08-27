import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../global.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  public LifeIN:LifeInsurance;
  public MotorIn:MotorInsurance;
  public HealthIn:HealthInsurance;
  public OtherIn:OtherInsurance;

  constructor(public GL:GlobalService,private http: HttpClient) { 
    this.ResetForms();
  }

  public ResetForms(){
    this.LifeIN = new LifeInsurance();
    this.MotorIn = new MotorInsurance();
    this.HealthIn = new HealthInsurance();
    this.OtherIn = new OtherInsurance();
  }
  public getInsuranceList(){
    this.getLifeInLst()
    this.getMotorInLst()
    this.getHealthInLst()
    this.getOtherLst()
  }
  public getApplicationUser(){
    if( this.GL.user.id == this.GL.ACTuser.id)
      return {};
    else return { 'id' : this.GL.ACTuser.id};  
  }
  public LifeList;
  public getLifeInLst(){
    this.http.post(this.GL.HOST+'insurance/allLife',this.getApplicationUser()).subscribe((data)=>{
      this.LifeList = data ?  data : null;
      this.LifeIN = new LifeInsurance();
    })
  }
  public MotorList;
  public getMotorInLst(){
    this.http.post(this.GL.HOST+'insurance/allMotor',this.getApplicationUser()).subscribe((data)=>{
      this.MotorList = data ?  data : null;
      this.MotorIn = new MotorInsurance();
    })
  }
  public HealthList;
  public getHealthInLst(){
    this.http.post(this.GL.HOST+'insurance/allHealth',this.getApplicationUser()).subscribe((data)=>{
      this.HealthList = data ?  data : null;
      this.HealthIn = new HealthInsurance();
    })
  }

  public OtherList;
  public getOtherLst(){
    this.http.post(this.GL.HOST+'insurance/allOther',this.getApplicationUser()).subscribe((data)=>{
      this.OtherList = data ?  data : null;
      this.OtherIn = new OtherInsurance();    })
  }

}

class OtherInsurance{
  public productName:string;
  public description:string;
  public dueDate:string;
  public id:string;
}

class InsuranceBase{
  public id:String = null;
  public companyName:string=null;
  public policyNumber:string=null;
  public policyHolderName:string=null;
  public policyStartDate:string=null;
  public policyEndDate:string=null;
  public renewDate:string=null;
  public premiumAmount:string=null;
  public premiumPaymentFrequency:string=null;
  public advisorContactDetail:string=null;
  public applicationUser:Object=null;
  public otherDetail:string=null;

}

class LifeInsurance extends InsuranceBase {
  public planName:string=null;
  public sumAssured:string=null;
  public policyTerm:string=null;
  public premiumPaymentTerm:string=null;
  public nomineeName:string=null;
  public productType:string=null;
  public lastPaidDate:string=null;
  public maturityAmount:string=null;

}

class MotorInsurance extends InsuranceBase {

  public vehicleRegNumber:string=null;
  public carCompany:string=null;
  public carModel:string=null;
  public insuredDeclaredValue:string=null;
  public typeOfCover:string="Comprehensiv";
  public noClaimBonusEligble:Boolean=true;
}

class HealthInsurance extends InsuranceBase {
  public planName:string=null;
  public numberOfFamilyMember:string=null;
  public sumAssured:string=null;
  public tpaContactNumber:string=null;
}


