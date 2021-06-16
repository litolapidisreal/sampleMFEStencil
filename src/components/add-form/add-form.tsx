import { Component, Host, h, State, Event, Prop } from '@stencil/core';
import { EventEmitter } from '../../../dist/types/stencil-public-runtime';
import { DataService } from '../../service/data';
@Component({
  tag: 'add-form',
  styleUrl: 'add-form.scss',
  shadow: false,
  scoped: true
})
export class AddForm {
  MAX_STEP = 2;

  @State() controls = {
    bankName: null,
    depositAmount: null,
    dateOfDeposit: null,
    fundType: null,
    salesLoad: null,
    investmentAmount: null,
    sourceOfFunds: null,
    termsAgreement: false
  }

  @Prop() text: string;

  @State() formStep: number = 0;

  @Event() emitter: EventEmitter<any>;

  @State() isValid: boolean = true;

  addForm() {
    let content = (
      <div>
        { this.formStep < this.MAX_STEP && (
          <div>
            { this.formStep > 0 && (
              <button class="btn primary" type="button" onClick={this.previousPage}>Back  </button>
            )}
            <p>Step { this.formStep + 1 } of { this.MAX_STEP }</p>
          </div>
        )}
        { this.formStep == 0 && (
          <section id="section1">
          <div class="mb-3">
            <label class="col-form-label">Bank Name</label>
            <input type="text" class="form-control col-5"
            value={this.controls.bankName}
            onInput={(e: any) => this.controlValue('bankName', e.target.value)} />
          </div>
          <div class="mb-3">
            <label class="col-form-label">Deposit amount</label>
            <input type="text" class="form-control col-5"
            value={this.controls.depositAmount}
            onInput={(e: any) => this.controlValue('depositAmount', e.target.value)}/>
          </div>
          <div class="mb-3">
            <label class="col-form-label">Date of Deposit</label>
            <input type="date" class="form-control col-5"
            value={this.controls.dateOfDeposit}
            onInput={(e: any) => this.controlValue('dateOfDeposit', e.target.value)}/>
          </div>
        </section>
        )}
        { this.formStep == 1 && (
          <section id="section2">
          <div class="mb-3">
            <label class="col-form-label">Fund Type</label>
            <input type="text" class="form-control col-5"
            value={this.controls.fundType}
            onInput={(e: any) => this.controlValue('fundType', e.target.value)}/>
          </div>
          <div class="mb-3">
            <label class="col-form-label">Sales load</label>
            <input type="text" class="form-control col-5"
            value={this.controls.salesLoad}
            onInput={(e: any) => this.controlValue('salesLoad', e.target.value)}/>
          </div>
          <div class="mb-3">
            <label class="col-form-label">Invesment Amount</label>
            <input type="text" class="form-control col-5"
            value={this.controls.investmentAmount}
            onInput={(e: any) => this.controlValue('investmentAmount', e.target.value)}/>
          </div>
          <div class="mb-3">
            <label class="col-form-label">Source of funds</label>
            <input type="text" class="form-control col-5"
            value={this.controls.sourceOfFunds}
            onInput={(e: any) => this.controlValue('sourceOfFunds', e.target.value)}/>
          </div>
          <div class="mb-3">
            <input type="checkbox"
            checked={this.controls.termsAgreement}
            onChange={(e: any) => this.controlValue('termsAgreement', e.target.checked)}
            />
            <label class="col-form-label">I agree to the Terms and Conditions</label>
          </div>
        </section>
        )}
        {this.renderButton()}
      </div>
    )

    return content;
  }

  nextStep = () => {
    this.formStep += 1;
  }

  previousPage = () => {
    this.formStep -= 1;
  }

  renderButton = () => {
    if (this.formStep >= 2) {
      return undefined;
    } else if (this.formStep === 1) {
      return this.actionButton();
    } else {
      return (
          <button type="button" class="btn btn-primary" onClick={this.nextStep}>Next</button>
        );
    }
  }

  controlValue(controlName: string, value: any) {
    this.controls = {
      ...this.controls,
      [controlName]: value
    };
  }

  submitForm = (event: Event) => {
    event.preventDefault();

    DataService.addFund(this.controls).then(val => {
      console.log(val);
      return val;
    })
  }

  actionButton() {
    return (
      <div class="button">
        <button type="submit" class="btn btn-success">Submit</button>
      </div>
    )
  }

  render() {
    return (
      <Host>
        <div class="container mt-5">
          <form onSubmit={e => this.submitForm(e)}>
            {/* ADD FORM */}
            {this.addForm()}
          </form>
        </div>
      </Host>
    );
  }

}
