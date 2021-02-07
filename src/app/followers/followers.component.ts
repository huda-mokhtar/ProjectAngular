import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
 users:User[];
 userid:any;
 
  constructor(public userservice:UserService) { 
    this.userid= userservice.loginUser.id;
  }

  ngOnInit(): void {

    this.userservice.Followers().subscribe(a=>{
      this.users=a;
    })

  }

}
