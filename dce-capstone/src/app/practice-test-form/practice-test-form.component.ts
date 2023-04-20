import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import questionData from 'src/assets/biology-test-sample-data.json';
import payloadJson from 'src/assets/to-send.json';
import {FlowServiceService} from "../flow-service.service";

@Component({
    selector: 'app-practice-test-form',
    templateUrl: './practice-test-form.component.html',
    styleUrls: ['./practice-test-form.component.css']
})
export class PracticeTestFormComponent implements OnInit {

    public insuranceForm: FormGroup;
    private questions = questionData.questions;
    private testPayload = payloadJson;

    private webFormUrl = 'https://sign-acs-todd.na4.adobesign.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhBabsyw5jvNBjA4z7Nzw-1Kq361mJmS5BqfzwmdS-EkWicnyGvKAD4audzvpsfBpWc*';

    //pulled from the "when http request is received" step of the Power Automate flow
    private flowUrl = 'https://prod-73.westus.logic.azure.com:443/workflows/85f9a73063894f849027bb8f0370aacf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=m1rNyUBz3_j4d_C3DqckgaIhIzZ9HXJ7sAhqJfk4IXk';

    constructor(private formBuilder: FormBuilder,
                private flowService: FlowServiceService) {
        this.insuranceForm = this.formBuilder.group({
            state: ['', Validators.required],
            numberEmployees: ['', [Validators.required]],
            formType: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        if (this.insuranceForm.controls['numberEmployees'].value == 27) {
            window.location.href = this.webFormUrl;
        } else {
            let call = this.flowService.makeAgreement(this.flowUrl, this.testPayload);
            console.log('starting call...');
            call.subscribe(data => {
                console.log(data);
                if (data.status === 202) {
                    //delay is handled in the Power Automate flow
                    alert("Your Form Has Been Sent.");
                    this.insuranceForm.reset();
                }
            }, error => {
                console.log(error);
                alert('There has been an error. How embarrassing.');
            });
        }
    }

    ngOnInit(): void {
    }
}
