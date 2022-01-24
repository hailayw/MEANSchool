Ng2OrderPipe
import { Component, OnInit } from '@angular/core';

import { StudentService } from './../service/student.service';
import { Student } from '../service/student';
import { Ng2OrderModule, Ng2OrderPipe } from 'ng2-order-pipe';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  page: number = 1;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentService.getAll()
        .then(data=> this.students = data)
        .catch(this._handleError)
  }


  private _handleError(err: any): any {
    console.log('Component: Error ', err);
    return err;
  }

}
