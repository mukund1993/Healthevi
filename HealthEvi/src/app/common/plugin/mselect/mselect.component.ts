import { Component, OnInit, Input, ViewContainerRef, ElementRef, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[Mselect]',
  templateUrl: './mselect.component.html',
  styleUrls: ['./mselect.component.css']
})
export class MSelectComponent implements OnInit {
  
  @ViewChild('MSELECT', {static: false}) MSELECT;
  @Input() Mselect:Array<Object>;
  @Input() Mselected:string | Array<string>="";
  @Output() MselectedChange:EventEmitter<string>  = new EventEmitter();
  @Input() keys: Array<string>; // [0 will be id, 1 will be label]
  @Input() multiple:boolean = false;
  @Input() ngModel:string ="";
  @Output() ngModelChange:EventEmitter<string> =new EventEmitter();
  @Output() itemChange:EventEmitter<string> =new EventEmitter();
  @Input() placeholder: string;
  public Display=0;
  constructor(private _vcr: ViewContainerRef,private _eref: ElementRef,) { }
    public lablecreator(){
      let value =[];
      for( let i of this.Mselect)
      {
        if( this.Mselected.indexOf( i[this.keys[0]].toString() ) > -1 ) 
            value.push(i[this.keys[1]]);
      }
      this.ngModel = value.join(', ');    
    }
    public  itemClicked(item){
    if( this.multiple){
      if( !Array.isArray(this.Mselected) )
      this.Mselected = this.Mselected ? this.Mselected.split(',') : [];
      let index = this.Mselected.indexOf(item[ this.keys[0] ].toString())
      if( index == -1){
        this.Mselected.push( item[this.keys[0]].toString() );
      }
      else{
        this.Mselected.splice( index,1);
       }
       this.lablecreator(); 
      this.MselectedChange.emit( this.Mselected.join(",") )
      this.ngModelChange.emit( this.ngModel )

    }
    else{ // single

      this.MselectedChange.emit( item[this.keys[0]] )
      this.ngModelChange.emit( item[ this.keys[1] ] )
      this.itemChange.emit( item );
      this.Display = 0;
    }
  }

  ngOnChanges(changes){
    if( changes['Mselect']){

    }
  }
  ngOnInit() {
    //console.log(this.Mselect)
    this.ngModel ? null : this.ngModel ="";
    this.Mselected ? null : this.Mselected ="";
  }
    public Reset(){
      if( this.multiple){
        this.Mselected = [];
      }
      else {this.Mselected ="";}
      
    }
   public close(){
    this.Display = 0;
  }

  @HostListener('click', ['$event.target'])
  onClick(btn) {
    setTimeout(()=>{    this.Display = 1;},1)

 }

  ngAfterViewInit() {
    setTimeout(()=> {
        this._vcr.createEmbeddedView(this.MSELECT,0,0);     
    }, 0);
}
}
