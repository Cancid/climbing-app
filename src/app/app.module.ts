import { ProblemListComponent } from './problems/problem-list/problem-list.component';
import { ProblemAddComponent } from './problems/problem-add/problem-add.component';
import { ProblemsService } from './problems/problems.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ProblemsComponent } from './problems/problems.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatExpansionModule } from '@angular/material/expansion'

const routes: Routes = [
  { path: 'problems', component: ProblemsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ProblemsComponent,
    AuthComponent,
    ProblemAddComponent,
    ProblemListComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
