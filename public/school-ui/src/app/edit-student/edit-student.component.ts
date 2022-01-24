import { ActivatedRoute } from '@angular/router';
import { StudentService } from './../service/student.service';
import { Component, OnInit } from '@angular/core';
import { Student } from '../service/student';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  student!: Student;
  submitted = false;
  private studentId!: string;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute) { }

  onEdit() {
    this.submitted = true;
    this.studentService.editOne(this.studentId, this.student)
                .then(data => this.student = data)
                .catch(error => {
                  return{"message":"Error editing shop", error};
                });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data =>{
      this.studentId = data['studentId'];
    });

    this.studentService.getOne(this.studentId)
                .then(data=>this.student = data)
                .catch(error=> {
                  return {"message" : "Error reading shops"};
                });
  }

}
