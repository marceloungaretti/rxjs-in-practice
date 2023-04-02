import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { concat, fromEvent, interval, merge, noop, Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const http$ = createHttpObservable('/api/courses');
    // const sub = http$.subscribe(console.log);
    // setTimeout(() => sub.unsubscribe(), 0);
  }
}

