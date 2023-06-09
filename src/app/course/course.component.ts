import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay
} from 'rxjs/operators';
import { merge, fromEvent, Observable, concat } from 'rxjs';
import { Lesson } from '../model/lesson';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput', { static: true }) input: ElementRef;
  courseId: string;
  course$: Observable<Course>;
  lessons$: Observable<Lesson[]>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];
    this.course$ = createHttpObservable(`/api/courses/${this.courseId}`);
  }

  ngAfterViewInit() {
    this.lessons$  = fromEvent<KeyboardEvent>(this.input.nativeElement, 'keyup')
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.loadLessons(search))
      );

  }

  loadLessons(search: string = ''): Observable<Lesson[]> {
    return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
      .pipe(
        map(res => res["payload"])
      );
  }

}
