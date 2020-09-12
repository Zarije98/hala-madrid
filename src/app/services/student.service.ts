import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class StudentService {

    grupe: Student[];

    private readonly API_URL ='http://localhost:8083/student/';

    private readonly API_URL_P = 'http://localhost:8083/studentZaGrupu/';


    dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);

    constructor(private httpClient: HttpClient){

    }

    public getAllStudent(): Observable<Student[]>{

        this.httpClient.get<Student[]>(this.API_URL).subscribe(data => {
            this.dataChange.next(data);
            this.grupe=data;
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();

    }

    public getStudentZaGrupu(idGrupe): Observable<Student[]> {
        this.httpClient.get<Student[]>(this.API_URL_P + idGrupe).subscribe(data => {
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name+ ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }




    public addStudent(student: Student): void {
        this.httpClient.post(this.API_URL, student).subscribe();
    }

    public updateStudent(student: Student): void {
        this.httpClient.put(this.API_URL + student.id, student).subscribe();
    }

    public deleteStudent(id: number): void {
        this.httpClient.delete(this.API_URL + id).subscribe();
    }

} 