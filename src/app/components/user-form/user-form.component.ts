import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User, UserApiResponse } from 'src/app/modals/user.modal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    countryCode: new FormControl('+91', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
  });

  selectedPhoto: any;
  previewPhoto: any;
  assetUrl = 'http://localhost:3000';
  userData: User | undefined;
  isEdit = false;
  userId: string = '';
  isLoading = false;
  existingPhoto = '';




  constructor(
    private $userService: UserService,
    private $snackbar: MatSnackBar,
    private $dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    if (data) {
      this.userData = data;
      this.isEdit = true;
      this.userId = this.userData._id;
      this.userForm.patchValue(this.userData);
      this.previewPhoto = this.assetUrl + this.userData.profileImage;
    }
  }


  closeDialog() {
    this.$dialogRef.close(false);
  }

  selectFile(event: any): void {
    const files = event.target.files;
    console.log(files);
    if (files.length) {
      this.selectedPhoto = files[0];
      const reader = new FileReader();
      reader.onload = e => this.previewPhoto = reader.result;
      reader.readAsDataURL(this.selectedPhoto);
      this.existingPhoto = '';
    }
  }

  submit() {
    if (this.isEdit) this.editUser();
    else this.addUser();
  }


  private convertToFormData(userData: any): FormData {
    const formData = new FormData();
    for (const key in userData) {
      formData.set(key, userData[key]);
    }
    if (this.selectedPhoto) formData.set('profileImage', this.selectedPhoto);
    return formData;
  }

  private addUser() {
    this.isLoading = true;
    const userData = this.convertToFormData(this.userForm.value);
    this.$userService.addUser(userData).subscribe((res: UserApiResponse) => {
      this.isLoading = false;
      this.$snackbar.open(res.message, 'close', { duration: 2000 });
      this.$dialogRef.close(res.data.user);
    }, (err: Error) => {
      this.isLoading = false;
      this.$snackbar.open(err.message, 'close', { duration: 2000 });
    })
  }


  private editUser() {
    this.isLoading = true;
    const userData = this.convertToFormData(this.userForm.value);
    this.$userService.editUser(this.userId, userData).subscribe((res: UserApiResponse) => {
      this.isLoading = false;
      this.$snackbar.open(res.message, 'close', { duration: 2000 });
      this.$dialogRef.close(res.data.user);
    }, (err: Error) => {
      this.isLoading = false;
      this.$snackbar.open(err.message, 'close', { duration: 2000 });
    })
  }





}
