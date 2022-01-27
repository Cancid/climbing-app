import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Problem } from './problem.model';

@Injectable({
  providedIn: 'root'
})
export class ProblemsService {
  private problems: Problem[] = []
  private problemsUpdated = new Subject<Problem[]>();

  constructor(private http: HttpClient) {}

  getProblems() {
    return this.http.get<Problem[]>('http://localhost:3000/problems')
      .subscribe((problemData) => {
        this.problems = problemData;
        this.problemsUpdated.next([...this.problems])
      });
  }

  getProblemUpdateListener() {
    return this.problemsUpdated.asObservable();
  }

  addProblem(problem: Problem) {
    this.http.post<Problem>('http://localhost:3000/problems', problem)
      .subscribe((_responseData) => {
        this.problems.push(problem);
        this.problemsUpdated.next([...this.problems]);
    })
  } 
}
