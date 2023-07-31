import {Component, OnInit} from '@angular/core';
import {UsersService} from "../shared/services/api/users.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UsersService) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      console.log('users data', data);
    })
  }

}
