import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addblog, updateblog } from 'src/app/shared/store/Blog/blog.actions';
import { BlogModel } from 'src/app/shared/store/Blog/blog.model';
import { getblogbyid } from 'src/app/shared/store/Blog/blog.selectors';
import { AppStateModel } from 'src/app/shared/store/Global/AppState.model';
import { loadspinner } from 'src/app/shared/store/Global/app.action';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit {

  pagetitle = '';
  editblogid = 0;
  editdata!: BlogModel;

  constructor(private dialogref: MatDialogRef<AddblogComponent>, private builder: FormBuilder,
    private store: Store<AppStateModel>, @Inject(MAT_DIALOG_DATA) public data: any){

  }
  ngOnInit(): void {
    this.pagetitle = this.data.title;
    if(this.data.isedit) {
      this.editblogid = this.data.id;
      this.store.select(getblogbyid(this.editblogid)).subscribe(_data => {
        this.editdata = _data;
        this.blogForm.setValue({
          id: this.editdata.id,
          title: this.editdata.title,
          description: this.editdata.description
        })
      })
    }    
  }

  closePopUp(){
    this.dialogref.close();
  }

  blogForm = this.builder.group({
    id: this.builder.control(0),
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required)
  });

  saveBlogs(){
    if(this.blogForm.valid){
      const _blogInput: BlogModel = {
        id: 0,
        title: this.blogForm.value.title as string,
        description: this.blogForm.value.description as string
      }

      this.store.dispatch(loadspinner({ isloaded: true }));
      setTimeout(() => {
        if(this.data.isedit){
          _blogInput.id = this.blogForm.value.id as number;
          this.store.dispatch(updateblog({ bloginput: _blogInput }));
          console.log('is in edit mode');
        } else {
          this.store.dispatch(addblog({ bloginput: _blogInput }));
          // console.log('is in add mode');
        }
        this.closePopUp();
      }, 1000);

      
    }
  }
}
