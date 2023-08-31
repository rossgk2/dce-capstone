import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FlowServiceService} from "../flow-service.service";

@Component({
    selector: 'app-practice-test-form',
    templateUrl: './practice-test-form.component.html',
    styleUrls: ['./practice-test-form.component.css']
})
export class PracticeTestFormComponent implements OnInit {

    public insuranceForm: FormGroup;
    selectedRadioOption: string = 'traveler';    

    /* Pulled from the "when http request is received" step of the Power Automate flow. */
    private flowUrl = 'https://prod-142.westus.logic.azure.com:443/workflows/67c8aee857a7456a95c3f7673256517f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Orx2zWmwzHuZwV3pwIolI2fbIcTTsGRjAIW3yMAc0-Y';

    constructor(private formBuilder: FormBuilder, private flowService: FlowServiceService) {
        this.insuranceForm = this.formBuilder.group({
            initEmail: ['', [Validators.required, Validators.email]],
            supEmail: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit(): void {
        let payload = {
            "initEmail": this.insuranceForm.controls['initEmail'].value,
            "supEmail": this.insuranceForm.controls['supEmail'].value
        };

        console.log(payload);

        let call = this.flowService.makeAgreement(this.flowUrl, { "payload": payload });
        
        console.log('starting call...');
        call.subscribe(data => {
            console.log(data);
            if (data.status === 200) {
                //delay is handled in the Power Automate flow
                alert("Your form has been sent.");
                const esignUrl = (data.body as any[])[0].esignUrl;
                console.log(esignUrl);
                window.location.href = esignUrl;
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
