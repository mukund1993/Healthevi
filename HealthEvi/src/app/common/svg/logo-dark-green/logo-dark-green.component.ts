import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-logo-dark-green',
  templateUrl: './logo-dark-green.component.svg',
  styleUrls: ['./logo-dark-green.component.css']
})
export class LogoDarkGreenComponent implements OnInit {
  @Input() type;
  constructor() { }

  ngOnInit(): void {
  }

}
