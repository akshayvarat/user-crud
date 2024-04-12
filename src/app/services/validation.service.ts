import { Observable, map } from 'rxjs';
import { CrudService } from './crud.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private crudService: CrudService) {}

checkUserExists(email: string): Observable<boolean> {
  return this.crudService.getUsers().pipe(
    map(users => users.some((user: { email: string; }) => user.email === email))
  );
}
}

