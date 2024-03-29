import { Injectable } from '@angular/core';
import { Grupa } from '../models/grupa.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GrupaService {

    private readonly API_URL = 'http://localhost:8083/projekat/';

    dataChange: BehaviorSubject<Grupa[]> = new BehaviorSubject<Grupa[]>([]);

    constructor(private httpClient: HttpClient) {

    }

    public getAllGrupa(): Observable<Grupa[]> {

        this.httpClient.get<Grupa[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
          },
            (error: HttpErrorResponse) => {
              console.log(error.name + ' ' + error.message);
            });
      
          return this.dataChange.asObservable();
      
        }

        public addGrupa(grupa: Grupa): void {
          this.httpClient.post(this.API_URL, grupa).subscribe();
      }
  
      public updateGrupa(grupa: Grupa): void {
          this.httpClient.put(this.API_URL + grupa.id, grupa).subscribe();
      }
  
      public deleteGrupa(id: number): void {
          this.httpClient.delete(this.API_URL + id).subscribe();
      }

        
    

}
        
    

