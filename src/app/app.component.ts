import {Component, OnInit} from '@angular/core';
import {AppleService} from './services/apple.service';
import {FlourService} from './services/flour.service';
import {delay, interval, Observable, of, timeInterval, timer} from 'rxjs';
import {Apple, Flour} from '@models';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    AppleService,
    FlourService,
  ]
})
export class AppComponent implements OnInit {
  title = 'angular-composition';
  apples$ = this.appleService.get$();
  flour$ = this.flourService.get$();

  constructor(
    private appleService: AppleService,
    private flourService: FlourService,
  ) {

  }

  ngOnInit(): void {
    this.appleServiceTest();
    this.flourServiceTest();
  }

  appleServiceTest(): void {
    timer(3000)
      .pipe(
        switchMap(() => this.appleService.create$({id: 1, name: 'Granny Smith'}))
      )
      .subscribe()

    // the code above is only used to delay each transaction by 3 seconds
    // service can be called normally like this
    // this.appleService.create$({id: 1, name: 'Granny Smith'}).subscribe()

    timer(6000)
      .pipe(
        switchMap(() => this.appleService.update$({id: 1, name: 'Toffee Apple'}))
      )
      .subscribe()

    // the code above is only used to delay each transaction by 3 seconds
    // service can be called normally like this
    // this.appleService.update$({id: 1, name: 'Toffee Apple'}).subscribe()

    timer(9000)
      .pipe(
        switchMap(() => this.appleService.delete$())
      )
      .subscribe()

    // the code above is only used to delay each transaction by 3 seconds
    // service can be called normally like this
    // this.appleService.delete$(1).subscribe()
  }

  flourServiceTest(): void {

    timer(3000)
      .pipe(
        switchMap(() => this.flourService.create$({id: 1, type: 'Strong', name: 'Dark Bread'}))
      )
      .subscribe()

    // the code above is only used to delay each transaction by 3 seconds
    // service can be called normally like this
    // this.flourService.create$({id: 1, type: 'Strong', name: 'Dark Bread'}).subscribe()

    timer(6000)
      .pipe(
        switchMap(() => this.flourService.update$({id: 1, type: 'Strong', name: 'White Bread'}))
      )
      .subscribe()

    // the code above is only used to delay each transaction by 3 seconds
    // service can be called normally like this
    // this.flourService.update$({id: 1, type: 'Strong', name: 'White Bread'}).subscribe()

    timer(9000)
      .pipe(
        switchMap(() => this.flourService.delete$(1))
      )
      .subscribe()

    // the code above is only used to delay each transaction by 3 seconds
    // service can be called normally like this
    // this.flourService.delete$(1).subscribe()



  }
}
