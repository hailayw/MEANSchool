import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsComponent } from './students/students.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FormsModule } from '@angular/forms';
import { ViewStudentComponent } from './view-student/view-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';

@NgModule({
  declarations: [
    AppComponent,
    AddStudentComponent,
    StudentsComponent,
    NavigationComponent,
    ViewStudentComponent,
    EditStudentComponent,
    DeleteStudentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    Ng2OrderModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'students', component: StudentsComponent},
      {path: 'students/add-new', component: AddStudentComponent},
      {path: 'students/view/:studentId', component: ViewStudentComponent},
      {path: 'students/edit/:studentId', component: EditStudentComponent},
      {path: 'students/delete/:studentId', component: DeleteStudentComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
