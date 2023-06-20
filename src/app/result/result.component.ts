import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit{
  
  totalQuestion!:number;
  totalScore!:number;
  questionLeft!:number;
  correctAnswers!:number;
  incorrectAnswer!:number;
  name!:string;
  percentage!:number
  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.totalQuestion = Number(localStorage.getItem('totalQuestions')!);
    this.totalScore = Number(localStorage.getItem('finalScore')!);
    this.questionLeft = Number(localStorage.getItem('questionsLeft')!);
    this.correctAnswers = Number(localStorage.getItem('correctAnswers')!);
    this.incorrectAnswer = Number(localStorage.getItem('incorrectQuestions')!);

    this.percentage = (this.totalScore/this.totalQuestion)*10;
    
    console.log("");
  }


}
