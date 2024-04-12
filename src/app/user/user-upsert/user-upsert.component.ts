import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { ValidationService } from 'src/app/services/validation.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.css']
})
export class UserUpsertComponent {
  @Input()
  selectedUser!: User; // Input property to receive the selected user
  userForm!: FormGroup;
  emailExists = false;

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    private validationService: ValidationService,
    private route:Router
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

    // Checking the user email is existence when value changes
    this.userForm.get('email')?.valueChanges.subscribe(value => {
      this.validationService.checkUserExists(value).subscribe(exists => {
        this.emailExists = exists;
      });
    });

    // If selectedUser is provided, set form values to the selected user
    if (this.selectedUser) {
      this.userForm.patchValue(this.selectedUser);
    }
  }

  saveUserData(): void {
    if (this.userForm.valid && !this.emailExists) {
      const newUser: User = this.userForm.value;
      if (this.selectedUser) {
        // Update user
        newUser.id = this.selectedUser.id; 
        this.crudService.updateUser(newUser).subscribe(() => {
          // Success message
        });
      } else {
        // Save new user
        this.crudService.saveUser(newUser).subscribe(() => {
          // Success message
        });
      }
    }
  }
  gotUserList(){
    this.route.navigateByUrl('/user-list');
  }
}

