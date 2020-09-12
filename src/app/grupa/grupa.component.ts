import { Component, OnInit, ViewChild } from '@angular/core';
import { Grupa } from '../models/grupa.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GrupaService } from '../services/grupa.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Smer } from '../models/smer.model';
import { GrupaDialogComponent } from '../dialog/grupa-dialog/grupa-dialog.component';

@Component({
  selector: 'app-grupa',
  templateUrl: './grupa.component.html',
  styleUrls: ['./grupa.component.css']
})
export class GrupaComponent implements OnInit {
 
  displayedColumns = ['id', 'oznaka', 'smer','actions'];

  //dataSource: Observable<Grupa[]>;
  dataSource: MatTableDataSource<Grupa>;
  database: GrupaService | null;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  selektovanaGrupa: Grupa;

  constructor(public httpClient: HttpClient,
    public grupaService: GrupaService,
    public dialog: MatDialog) { }

    public openDialog(flag: number, id: number, oznaka: string, smer: Smer){
      const dialogRef = this.dialog.open(GrupaDialogComponent, {data: {id: id, oznaka: oznaka, smer: smer} });
      dialogRef.componentInstance.flag = flag;
      dialogRef.afterClosed().subscribe(result =>{
        if ( result === 1){
          this.loadData();
        }
      });
    }






  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.grupaService.getAllGrupa().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id': return data[property];
          case 'smer': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public selectRow(row){
    this.selektovanaGrupa=row;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}
