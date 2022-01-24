import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }
  private _baseUrl = 'http://localhost:4040/api/'

  //Create
  addOne(student: Student): Promise<Student>{
        return this.http.post(this._baseUrl + "students", student)
                      .toPromise().then(res => res as Student)
                      .catch(this._handleError);
  }

  //Read
  getAll(): Promise<Student[]> {
    return this.http.get(this._baseUrl + "students").toPromise()
                .then(res => res as Student[])
                .catch(this._handleError);
  }

  getOne(studentId: string): Promise<Student> {
    return this.http.get(this._baseUrl + "students/" + studentId).toPromise()
            .then(response => response as Student)
            .catch(this._handleError);
  }

  //Update
  editOne(studentId: string, student: Student): Promise<Student> {
    return this.http.put(this._baseUrl + "students/"+ studentId, student).toPromise()
            .then(response => response as Student)
            .catch(this._handleError);
  }

  //Delete
  deleteOne(studentId: string) {
    return this.http.delete(this._baseUrl + "students/" + studentId).toPromise()
            .then(result => console.log('Student successfully deleted', result))
            .catch(this._handleError);
  }

  private _handleError(err: any): any {
    console.log('Service: Error ', err);
    return err;
  }

}

