import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PostService} from "../post.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Post} from "../post.model";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: Post = {id: '', title: '', content: ''};
  private mode: string = 'create';
  private postId: string = '';

  constructor(public postService: PostService, public route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId=<string>paramMap.get('postId');

        this.postService.getPostById(this.postId).subscribe(post => {

          this.post = {id: post._id, title: post.title, content: post.content};
        });
      } else {
        this.mode = 'create';
        this.postId = '';
      }
    });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content);
      form.resetForm()
    } else{
      this.postService.updatePost(this.postId, form.value.title, form.value.content);
    }
  }
}


// import {Component, EventEmitter} from '@angular/core';
//
// @Component({
//   selector: 'app-create-post',
//   templateUrl: './create-post.component.html',
//   styleUrls: ['./create-post.component.css']
// })
// // export class CreatePostComponent {
// //   newPost: any = 'No Content';
// //   enteredValue: any; /*ngModel Variable*/
// //
// //
// //
// //   onAddPost(){
// //     this.newPost = this.enteredValue;
// //     alert(this.newPost);
// //     console.log(this.newPost);
// //     console.dir(this.newPost);
// //   }
//   export class CreatePostComponent {
//     enteredTitle = "";
//     enteredContent = "";
//     @Output() postCreated = new EventEmitter<Post>();
//
//     onAddPost(form: NgForm) {
//       if(form.invalid) {
//         return;
//       }
//       const post: Post = {
//         title: form.value.title,
//         content: form.value.content
//       };
//       this.postCreated.emit(post);
//     }
// }
//
// import {Component, OnInit} from '@angular/core';
// import {NgForm} from '@angular/forms';
// import {PostService} from "../post.service";
//
// import {Post} from "../post.model";
//
// @Component({
//   selector: 'app-create-post',
//   templateUrl: './create-post.component.html',
//   styleUrls: ['./create-post.component.css']
// })
// export class CreatePostComponent implements OnInit {
//   constructor(public postService: PostService) {
//
//   }
//   ngOnInit() {
//
//   }
//
//   onAddPost(form: NgForm) {
//     if(form.invalid){
//       return;
//     }
//     this.postService.addPost(form.value.title, form.value.content);
//     form.resetForm()
//   }
// }
//
//   // constructor(public postService: PostService) {
//   // }

//   ngOnInit() {
//   }
//
//   onAddPost(form: NgForm) {
//     if (form.invalid) {
//       return;
//     }
//     this.postService.addPost(form.value.title, form.value.content);
//     form.resetForm()
//   }
// }
