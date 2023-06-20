import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private  questionService: QuestionService, private router:Router){}
  
  public name:String ="";
  public questionList:any = [];
  public currentQuestion:number = 0;
  public points:number = 0;
  public counter:number = 5;
  correctAnswer:number = 0;
  incorrectAnswer:number = 0;
  interval:any;
  isLastQuestion:boolean = false;
  questionsLeft:number = 0;

  progress:number = 0;



  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
    
  }

  getProgress(){
    this.progress = ((this.currentQuestion+1)/this.questionList.length)*100;
  }

  getAllQuestions(){
    this.questionService.getQuestionJson().subscribe(res=>{
      this.questionList = res.questions;
      //console.log(res);
      this.getProgress();
    })
  }

  nextQuestion(){
   
    // if(this.isLastQuestion){
    //   this.submitQuiz();
    // }

    if(this.currentQuestion+1 === this.questionList.length-1){
      this.isLastQuestion = true;
      
      console.log(this.isLastQuestion);
    }
    
    if(this.currentQuestion+1 < this.questionList.length)
    {
      this.currentQuestion++;
      this.resetCounter();
      this.getProgress();
      
    }
  }
  previousQuestion(){

    if(this.currentQuestion+1 !== this.questionList.length-1){
      this.isLastQuestion = false;
      console.log(this.isLastQuestion);
    }
    

    if(this.currentQuestion > 0)
    {
      this.currentQuestion--;
      this.getProgress();
      
    }
  }

  answer(currentQno:number, option:any){
    console.log(option)
    if(option.correct){
      this.points+=10;
      this.correctAnswer++;
      this.nextQuestion();
    }else{
      this.points-=10;
      this.incorrectAnswer++;
      this.nextQuestion();
    }
  }

  startCounter(){
    this.interval = interval(1000).subscribe(val=>{
      this.counter--;

      if((this.counter === 0)){
        if(this.currentQuestion === this.questionList.length-1){
          this.stopCounter();
        }else{ 
          // this.currentQuestion++;
          // this.counter = 5;
          // //this.points-=10;
          // this.questionsLeft++;
          // this.getProgress();
          this.nextQuestion();
          
          console.log(this.questionsLeft);
        }
      }
    });

    // setTimeout(()=>{
    //   this.interval.unsubscribe();
    //   console.log("intervel")
      
    // }, 20000)
  }

  stopCounter(){
    this.interval.unsubscribe();
    console.log("intervel")
    this.counter = 0;
    //this.submitQuiz();
  }

  resetCounter(){
    this.stopCounter();
    this.counter = 5;
    this.startCounter();
  
  }


  resetQuiz(){
    this.resetCounter();
    this.getAllQuestions();
    this.currentQuestion = 0;
    this.points = 0;
    this.counter = 5;
  }


  submitQuiz(){
    localStorage.setItem('finalScore', String(this.points))
    localStorage.setItem('questionsLeft', String(this.questionsLeft))
    localStorage.setItem('totalQuestions', String(this.questionList.length))
    localStorage.setItem('incorrectQUestoins', String(this.incorrectAnswer))
    localStorage.setItem('correctAnswers', String(this.correctAnswer))
    
    this.router.navigate(['/result']);

  }

}
