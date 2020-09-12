import { StudentService } from 'src/app/services/student.service';
import { ProjekatService } from './services/projekat.service';
import {MatInputModule} from '@angular/material/input';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { SmerService } from './services/smer.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {RouterModule} from '@angular/router';
import { AuthorComponent } from './core/author/author.component';
import { AboutComponent } from './core/about/about.component';
import { HomeComponent } from './core/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SmerComponent } from './smer/smer.component';
import { ProjekatComponent } from './projekat/projekat.component';
import { GrupaComponent } from './grupa/grupa.component';
import { StudentComponent } from './student/student.component';
import { SmerDialogComponent } from './dialog/smer-dialog/smer-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GrupaService } from './services/grupa.service';
import { ProjekatDialogComponent } from './dialog/projekat-dialog/projekat-dialog.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { MatSelectModule } from '@angular/material/select';
import { GrupaDialogComponent } from './dialog/grupa-dialog/grupa-dialog.component';
import { StudentDialogComponent } from './dialog/student-dialog/student-dialog.component';


const Routes = [{path: 'smer', component: SmerComponent},
                {path: 'grupa', component: GrupaComponent},
                {path: 'student', component: StudentComponent},
                {path: 'projekat', component: ProjekatComponent},
                {path: 'home', component: HomeComponent},
                {path: 'about', component: AboutComponent},
                {path: 'author', component: AuthorComponent},
                {path: '', redirectTo: 'home', pathMatch: 'full'}];


@NgModule({
  declarations: [
    AppComponent,
    SmerComponent,
    ProjekatComponent,
    GrupaComponent,
    StudentComponent,
    HomeComponent,
    AboutComponent,
    AuthorComponent,
    SmerDialogComponent,
    ProjekatDialogComponent,
    GrupaDialogComponent,
    StudentDialogComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forRoot(Routes)
  ],
  providers: [
    SmerService,
    ProjekatService,
    GrupaService,
    StudentService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
