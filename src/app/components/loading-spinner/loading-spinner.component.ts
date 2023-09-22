import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getspinnerstate } from 'src/app/shared/store/Blog/blog.selectors';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {

  isLoaded: boolean = false;

  constructor(private store: Store){}

  ngOnInit(): void {
    this.store.select(getspinnerstate).subscribe( res => {
      this.isLoaded = res;
    });
  }
}
