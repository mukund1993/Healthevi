import { Component ,ElementRef,PipeTransform,Pipe} from '@angular/core';
import { GlobalService } from '../../global.service';


@Component({
    selector:'messagepop',
    templateUrl:'./messagepop.html'
})
export class messagepop{
constructor( public GL: GlobalService){

}
}