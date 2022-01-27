import { ProblemsService } from './../problems.service';
import { Problem } from './../problem.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems: Problem[] = []
  private problemsSub: Subscription = new Subscription;

  constructor(private problemsService: ProblemsService) {}

  ngOnInit() {
    this.problemsService.getProblems();
    this.problemsSub = this.problemsService.getProblemUpdateListener()
      .subscribe((problems: Problem[]) => {
        this.problems = problems;
    })
  }

  ngOnDestroy() {
    this.problemsSub.unsubscribe();
  }
}