import { Component, OnInit, Inject } from '@angular/core';
import { Smer } from 'src/app/models/smer.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Grupa } from 'src/app/models/grupa.model';
import { GrupaService } from 'src/app/services/grupa.service';
import { SmerService } from 'src/app/services/smer.service';

@Component({
  selector: 'app-grupa-dialog',
  templateUrl: './grupa-dialog.component.html',
  styleUrls: ['./grupa-dialog.component.css']
})
export class GrupaDialogComponent implements OnInit {

  smerovi: Smer[];

  public flag: number;


  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<GrupaDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: Grupa,
              public grupaService: GrupaService,
              public smerService: SmerService){

              }


     public add(): void {
       this.grupaService.addGrupa(this.data);
       this.snackBar.open('Uspesno dodata grupa: ' + this.data.id, 'Uredu',
       {duration: 3000});
     }

     public update(): void {
       this.grupaService.updateGrupa(this.data);
       this.snackBar.open('Uspesno izmenjena grupa: ' + this.data.id,  'Uredu',
       {duration: 3000});
     }

     public delete(): void {
       this.grupaService.deleteGrupa(this.data.id);
       this.snackBar.open('Uspesno obrisana grupa' + this.data.id, 'Uredu',
       {duration: 3000});
     }

     public cancel(): void {
       this.dialogRef.close();
       this.snackBar.open('Odustali ste', 'Uredu',
       {duration: 3000});
     }



  ngOnInit(): void {
    this.smerService.getAllSmer().subscribe(smerovi =>
      this.smerovi = smerovi);
  }

  compareTo(a,b){
    return a.id === b.id;
  }
}



