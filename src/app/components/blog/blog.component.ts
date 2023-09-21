import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BlogModel } from 'src/app/shared/store/Blog/blog.model';
import { getBlog } from 'src/app/shared/store/Blog/blog.selectors';
import { AppStateModel } from 'src/app/shared/store/Global/AppState.model';
import { AddblogComponent } from '../addblog/addblog.component';
import { deleteblog, loadblog } from 'src/app/shared/store/Blog/blog.actions';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  
  constructor(private store: Store<AppStateModel>, private dialog: MatDialog){

  }

  blogList !: BlogModel[];
  
  ngOnInit(): void {
    this.store.dispatch(loadblog());
    this.store.select(getBlog).subscribe( (items) => {
      this.blogList = items;
      console.log(this.blogList);
      
    })
  }

  addBlog(){
    this.openPopUp(0, 'Add Blog');
  }

  openPopUp(id: any, title: any, isedit = false){
    this.dialog.open(AddblogComponent, {
      width: '40%',
      data: {
        id: id,
        title: title,
        isedit: isedit
      }
    })
  }

  editBlog(id: any){
    this.openPopUp(id, 'Edit Blog', true);
  }

  removeBlog(id: any){
    if(confirm('Are you sure want to delete?')){
      this.store.dispatch(deleteblog({ id: id }));
    }
  }

}
