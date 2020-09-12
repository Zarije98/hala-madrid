import { MatDialog } from '@angular/material/dialog';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Projekat } from '../models/projekat.model';
import { ProjekatService } from '../services/projekat.service';
import { ProjekatDialogComponent } from '../dialog/projekat-dialog/projekat-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-projekat',
  templateUrl: './projekat.component.html',
  styleUrls: ['./projekat.component.css']
})
export class ProjekatComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'oznaka', 'opis', 'actions'];

  //dataSource: Observable<Projekat[]>;
  dataSource: MatTableDataSource<Projekat>;
  database: ProjekatService | null;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(public httpClient: HttpClient,
              public projekatService: ProjekatService,
              public dialog: MatDialog) { }


      public openDialog(flag: number, id: number, naziv: string, oznaka: string, opis: string) {
        const dialogRef = this.dialog.open(ProjekatDialogComponent, { data: { id: id, naziv: naziv, oznaka: oznaka, opis: opis} });
        dialogRef.componentInstance.flag=flag;
        dialogRef.afterClosed().subscribe(result => {
          if (result === 1) {
            this.loadData();
          }
        });
      }


  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.projekatService.getAllProjekat().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id': return data[property];
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
