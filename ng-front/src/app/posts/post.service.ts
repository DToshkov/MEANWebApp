import {Post} from "./post.model"
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class PostService {
  private posts: Post[] = []; // creating an array of posts which are private (immutable object)
  private postUpdated = new Subject<Post[]>(); // keeeps changing, observable - feedback to app - event emitter

  constructor(private http: HttpClient) {
  }

  getPost() {
    // return this.posts;  //by reference
    // return [...this.posts];  //copy of the list of post
    this.http.get<{ success: boolean, data: any }>('http://localhost:3000/api/posts')
      .pipe(map(postData => { // piping to change the format,
        return postData.data.map((payLoad: any) => {
          return {
            title: payLoad.title,
            content: payLoad.content,
            id: payLoad._id // changing id from mongoDB nomenclature
          };
        });
      }))
      .subscribe((transformedData) => { // subscription to changes performed USER front end (get the data)
        this.posts = transformedData.data; // assign to our Immutable Object above (to keep)
        console.log(transformedData.data);
        this.postUpdated.next([...this.posts]);  // spread operator - duplication of contents - passing to postUpdated
      });
  }

  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: '', title: title, content: content}

    this.http.post<{data: String}>('http://localhost:3000/api/posts', post)
      .subscribe((res)=>{
        console.log(res.data);
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
      });

  }
  deletePost(postId: string){
    this.http.delete("http://localhost:3000/api/posts/" + postId).subscribe((res)=>{
        this.posts=this.posts.filter(post => post.id !== postId);
        this.postUpdated.next([...this.posts]);

      });
}
}




