import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppStateModel } from 'src/app/shared/store/Global/AppState.model';
import { customIncrement } from 'src/app/shared/store/counter.actions';
import { counterModel } from 'src/app/shared/store/counter.model';
import { getName } from 'src/app/shared/store/counter.selector';

@Component({
  selector: 'app-custom-counter',
  templateUrl: './custom-counter.component.html',
  styleUrls: ['./custom-counter.component.css']
})
export class CustomCounterComponent implements OnInit {

  constructor(private store: Store<AppStateModel>){

  }

  counterInput!: number;
  actionType = 'add';
  name: string = '';
  counterSubscribe!: Subscription;


  ngOnInit(): void {
    this.counterSubscribe = this.store.select(getName).subscribe(data => {
      this.name = data;
      console.log('name is changed');
    });

    
  }


  onCustomCounter(){
    this.store.dispatch(customIncrement({ value: +this.counterInput, action: this.actionType }));
  }
}
