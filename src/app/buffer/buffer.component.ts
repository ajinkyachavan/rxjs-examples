import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { BehaviorSubject, combineLatest, fromEvent, interval } from "rxjs";
import { mapTo, filter, buffer, takeUntil, bufferCount, bufferWhen } from "rxjs/operators";

@Component({
  selector: "app-buffer",
  templateUrl: "./buffer.component.html",
  styleUrls: ["./buffer.component.scss"]
})
export class BufferComponent implements AfterViewInit {

  @ViewChild('startRef', {read: ElementRef, static: false}) startRef!: ElementRef;
  @ViewChild('pauseRef', {read: ElementRef, static: false}) pauseRef!: ElementRef;

  ngAfterViewInit() {
    const start$ = fromEvent(this.startRef.nativeElement, 'click');
    const pause$ = fromEvent(this.pauseRef.nativeElement, 'click');

    /**
     * buffer until pause buutton is clicked
     */
    start$.pipe(
      bufferWhen(() => pause$)
    ).subscribe(console.log);

    /**
     * buffer values until pause is clicked for nth time
     * e.g. 1. click on start 5 times, then click pause
     *      2. click on start 3 times, then click pause.
     * Result will be [Array(5), Array(3)] since bufferCount is 2
     */
    start$.pipe(
      buffer(pause$),
      bufferCount(2)
    ).subscribe(console.log);

    /**
     * buffer click events in groups of 2
     */
    start$.pipe(
      bufferCount(2)
    ).subscribe(console.log);

  }

}
