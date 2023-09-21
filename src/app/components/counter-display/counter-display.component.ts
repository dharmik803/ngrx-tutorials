import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { counterModel } from 'src/app/shared/store/counter.model';
import { getCounter } from 'src/app/shared/store/counter.selector';

@Component({
  selector: 'app-counter-display',
  templateUrl: './counter-display.component.html',
  styleUrls: ['./counter-display.component.css']
})
export class CounterDisplayComponent implements OnInit, OnDestroy{

  constructor(private store : Store<{counter : counterModel}>){

  }
  

  counterDisplay !: number;
  counterSubscribe !: Subscription;
  counter$ !: Observable<counterModel>;

  ngOnInit(): void {

    this.counterSubscribe = this.store.select(getCounter).subscribe(data => {
      this.counterDisplay = data;
      console.log('Counter is displayed');
    });

    

    // this.counter$ = this.store.select('counter');

  }

  ngOnDestroy(): void {
    if(this.counterSubscribe){
      this.counterSubscribe.unsubscribe();
    }
  }


}
