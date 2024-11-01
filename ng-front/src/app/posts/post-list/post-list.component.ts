// import {Component, OnDestroy, OnInit} from '@angular/core';
// import {PostService} from '../post.service'
// import {Post} from "../post.model";
// import {Subscription} from "rxjs";
//
//
// @Component({
//   selector: 'app-post-list',
//   templateUrl: './post-list.component.html',
//   styleUrls: ['./post-list.component.css']
// })
// export class PostListComponent implements OnInit, OnDestroy {
//   posts: Post[] = [];
//   private postSub = Subscription;
//
//   constructor(public postService: PostService) {
//     this.postSub = new Subscription();
//   }
//
//   ngOnInit() {
//     this.postService.getPost();
//     this.postSub = this.postService.getPostUpdateListener()
//       .subscribe( (posts:Post[]) => {
//         this.posts = posts;
//
//     });
//
//   }
//   ngOnDestroy() {
//     this.postSub.unsubscribe();
//   }
// }
import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../post.service'
import {Post} from "../post.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading: boolean = false;
  private postSub: Subscription;

  constructor(public postService: PostService) {
    this.postSub = new Subscription();
  }

  ngOnInit() {
    this.isLoading = true;
    this.postService.getPost();
    this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(id: string) {
    this.postService.deletePost(id);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
