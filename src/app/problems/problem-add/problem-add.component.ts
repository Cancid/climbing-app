import { ProblemsService } from './../problems.service';
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Problem } from "../problem.model";

@Component({
  selector: 'problem-add',
  templateUrl: './problem-add.component.html',
  styleUrls: ['./problem-add.component.css']
})
export class ProblemAddComponent {

  enteredTitle = '';
  enteredDescription='';
  
  constructor(private problemsService: ProblemsService) {}
 
  onAddProblem(form: NgForm) {
    if (form.invalid) {
      return
    }
    const problem: Problem = {
    title: form.value.title,
    // TODO: CHANGE THESE
    grade: 'v4',
    attempts: '2',
    description: form.value.title,
    }
    this.problemsService.addProblem(problem)
    form.resetForm()
  }
  
}