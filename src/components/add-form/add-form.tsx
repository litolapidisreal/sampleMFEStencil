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

  @Prop() jwt: any;

  @Prop() text: string;

  @State() formStep: number = 0;

  @Event() emitter: EventEmitter<any>;

  @State() isValid: boolean = true;

  addForm() {
    let content = (
      <div>
        {this.formStep < this.MAX_STEP && (
          <div>
            {this.formStep > 0 && (
              <button class="btn primary" type="button" onClick={this.previousPage}>Back  </button>
            )}
            <p>Step {this.formStep + 1} of {this.MAX_STEP}</p>
          </div>
        )}
        {this.formStep == 0 && (
          <section id="section1">
            <div class="mb-3">
              <label class="col-form-label">Bank Name</label>
              <select class="form-control"
                onInput={(e: any) => this.controlValue('bankName', e.target.value)} >
                <option selected disabled>--Select one--</option>
                <option value="Bank1" selected={this.controls.bankName === 'Bank1'}>Bank 1</option>
                <option value="Bank2" selected={this.controls.bankName === 'Bank2'}>Bank 2</option>
                <option value="Bank3" selected={this.controls.bankName === 'Bank3'}>Bank 3</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="col-form-label">Deposit amount</label>
              <input type="text" class="form-control"
                value={this.controls.depositAmount}
                onInput={(e: any) => this.controlValue('depositAmount', e.target.value)} />
            </div>
            <div class="mb-3">
              <label class="col-form-label">Date of Deposit</label>
              <input type="date" class="form-control"
                value={this.controls.dateOfDeposit}
                onInput={(e: any) => this.controlValue('dateOfDeposit', e.target.value)} />
            </div>
          </section>
        )}
        {this.formStep == 1 && (
          <section id="section2">
            <h4>Fund</h4>
            <div class="sub-body-panel">
              <div class="mb-3">
                <label class="col-form-label">Fund Type</label>
                <select class="form-control"
                  onInput={(e: any) => this.controlValue('fundType', e.target.value)} >
                  <option selected disabled>--Select one--</option>
                  <option value="fund type 1" selected={this.controls.fundType === 'fund type 1'}>Fund type 1</option>
                  <option value="fund type 2" selected={this.controls.fundType === 'fund type 2'}>Fund type 2</option>
                  <option value="fund type 3" selected={this.controls.fundType === 'fund type 3'}>Fund type 3</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="col-form-label">Sales load</label>
                <select class="form-control"
                  onInput={(e: any) => this.controlValue('salesLoad', e.target.value)} >
                  <option selected disabled>--Select one--</option>
                  <option value="sales load 1" selected={this.controls.salesLoad === 'sales load 1'}>Sales load 1</option>
                  <option value="sales load 2" selected={this.controls.salesLoad === 'sales load 1'}>Sales load 2</option>
                  <option value="sales load 3" selected={this.controls.salesLoad === 'sales load 1'}>Sales load 3</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="col-form-label">Invesment Amount</label>
                <input type="text" class="form-control"
                  value={this.controls.investmentAmount}
                  onInput={(e: any) => this.controlValue('investmentAmount', e.target.value)} />
              </div>
              <div class="mb-3">
                <label class="col-form-label">Source of funds</label>
                <select class="form-control"
                  onInput={(e: any) => this.controlValue('sourceOfFunds', e.target.value)} >
                  <option selected disabled>--Select one--</option>
                  <option value="funds 1" selected={this.controls.sourceOfFunds === 'funds 1'}>funds 1</option>
                  <option value="funds 2" selected={this.controls.sourceOfFunds === 'funds 2'}>funds 2</option>
                  <option value="funds 3" selected={this.controls.sourceOfFunds === 'funds 3'}>funds 3</option>
                </select>
              </div>
              <div class="mb-3">
                <input type="checkbox" class="mr-1"
                  checked={this.controls.termsAgreement}
                  onChange={(e: any) => this.controlValue('termsAgreement', e.target.checked)}
                />
                <label class="tc">I agree to the <span class="terms">Terms and Conditions</span></label>
              </div>
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

    DataService.addFund(this.controls, this.jwt).then(val => {
      console.log(val);
      return val;
    })
  }

  actionButton() {
    return (
      <div class="button mt-1">
        <button type="submit" class="btn btn-block btn-secondary">Submit</button>
      </div>
    )
  }

  render() {
    return (
      <Host>
        <div class="container mt-5">
          <div class="base-panel w-50">
            {this.jwt
              ? <section>
                  <div class="head-panel">Add fund</div>
                  <div class="body-panel">
                    <form onSubmit={e => this.submitForm(e)}>
                      {/* ADD FORM */}
                      {this.addForm()}
                    </form>
                  </div>
                </section>
              : <div class="mt-2">
                <p class="text-danger">Can't access <strong>add fund</strong> form.</p>
              </div>
            }
          </div>
        </div>
      </Host>
    );
  }

}
