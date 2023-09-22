import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BlogModel, Blogs } from 'src/app/shared/store/Blog/blog.model';
import { getBlog, getBlogInfo } from 'src/app/shared/store/Blog/blog.selectors';
import { AppStateModel } from 'src/app/shared/store/Global/AppState.model';
import { AddblogComponent } from '../addblog/addblog.component';
import {
  deleteblog,
  loadblog,
} from 'src/app/shared/store/Blog/blog.actions';
import { loadspinner } from 'src/app/shared/store/Global/app.action';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  constructor(private store: Store<AppStateModel>, private dialog: MatDialog) {}

  blogList!: BlogModel[];
  blogInfo!: Blogs;

  ngOnInit(): void {
    this.store.dispatch(loadspinner({ isloaded: true }));
    setTimeout(() => {
      this.store.dispatch(loadblog());
      this.store.dispatch(loadspinner({ isloaded: false }))
      
    }, 1000);
    this.store.select(getBlogInfo).subscribe((items) => {
      this.blogInfo = items;
    });
  }

  addBlog() {
    this.openPopUp(0, 'Add Blog');
  }

  openPopUp(id: number, title: string, isedit = false) {
    this.dialog.open(AddblogComponent, {
      width: '40%',
      data: {
        id: id,
        title: title,
        isedit: isedit,
      },
    });
  }

  editBlog(id: number) {
    this.openPopUp(id, 'Edit Blog', true);
  }

  removeBlog(id: number) {
    if (confirm('Are you sure want to delete?')) {
      this.store.dispatch(loadspinner({ isloaded: true }));
      setTimeout(() => {
        this.store.dispatch(deleteblog({ id: id }));
      }, 1000);
    }
  }
}
