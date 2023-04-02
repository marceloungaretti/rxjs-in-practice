import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from 'rxjs';
import { catchError, delayWhen, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnersCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  ngOnInit() {

    const http$ = createHttpObservable('/api/courses');

    const courses$: Observable<Course[]> = http$
      .pipe(
        catchError(err => {
          console.log('ERR: ', err);
          return throwError(err)
        }),
        tap(() => console.log('http req executed')),
        map(res => Object.values(res["payload"])),
        shareReplay(),
        finalize(() => {
          console.log('FINALIZED')
        })
      );

    this.beginnersCourses$ = courses$
      .pipe(
        map((courses: Course[]) => courses.filter((course: Course) => course.category === 'BEGINNER'))
      );

    this.advancedCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course: Course) => course.category === 'ADVANCED'))
    );

  }

}
