import { Component, Host, h, State, Prop } from '@stencil/core';
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

  @Prop() jwt: any;

  switchForm() {
    let content = (
      <div>
        <section id="section1">
          <p class="h4-title"><strong>Model of transfer</strong></p>
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
          <div class="sub-body-panel">
            <div class="mb-3">
              <label class="col-form-label">Amount</label>
              <input type="text" class="form-control"
                value={this.controls.depositAmount}
                onInput={(e: any) => this.controlValue('depositAmount', e.target.value)} />
            </div>
            <div class="mb-3">
              <label class="col-form-label">From</label>
              <input type="text" class="form-control"
                value={this.controls.depositFrom}
                onInput={(e: any) => this.controlValue('depositFrom', e.target.value)} />
              <input type="checkbox" class="mr-1"
                checked={this.controls.isTransferForSpecificAppNo}
                onChange={(e: any) => this.controlValue('isTransferForSpecificAppNo', e.target.checked)} />
              <label class="col-form-label">Redeem from a specific application number</label>
            </div>
            <div class="mb-3">
              <label class="col-form-label">To</label>
              <select class="form-control"
                onInput={(e: any) => this.controlValue('depositTo', e.target.value)} >
                <option selected disabled>--Select one--</option>
                <option value="select 1" selected={this.controls.depositTo === 'select 1'}>Select 1</option>
                <option value="select 2" selected={this.controls.depositTo === 'select 2'}>Select 2</option>
                <option value="select 3" selected={this.controls.depositTo === 'select 3'}>Select 3</option>
              </select>
            </div>
          </div>
          <div class="mb-3">
            <label class="col-form-label">Total Amount</label>
            <input type="text" class="form-control"
            value={this.controls.totalAmount}
            onInput={(e: any) => this.controlValue('totalAmount', e.target.value)}/>
          </div>
          <div class="mb-3">
            <input type="checkbox" class="mr-1"
            checked={this.controls.termsAgreement}
            onChange={(e: any) => this.controlValue('termsAgreement', e.target.checked)}/>
            <label class="tc">I agree to the <span class="terms">Terms and Conditions</span></label>
          </div>
          <button type="submit" class="btn btn-block btn-secondary">Submit</button>
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

    DataService.switchFund(this.controls, this.jwt).then(val => {
      console.log(val);
      return val;
    })
  }

  render() {
    return (
      <Host>
        <div class="container mt-5">
          <div class="base-panel w-50">
            { this.jwt
              ? <section>
                  <div class="head-panel">Switch fund</div>
                  <div class="body-panel">
                    <form onSubmit={e => this.submitForm(e)}>
                      {this.switchForm()}
                    </form>
                  </div>
                </section>
              : <div class="mt-2">
                  <p class="text-danger">Can't access <strong>switch fund</strong> form.</p>
                </div>
            }
          </div>
        </div>
      </Host>
    );
  }

}
