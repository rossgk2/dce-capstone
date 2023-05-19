import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
    private initiatorType: 'traveler' | 'program-manager' = 'traveler';
        
    //pulled from the "when http request is received" step of the Power Automate flow
    private flowUrl = 'https://prod-189.westus.logic.azure.com:443/workflows/2598a68443c541f18032e2211c8fdb65/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CGvS20Ro5hfsBweScnMgVhtBsERJgvG1dWa1J7aWzA0';

    constructor(private formBuilder: FormBuilder, private flowService: FlowServiceService) {
        this.insuranceForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            'initiatorType': ['traveler']
        });
    }

    onSubmit(): void {
        let call = this.flowService.makeAgreement(this.flowUrl,
        {
            "payload":
            {
                "sendAgreementTo": "rossprftadobe+signer@gmail.com",
                "initiatorType": this.insuranceForm.controls['initiatorType'].value // is either 'traveler' or 'program-manager'
            }
        });
        
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

    changeInitiatorType(event: any) {
        this.insuranceForm.patchValue({ initiatorType: event.target.value });
    }

    ngOnInit(): void {
    }
}
