import { Component, OnInit } from '@angular/core';

import { Student } from '../service/student';
import { StudentService } from './../service/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  submitted = false;
  student: Student = new Student();

  constructor(private studentService: StudentService) { }

  onAdd() {
    this.submitted = true;
    this.studentService.addOne(this.student)
              .then(data => console.log('Created student: ', data))
              .catch(error=>console.log('Component Error ',  error));
  }

  ngOnInit(): void {

  }

}
