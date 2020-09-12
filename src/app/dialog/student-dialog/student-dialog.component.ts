import { Component, OnInit, Inject } from '@angular/core';
import { Grupa } from 'src/app/models/grupa.model';
import { Projekat } from 'src/app/models/projekat.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { GrupaService } from 'src/app/services/grupa.service';
import { ProjekatService } from 'src/app/services/projekat.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrls: ['./student-dialog.component.css']
})
export class StudentDialogComponent implements OnInit {
  grupe: Grupa[];
  projekti: Projekat[];

  public flag: number;


  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<StudentDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: Student,
              public studentService: StudentService,
              public grupaService: GrupaService,
              public projekatService: ProjekatService){

              }

     public add(): void {
       this.studentService.addStudent(this.data);
       this.snackBar.open('Uspesno dodat student za grupu' + this.data.grupa.id, 'Uredu',
       {duration: 3000});
     }

     public update(): void {
       this.studentService.updateStudent(this.data);
       this.snackBar.open('Uspesno izmenjen student' + this.data.id, 'Uredu',
       {duration: 3000});
     }

     public delete(): void {
       this.studentService.deleteStudent(this.data.id);
       this.snackBar.open('Uspesno obrisan student' + this.data.id, 'Uredu',
       {duration: 3000});
     }

     public cancel(): void {
       this.dialogRef.close();
       this.snackBar.open('Odustali ste', 'Uredu',
       {duration: 3000});
     }



  ngOnInit(): void {
    this.grupaService.getAllGrupa().subscribe(grupe =>
      this.grupe=grupe);
      this.projekatService.getAllProjekat().subscribe(projekti =>
        this.projekti = projekti);
  }

  compareTo(a,b){
    return a.id === b.id;
  }

}
