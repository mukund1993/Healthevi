import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.svg',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  @Input() type;
  constructor() { }

  ngOnInit(): void {
  }

}
