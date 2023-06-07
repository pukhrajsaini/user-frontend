import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserApiResponse } from 'src/app/modals/user.modal';
import { UserService } from 'src/app/services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  page = 1;
  limit = 100;
  isLoading = false;
  userList: User[] = [];
  totalUsers = 0;

  columnToDisplay = ['sn', 'firstName', 'lastName', 'email', 'phoneNumber', 'action'];

  constructor(
    private $userService: UserService,
    private $dialog: MatDialog,
    private $snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  private getUserList() {
    this.$userService.list(this.page, this.limit).subscribe((res: UserApiResponse) => {
      this.isLoading = false;
      this.userList = res.data.list;
      this.totalUsers = res.data.count;
    },
      (err: Error) => {
        this.isLoading = false;
        this.$snackbar.open(err.message, 'close', { duration: 2000 });
      })
  }


  editUser(data: any) {
    this.openDialog(data);
  }

  addUser() {
    this.openDialog();
  }


  deleteUser(userId: string) {
    this.$userService.delete(userId).subscribe((res: UserApiResponse) => {
      this.$snackbar.open(res.message, 'close', { duration: 2000 });
      this.getUserList();
    }, (err: Error) => {
      this.isLoading = false;
      this.$snackbar.open(err.message, 'close', { duration: 2000 });
    })
  }


  private openDialog(data = null) {
    const dialogRef = this.$dialog.open(UserFormComponent, {
      data,
      maxHeight: '90vh',
      maxWidth: '600px'
    });

    dialogRef.afterClosed().subscribe((status: boolean) => {
      if (status) this.getUserList();
    })
  }
}
