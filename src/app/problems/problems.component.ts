import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProblemsService } from './problems.service';
import { Problem } from './problem.model';

@Component({
  selector: 'problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent {
  title = 'Problem List';
  problems: Problem[] = []
  displayedColumns = ['id', 'title', 'grade', 'attempts', 'date', 'rating', 'description']
  constructor(private problemService: ProblemsService, private router: Router) {
   }
  


  // getProblems() {
  //   this.problemService.getProblems().subscribe(data => {
  //     this.problems = data;
  //     console.log('Data requests ...');
  //     console.log(this.problems);
  //   });
  // }
}
