import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blogs } from '../models/blogs';
import { BlogsService } from '../_service/blogs.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  blogs:Blogs[];
  search:string;
  owner: any;
  selectedFile: File;
  newblog= new FormData();
  blog:Blogs=new Blogs("","","",[],{});
  constructor(public blogsservice: BlogsService, public router: Router) {
    this.owner = blogsservice.loginUser();
    console.log(this.owner);
  }

  ngOnInit(): void {
    }

  onFileSelect(event) {
    this.selectedFile = <File>event.target.files[0];
    this.newblog.append('photo', this.selectedFile, this.selectedFile.name);
    console.log(this.selectedFile);
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  post(e) {
    this.newblog.append('title',this.blog.title);
    this.newblog.append('body', this.blog.body);
    console.log( this.blog.tags);
    this.newblog.append('tags', this.blog.tags.toString());
    this.blogsservice.createBlog(this.newblog).subscribe(a=>{
    console.log(a);
    location.reload();
    this.router.navigate(['/profile/autherblogs']);
    })
  }
  onKey(){
    this.blogsservice.searchTageTitle(this.search).subscribe(a=>{
      this.blogsservice.searchResult=a;
      console.log(this.search,a);
    })
    this.router.navigate(['/profile/search']);
  }
}