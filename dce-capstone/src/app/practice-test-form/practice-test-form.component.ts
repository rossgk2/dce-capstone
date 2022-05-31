import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import questionData from 'src/assets/biology-test-sample-data.json';
import payloadJson from 'src/assets/to-send.json';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FlowServiceService} from "../flow-service.service";

@Component({
  selector: 'app-practice-test-form',
  templateUrl: './practice-test-form.component.html',
  styleUrls: ['./practice-test-form.component.css']
})
export class PracticeTestFormComponent implements OnInit {

  public testForm: FormGroup;
  private questions = questionData.questions;
  private testPayload = payloadJson;
  private flowUrl = 'https://prod-88.westus.logic.azure.com:443/workflows/e23d1399c95d4456ad2b31162f6c7939/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=3jbYL8dcO0wNoyRMoGVR7oRu8JSnPiIq8LYCk9yVggU';

  constructor(private formBuilder: FormBuilder,
              private flowService: FlowServiceService) {
    this.testForm = this.formBuilder.group({
      name: ['', Validators.required],
      studentEmail: ['', Validators.email],
      teacherEmail: ['', Validators.email]
      });
  }

  onSubmit(): void {
    let numbers = this.getFiveRandomNumbers();
    this.populatePayload(this.questions, numbers);
    console.log(this.testPayload);
    let call = this.flowService.getTest(this.flowUrl, this.testPayload);
    console.log('starting call...');
    call.subscribe(data => {
      console.log(data);
      if (data.status === 200) {
        console.log('fuckin worked, motherfuckers, let\'s go sign some shit');
        if (data.body) {
          // @ts-ignore
          window.location.href = data.body[0].esignUrl;
        }
      }
    });
  }

  getFiveRandomNumbers(): number[] {
    let numbers = [];
    while(numbers.length < 5) {
      let newNumber = this.getRandomInt();
      if (numbers.indexOf(newNumber) === -1){
        numbers.push(newNumber);
      }
    }
    return numbers;
  }

  getRandomInt(): number {
    return Math.floor(Math.random() * 10);
  }

  ngOnInit(): void {
  }

  populatePayload(questions: any, numbers: any): any {
    this.testPayload.payload.studentEmail = this.testForm.controls['studentEmail'].value;
    this.testPayload.payload.teacherEmail = this.testForm.controls['teacherEmail'].value;
    this.testPayload.payload.studentName = this.testForm.controls['name'].value;
    this.populateQuestion(this.testPayload.payload.question1, numbers[0]);
    this.populateQuestion(this.testPayload.payload.question2, numbers[1]);
    this.populateQuestion(this.testPayload.payload.question3, numbers[2]);
    this.populateQuestion(this.testPayload.payload.question4, numbers[3]);
    this.populateQuestion(this.testPayload.payload.question5, numbers[4]);
  }

  populateQuestion(testQuestion: any, questionNumber: number) {
    let currentRandomQuestion = this.questions[questionNumber];
    testQuestion.text = currentRandomQuestion.text;
    testQuestion.answers.a = currentRandomQuestion.answers.a;
    testQuestion.answers.b = currentRandomQuestion.answers.b;
    testQuestion.answers.c = currentRandomQuestion.answers.c;
    testQuestion.answers.d = currentRandomQuestion.answers.d;
  }

}
