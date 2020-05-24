import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { User } from '../user-management-component/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {
  myForm: FormGroup;
  userName: AbstractControl;
  id: AbstractControl;
  xs: AbstractControl;
  users$: Observable<User>;
  baseUrl = 'http://127.0.0.1:8080/';
  currentUser: User;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.myForm = this.fb.group({
      'userName': [''],
      'xs': [''],
      'id': ['']
    })

    this.userName = this.myForm.controls['userName'];
    this.id = this.myForm.controls['id'];
    this.xs = this.myForm.controls['xs'];
  }
  ngOnInit(): void {
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'cj');
  }

  search() {
    this.users$ = <Observable<User>>this.httpClient.get(this.baseUrl + 'cj/' + this.id.value);
  }


  add() {
    console.log(this.myForm.value);
    // 对于可观察对象执行，我们需要订阅其结果
    this.httpClient.post(this.baseUrl + 'cj', this.myForm.value).subscribe((val: any) => {
      // val是服务器返回的值 
      if (val.succ) {
        alert('添加成功!');
      }
    }
    );
  }

  select(u: User) {
    this.currentUser = u;
    this.myForm.setValue(this.currentUser);
  }

  delete() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.delete(this.baseUrl + 'cj/' + this.currentUser.id).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('删除成功!');
          }
        }
      )
    }
  }


  update() {
    if (!this.currentUser) {
      alert('必须先选择用户!');
    }
    else {
      this.httpClient.put(this.baseUrl + 'cj', this.myForm.value).subscribe(
        (val: any) => {
          if (val.succ) {
            alert('修改成功!');
          }
        }
      )
    }
  }
}








