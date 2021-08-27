import { HostListener,ComponentRef,EventEmitter,OnInit,ElementRef, Injectable ,Component,Input,Output,ViewContainerRef,ViewChild  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { filter,map } from 'rxjs/operators';

// Call : <input [DateT]="''" [(ngModel)]="date2" name="CHECK_IN_TIME2" >

interface BroadcastEvent {
    key: any;
    data?: any;
  }  
  export class Broadcaster {
    private _eventBus: Subject<BroadcastEvent>;
  
    constructor() {
      this._eventBus = new Subject<BroadcastEvent>();
    }
    broadcast(key: any, data?: any) {
      this._eventBus.next({key, data});
    }
    on<T>(key: any): Observable<T> {
      return this._eventBus.asObservable().pipe(
        filter(event => event.key === key),
        map(event => <T>event.data)
      )

    }
  }

  @Injectable()
  export class MessageEvent {
    constructor(private broadcaster: Broadcaster) {}
  
    fire(data: string): void {
      this.broadcaster.broadcast(MessageEvent, data);
    }
    on(): Observable<string> {
      return this.broadcaster.on<string>(MessageEvent);
    }
  }

@Component({
    selector: '[DateT]',
    providers: [DatePipe,MessageEvent],
    templateUrl: './dateT.html',
    styleUrls: ['./date.css'],  
    host:{'(document:click)': 'onoutClick($event)',}
})
export class DateT {

    @Input() DateT:string;
    @Input() ngModel: string;

    @Input() Maxdate:Date = new Date('9999/01/01');
    @Input() Mindate:Date = new Date('0101/01/01');
    @Input() Opendate:Date = new Date();
    @Input() Format:string = "US";

    @ViewChild('Date', {static: false}) Date;
    @ViewChild('DateTable', {static: false}) TimeTable;
    
    @Output() dateModelChange: EventEmitter<Date> = new EventEmitter();
    @Output() ngModelChange=new EventEmitter();

    @ViewChild('validationref', {static: false}) validationref;

    public timemin:number=0;
    public timemax:number=24;
    public T = 8;
    public dt: Date = new Date();
    public dd:number;
    public numbers = [];
    public dates :Array<Array<Date>>=[[],[],[],[],[],[]];
    public first : Date;
    public last : Date;
    readonly monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    readonly Days = ["SUN","MON", "TUE", "WED", "THU", "FRI", "SAT","SUN"];
    
    public error = '';
    public TimeOptions = [["00:00"],["01:00"],"02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]   

    constructor(private _vcr: ViewContainerRef,private _eref: ElementRef, private messageEvent: MessageEvent) {
     this.ngModel = this.transformDate(this.dt);
     this.registerStringBroadcast();
      var Y = new Date().getFullYear();
      this.Opendate = new Date( this.Opendate.getFullYear()+'-'+(this.Opendate.getMonth()+1)+'-'+this.Opendate.getDate())
		this.dd = Y;
     for(let i=0;i<70;i++) this.numbers.push(Y-i);
    }
    ngOnInit(){
        
            if(this.ngModel ){
                this.dt = new Date(this.ngModel);
                this.ngModel = this.transformDate(this.dt);}
            if( this.Opendate != null)    this.dt = new Date(this.Opendate);    
    }
    registerStringBroadcast() {
        this.messageEvent.on()
          .subscribe(message => {
            this.dS=0;
           // console.log(message,'brodcaster');
          });
      }
    
      emitStringBroadcast() {
        this.messageEvent.fire(`Message from`);
      }



    public onSelectionDone(date:Date) {

        var k:string|Array<string> = this.ngModel;
        this.ngModel = this.transformDate(date);
        if(k && this.DateT == 'T') 
        {   k = k.split(" ");
            k[1] ? this.ngModel += ' '+k[1] : null;
        }
        if( this.DateT == '') this.dS = 0;
        var D = new Date(this.ngModel);
        this.ngModel = this.dateFormatter(D,this.Format) //D.getTimezoneOffset();
        //this.ngModel = D.getDate()+'-'+D.getMonth()+'-'+D.getFullYear();
        this.ngModelChange.emit(this.ngModel);
        
    }
    public TimeSelect(T){
        var k:string|Array<string> = this.ngModel;
        if(k ) 
        {   this.ngModel += ' '+T;
            k = k.split(" ");
            k[1] ? this.ngModel = k[0]+' '+T : null;
        
            this.dS = 0;
            this.ngModelChange.emit(this.ngModel);
        }
         
    }
    private showdatepopup(){    
        this.emitStringBroadcast();
        this.dS=1;    
        this.dates = [[],[],[],[],[],[]];
        this.first = new Date( this.dt.getFullYear(),this.dt.getMonth(),1);
        this.last = new Date(this.dt.getFullYear(), this.dt.getMonth() + 1, 1);
        var week = 0;
        var lastmonthdays = this.first.getDay();
        if(lastmonthdays > 0){
            var lastmonthmax = new Date(this.first.getTime()- (24 * 60 * 60 * 1000));
            while(lastmonthdays != 0){
                this.dates[week].unshift(null);
                lastmonthmax = new Date(lastmonthmax.getTime()- (24 * 60 * 60 * 1000));
                lastmonthdays--;   
            }
        }
        while(this.first.valueOf() != this.last.valueOf())
        {
            this.dates[week].push(this.first)
            if(this.first.getDay() == 6)
                week++;
            this.first = new Date(this.first.getTime()+ (24 * 60 * 60 * 1000));    
        }
        lastmonthdays = this.last.getDay();
        if(lastmonthdays < 6){
            //var nextmonthmax = new Date(this.dt.getFullYear(), this.dt.getMonth() + 1, 1);
            while(lastmonthdays != 7){
                this.dates[week].push(null);
                //nextmonthmax = new Date(nextmonthmax.getTime() + (24 * 60 * 60 * 1000));
                lastmonthdays++;   
            }
        }

    }
public backmonth(){
    this.dt = new Date(this.dt.getFullYear(), this.dt.getMonth() - 1, 1);this.showdatepopup();
}
public nextmonth(){
    this.dt = new Date(this.dt.getFullYear(), this.dt.getMonth() + 1, 1);this.showdatepopup();
}
public backyear()
{    this.dt = new Date(this.dt.getFullYear() -1, this.dt.getMonth(), 1);this.showdatepopup();}
public nextyear()
{    this.dt = new Date(this.dt.getFullYear() +1, this.dt.getMonth(), 1);this.showdatepopup();}
public changeyear(x)
{
    this.dt = new Date(x, this.dt.getMonth(), 1);this.showdatepopup();
}

private transformDate(date:Date):string {
    var mm = date.getMonth() + 1; // getMonth() is zero-based
    var dd = date.getDate();

  return [date.getFullYear(),(mm>9 ? '' : '0') + mm,(dd>9 ? '' : '0') + dd].join('-');
       
    }
        
    public dS =0;  
    public up=0;  
    @HostListener('focus', ['$event']) onfocus(event) {
        this.up =0;
        console.log("HostListener" );
        if( window.innerHeight - this._eref.nativeElement.getBoundingClientRect().top < 250)
        {
            // open up
            setTimeout(()=>{this.up = 1},211)
            
        }
        this.showdatepopup()
        
        setTimeout(()=>{this.dS = 1;},211)
    }
          
    public onoutClick(event){
        console.log("onoutClick" );
        if(this.dS ){
            this.ngModelChange.emit(this.ngModel);
        }
        if( !(this._eref && this.TimeTable))
        return;

        if(!(this._eref.nativeElement.contains(event.target) || this.TimeTable.nativeElement.contains(event.target) )){
            this.dS = 0;
        }
    }

    public getKey3(d1,d2){
      d1 =  new Date( d1.getFullYear()+'-'+(d1.getMonth()+1)+'-'+d1.getDate())
      d2 =  new Date( d2.getFullYear()+'-'+(d2.getMonth()+1)+'-'+d2.getDate())
        return d1.getTime() == d2.getTime();
        
        }
    ngAfterViewInit() {
        setTimeout(()=> {
            this._vcr.createEmbeddedView(this.Date,0,0);     
        }, 0);
    }
    
    public dateFormatter(date:Date, format: string) {
        var dateS = "";
        var mm:number|string = date.getMonth() + 1;
        var ms;
        mm < 10 ? ms = '0'+mm : ms = mm;
        var yy:number = date.getFullYear();
        var dd:number|string = date.getDate();
        dd < 10 ? dd= '0'+dd :null;
        switch(format) {
            case "US/":     dateS =yy+ "/" + ms + "/" + dd;
            break;
            case "US":      dateS =yy+ "-" + ms + "-" + dd;
            break;
            case "IND/":    dateS =dd + "/" + ms + "/" + yy;
            break;
            case "IND":     dateS =dd + "-" + ms + "-" + yy;
            break;
            case "ENG/":    dateS =dd + "/" + this.monthNames[mm-1] + "/" +yy;
            break;
            case "ENG":     dateS =dd + "-" + this.monthNames[mm-1] + "-" +yy;
            break;
        }
        return dateS;
    }

    public DecodeDate(date:string, format: string) {
        var dateS:Date;
        var saperator = "-";
        if('/' == format[format.length - 1]) saperator ="/";
        var DATE = date.split(saperator);
        switch(format) {
            case "US":
            case "US/":     dateS = new Date(DATE[0]+ "/" + DATE[1] + "/" + DATE[2]);
            break;
            
            case "IND":
            case "IND/":    dateS = new Date(DATE[2]+ "/" + DATE[1] + "/" + DATE[0]);
            break;
            
            case "ENG":
            case "ENG/":    dateS = new Date(DATE[0]+ "/" + this.monthNames[ +DATE[1] -1] + "/" + DATE[2]);
            break;
            
        }
        return dateS;
        }  
}


