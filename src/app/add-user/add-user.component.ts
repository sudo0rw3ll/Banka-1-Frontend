import {Component, Inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {PopupService} from "../service/popup.service";
import { UserService } from '../service/employee.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { PermissionService } from '../service/permission.service';
import { Permissions } from '../model/model';
import {TransparentTextFieldModule} from "../welcome/redesign/TransparentTextField";
import {OutlineOrangeButtonModule} from "../welcome/redesign/OutlineOrangeButton";
import {OrangeButtonModule} from "../welcome/redesign/OrangeButton";
import {FieldComponentModule} from "../welcome/redesign/FieldCompentn";



@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, CommonModule, TransparentTextFieldModule, OutlineOrangeButtonModule, OrangeButtonModule, FieldComponentModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  addUserData: {
    email: string,
    firstName: string,
    lastName: string,
    jmbg: string,
    position: string,
    phoneNumber: string,
    active: boolean,
    orderLimit: number,
    requireApproval: boolean
    // permissions: Permissions[]
  } = {
    email: '',
    firstName: '',
    lastName: '',
    jmbg: '',
    position: '',
    phoneNumber: '',
    active: true,
    orderLimit: 0,
    requireApproval: false
    // permissions: [],
  };

  limit: boolean=false;

  // permissions: Permissions[] = [
  //   {
  //     permissionId: 1,
  //     name: 'addUser',
  //     description: ''
  //   },
  //   {
  //     permissionId: 2,
  //     name: 'modifyUser',
  //     description: ''
  //   },
  //   {
  //     permissionId: 3,
  //     name: 'deleteUser',
  //     description: ''
  //   },
  //   {
  //     permissionId: 4,
  //     name: 'readUser',
  //     description: ''
  //   },
  // ];

  constructor(private router: Router,
    private popupService: PopupService,
    private userService: UserService,
    // private permissionService: PermissionService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      // TODO: Uncomment this when backend is ready
      // this.permissionService.getAllPermissions().subscribe(
      //   response => {
      //     this.permissions = response;
      //   },
      //   error => {
      //     // Handle error
      //   });
    }

  // onPermissionChange(permission: Permissions, event: any) {
  //   if (event.target.checked) {
  //     this.addUserData.permissions.push(permission);
  //   } else {
  //     const index = this.addUserData.permissions.findIndex(p => p.permissionId === permission.permissionId);
  //     if (index !== -1) {
  //       this.addUserData.permissions.splice(index, 1);
  //     }
  //   }
  // }

  onCreateAddUserPopup() {
    if (this.validateForm()) {
      this.addUserData.orderLimit = this.addUserData.orderLimit + 0.0;
      this.userService.addUser(this.addUserData).subscribe(
        response => {
          this.data.loadEmployeesFromDataBase();
          alert('Successfully created user ' + JSON.stringify(this.addUserData));
          this.dialogRef.close();
          // this.router.navigate(['/user/list']);
        },
        error => {
          alert('Error creating user:' + JSON.stringify(this.addUserData));
          // Handle error
        });
    }
  }

  onCancelAddUserPopup() {
    this.dialogRef.close();
    // const confirmResult = confirm('Are you sure you want to cancel adding the user?');
    //  if (confirmResult) {
    //   this.router.navigate(['/user/list']);
    //  }
  }

  onCloseAddUserPopup() {
    this.dialogRef.close();
    // const confirmResult = confirm('Are you sure you want to cancel adding the user?');
    // if (confirmResult) {
    //   this.router.navigate(['/user/list']);
    // }
   }


  private validateForm(): boolean {


    if (!this.addUserData.email || !this.isValidEmail(this.addUserData.email)) {
      this.popupService.openPopup("Error", "Email nije validan.");
      return false;
    }

    if (!this.addUserData.firstName) {
      this.popupService.openPopup("Error", "Name nije validan.");
      return false;
    }

    if (!this.addUserData.lastName) {
      this.popupService.openPopup("Error", "Surname nije validan.");
      return false;
    }

    if (!this.addUserData.jmbg || !this.isValidJMBG(this.addUserData.jmbg)) {
      this.popupService.openPopup("Error", "JMBG nije validan.");
      return false;
    }

    if (!this.addUserData.phoneNumber || !this.isValidPhoneNumber(this.addUserData.phoneNumber)) {
      this.popupService.openPopup("Error", "Broj telefona nije validan.");
      return false;
    }
    return true;
  }

  private isValidEmail(email: string): boolean {
    return email.includes('@');
  }

  private isValidJMBG(jmbg: string): boolean {
    return jmbg.length === 13;
  }

  private isValidPhoneNumber(phone: string): boolean {
    return /^\d+$/.test(phone);
  }

}
