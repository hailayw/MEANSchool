
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../service/student';

import { StudentService } from './../service/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId!: string;
  student!:Student;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data=>{
      this.studentId = data['studentId'];
    })
    this.studentService.getOne(this.studentId)
              .then(data=>this.student = data)
              .catch(error=>console.log('Component: Error finding student', error));
  }

}
