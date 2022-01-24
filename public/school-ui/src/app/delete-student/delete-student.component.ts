import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit {
  private studentId!: string;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data =>{
      this.studentId = data['studentId'];
    });

    this.studentService.deleteOne(this.studentId)
                .then(data => console.log('Shop deleted successfuly!', data))
                .catch(error => {
                  return{"message":"Error deleting shop", error};
                });
  }
}
