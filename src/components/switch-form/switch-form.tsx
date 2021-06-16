import { Component, Host, h, State } from '@stencil/core';
import { DataService } from '../../service/data';

@Component({
  tag: 'switch-form',
  styleUrl: 'switch-form.scss',
  shadow: false,
  scoped: true
})
export class SwitchForm {

  @State() controls = {
    modeOfTransfer: null,
    depositAmount: null,
    depositFrom: null,
    isTransferForSpecificAppNo: null,
    depositTo: null,
    totalAmount: null,
    termsAgreement: null
  }

  switchForm() {
    let content = (
      <div>
        <section id="section1" class="mt-5">
          <p><strong>Model of transfer</strong></p>
          <div class="form-check form-check-inline">
            <input type="radio" class="form-check-input" id="radio1" name="radioDefault"
            value="shares"
            checked={this.controls.modeOfTransfer}
            onChange={(e: any) => this.controlValue('modeOfTransfer', e.target.value)} />
            <label class="form-check-label" htmlFor="radio1">Shares</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="radio" class="form-check-input" id="radio2" name="radioDefault"
            value="amount"
            checked={this.controls.modeOfTransfer}
            onChange={(e: any) => this.controlValue('modeOfTransfer', e.target.value)}/>
            <label class="form-check-label" htmlFor="radio2">Amount</label>
          </div>
          <div class="mb-3">
            <label class="col-form-label">Amount</label>
            <input type="text" class="form-control col-5"
            value={this.controls.depositAmount}
            onInput={(e: any) => this.controlValue('depositAmount', e.target.value)}/>
          </div>
          <div class="mb-3">
            <label class="col-form-label">From</label>
            <input type="text" class="form-control col-5"
            value={this.controls.depositFrom}
            onInput={(e: any) => this.controlValue('depositFrom', e.target.value)}/>
            <input type="checkbox" class="mr-1"
            checked={this.controls.isTransferForSpecificAppNo}
            onChange={(e: any) => this.controlValue('isTransferForSpecificAppNo', e.target.checked)}/>
            <label class="col-form-label">Redeem from a specific application number</label>
          </div>
          <div class="mb-3">
            <label class="col-form-label">To</label>
            <input type="text" class="form-control col-5"
            value={this.controls.depositTo}
            onInput={(e: any) => this.controlValue('depositTo', e.target.value)}/>
          </div>
          <div class="mb-3">
            <label class="col-form-label">Total Amount</label>
            <input type="text" class="form-control col-5"
            value={this.controls.totalAmount}
            onInput={(e: any) => this.controlValue('totalAmount', e.target.value)}/>
          </div>
          <div class="mb-3">
            <input type="checkbox" class="mr-1"
            checked={this.controls.termsAgreement}
            onChange={(e: any) => this.controlValue('termsAgreement', e.target.checked)}/>
            <label class="col-form-label">I agree to the Terms and Conditions</label>
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
        </section>
      </div>
    )

    return content;
  }

  controlValue(controlName: string, value: any) {
    this.controls = {
      ...this.controls,
      [controlName]: value
    }
  }

  submitForm(event: Event) {
    event.preventDefault();

    DataService.switchFund(this.controls).then(val => {
      console.log(val);
      return val;
    })
  }

  render() {
    return (
      <Host>
        <div class="container mt-5">
          <form onSubmit={e => this.submitForm(e)}>
            {this.switchForm()}
          </form>
        </div>
      </Host>
    );
  }

}
