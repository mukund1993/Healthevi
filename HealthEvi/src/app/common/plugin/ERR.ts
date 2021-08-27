import { HostListener,ComponentRef,EventEmitter,OnChanges,OnInit,ElementRef, Injectable ,Component,Input,Output,ViewContainerRef,ViewChild  } from '@angular/core';  
import { GlobalService } from '../../global.service';
// Call:  <input [ERR]="''" [(ngModel)]="Time" [pattern]="V_adhar" reqired> 

@Component ({
    selector:'[ERR]',
    template:`<ng-template #validationref>
                    <span class="helper-text red-text ERR2" *ngIf="error">{{error}}</span>
            </ng-template>
            <ng-content></ng-content>
			` 
})
export class ERR implements OnInit {
    @Input() ERR:string;
    @Input() ngModel:string;
    @Output() ngModelChange = new EventEmitter()
    @Input() pattern:RegExp =null;
    @ViewChild('validationref' , {static: false}) validationref;
    public error:string = "";
    
    ngOnInit() {
     //   this.ngOnChanges();
          }
    ngOnChanges(args?: any[]) {

      // Length Checker
      if( this._vcr.element.nativeElement.type.toLowerCase() == 'number'){
          
          let maxL = +this._vcr.element.nativeElement.maxLength;
          if(this.ngModel && maxL > 0){
              if( this.ngModel.toString().length > maxL){
                  this.ngModel = this.ngModel.toString().slice(0,-1);
                  setTimeout(()=>{
                    this.ngModelChange.emit(this.ngModel)
                   },0)

              }
          }
      }
      var reqired = false;
      try {
         reqired = this._vcr.element.nativeElement.required  
      
      } catch (error) {
        reqired= false;
       }
       
      this.error ="";
        if(this.pattern && this.ngModel)
        {      //  console.log(reqired);
            switch (this.pattern.toString()){
            case this.V.V_hsn.toString(): this.V.V_hsn.exec(this.ngModel) ? this.error = "" : this.error = "HSn not valid.";break;
            case this.V.V_name.toString(): this.V.V_name.exec(this.ngModel) ? this.error = "" : this.error = "name not valid.";  break;

            case this.V.V_email.toString(): this.V.V_email.exec(this.ngModel) ? this.error = "" : this.error = "Email not valid.";break;
            case this.V.V_adhar.toString(): this.V.V_adhar.exec(this.ngModel) ? this.error = "" : this.error = "adhar not valid.";  break;

            case this.V.V_pan.toString(): this.V.V_pan.exec(this.ngModel) ? this.error = "" : this.error = "pan not valid.";break;
            case this.V.V_mob.toString(): this.V.V_mob.exec(this.ngModel) ? this.error = "" : this.error = "mobile no not valid.";  break;

            case this.V.V_acc.toString(): this.V.V_acc.exec(this.ngModel) ? this.error = "" : this.error = "Account not valid.";break;
            case this.V.V_pin.toString(): this.V.V_pin.exec(this.ngModel) ? this.error = "" : this.error = "Pin code not valid.";  break;
            case this.V.V_policy.toString(): this.V.V_policy.exec(this.ngModel) ? this.error = "" : this.error = "Only Numners & Letters valid.";  break;
            
            case this.V.V_num.toString(): this.V.V_num.exec(this.ngModel) ? this.error = "" : this.error = "Only 2 numbers allowed.";break;
            case this.V.V_int.toString(): this.V.V_int.exec(this.ngModel) ? this.error = "" : this.error = "Only Numbers allowed.";  break;
            case this.V.V_age.toString(): this.V.V_age.exec(this.ngModel) ? this.error = "" : this.error = "Only Numbers, between 1 to 128 allowed.";  break;
            case this.V.V_pass.toString(): this.V.V_pass.exec(this.ngModel) ? this.error = "" : this.error = "Only Numbers of 4 digit allowed.";  break;
                        
            case this.V.V_price.toString(): this.V.V_price.exec(this.ngModel) ? this.error = "" : this.error = "Only Numbers with 2 decimal points.";break;
            case this.V.V_percent.toString(): this.V.V_percent.exec(this.ngModel) ? this.error = "" : this.error = "Can not be greater than 100.";  break;
            }
        }
        else{
            if( reqired && !this.ngModel)
            this.ERR ? this.error = this.ERR+" field is required." :    this.error = "This field is required.";
        }
       
    }
    constructor(public _vcr: ViewContainerRef, public V:GlobalService ) {
    }

   
  ngAfterViewInit() {
      setTimeout(() => {
        this._vcr.createEmbeddedView(this.validationref);   
      }, 0);
    }
}