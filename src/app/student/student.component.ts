import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Grupa } from '../models/grupa.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Projekat } from '../models/projekat.model';
import { Student } from '../models/student.model';
import { StudentService } from '../services/student.service';
import { StudentDialogComponent } from '../dialog/student-dialog/student-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  displayedColumns = ['id','ime','prezime','brojIndeksa','grupa','projekat','actions'];
  //dataSource: Observable<Student[]>;
  dataSource: MatTableDataSource<Student>;
  database: StudentService | null;



  @Input()
  selektovanaGrupa: Grupa;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public httpClient: HttpClient,
    public studentService: StudentService,
    public dialog: MatDialog) { }


    public openDialog(flag: number, id: number, ime: string, prezime: string, brojIndeksa: string, grupa: Grupa, projekat: Projekat){
      const dialogRef = this.dialog.open(StudentDialogComponent, {data: {id: id, ime: ime, prezime: prezime, brojIndeksa: brojIndeksa, grupa: grupa, projekat: projekat}});
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed().subscribe(result => {
        if ( result === 1) {
          this.loadData();
        }
      })
    }





  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(){
    if (this.selektovanaGrupa.id){
      this.loadData();
    }
  }

  public loadData() {
    this.studentService.getAllStudent().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id': return data[property];
          case 'grupa': return data[property];
          case 'projekat': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}
