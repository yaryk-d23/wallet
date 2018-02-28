import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  searchString: string;
  currentPage: any;

  constructor() { }

  ngOnInit() {
  }

  @Input() transactions: any[];

}
