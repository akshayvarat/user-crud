
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CrudService } from 'src/app/services/crud.service';
import { User } from 'src/app/user';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  userList!:User[];
  selectedUser!: User;

  constructor(private crudService: CrudService,public dialog: MatDialog) {}

  ngOnInit(): void {
    this.refreshUserList();
  }
  refreshUserList(): void {
    this.crudService.getUsers().subscribe(
      (users: User[]) => {
        if (users) {
          this.userList = users;
          // window.alert(users);
        }
      },
      (err) => {
        window.alert('Error occurred while fetching users');
      }
    );
  }
  

  editUser(user: User): void {
    this.selectedUser = user;
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '250px',
      data: this.selectedUser 
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log('The dialog was closed');
    });
   
  }

  deleteUser(user: User) {
    this.crudService.deleteUser(Number(user.id)).subscribe({   
    next(res:any) {
      if (res) {
        window.alert(res.msg)
      }
    },error(err) {
      window.alert('error')
    },});
  }
}
