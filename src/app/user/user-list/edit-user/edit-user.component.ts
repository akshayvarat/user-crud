import { User } from './../../../user';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/crud.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  userForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public userData: User,
    private fb: FormBuilder,
    private crudService: CrudService,
    private validationService: ValidationService
  ) {}

  ngOnInit(): void {
    // Build and initial UserForm
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
    if (this.userData) {
      this.userForm.patchValue(this.userData);
    }
  }
  UpdatedData(){
    if (this.userForm.valid) {
      let payload=this.userForm.value
      this.crudService.updateUser(payload).subscribe({
        next(res:any) {
          if (res) {
            window.alert(res?.msg)
          }
        },error(err) {
          window.alert('error')
        },
      });
    } else {
      
    }
  }
}
