import { Component, Host, h, State } from '@stencil/core';
import { DataService } from '../../service/data';

@Component({
  tag: 'redeem-form',
  styleUrl: 'redeem-form.scss',
  shadow: false,
  scoped: true
})
export class RedeemForm {

  @State() controls = {
    modeOfRedemption: null,
    amount: null,
    from: null,
    isRedeemForSpecificAppNo: null,
    redemptionOptions: null,
    reasonOfRedemption: null,
    isAgree: false
  }

  redeemForm() {
    let content = (
      <div>
        <section id="section1">
          <p><strong>Mode of redemption</strong></p>
          <div class="form-check form-check-inline">
            <input type="radio" class="form-check-input" id="radio1" name="radioDefault"
            value="shares"
            checked={this.controls.modeOfRedemption}
            onChange={(e: any) => this.controlValue('modeOfRedemption', e.target.value)}/>
            <label class="form-check-label" htmlFor="radio1">Shares</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="radio" class="form-check-input" id="radio2" name="radioDefault"
            value="amount"
            checked={this.controls.modeOfRedemption}
            onChange={(e: any) => this.controlValue('modeOfRedemption', e.target.value)}/>
            <label class="form-check-label" htmlFor="radio2">Amount</label>
          </div>
          <div class="mb-3">
            <label class="col-form-label">Amount</label>
            <input type="text" class="form-control col-5"
            value={this.controls.amount}
            onInput={(e: any) => this.controlValue('amount', e.target.value)}/>
          </div>
          <div class="mb-3">
            <label class="col-form-label">From</label>
            <input type="text" class="form-control col-5"
            value={this.controls.from}
            onInput={(e: any) => this.controlValue('from', e.target.value)}/>
            <input type="checkbox" class="mr-1"
            checked={this.controls.isRedeemForSpecificAppNo}
            onChange={(e: any) => this.controlValue('isRedeemForSpecificAppNo', e.target.checked)}/>
            <label class="col-form-label">Redeem from a specific application number</label>
          </div>
        </section>
        <section id="section2" class="mt-5">
          <div class="mb-3">
            <label class="col-form-label">Redemption options</label>
            <input type="text" class="form-control col-5"
            value={this.controls.redemptionOptions}
            onInput={(e: any) => this.controlValue('redemptionOptions', e.target.value)}/>
          </div>
          <div class="mb-3">
            <label class="col-form-label">Reason for redemption</label>
            <input type="text" class="form-control col-5"
            value={this.controls.reasonOfRedemption}
            onInput={(e: any) => this.controlValue('reasonOfRedemption', e.target.value)}/>
          </div>
          <div class="mb-3">
            <input type="checkbox" class="mr-1"
            checked={this.controls.isAgree}
            onChange={(e: any) => this.controlValue('isAgree', e.target.checked)}/>
            <label class="col-form-label">I agree to the Terms and Conditions</label>
          </div>
        </section>
        <button type="submit" class="btn btn-success">Submit</button>
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

  submitForm = (event: Event) => {
    event.preventDefault();
    DataService.redeemFund(this.controls).then(val => {
      console.log(val);
      return val;
    })
  }

  render() {
    return (
      <Host>
        <div class="container mt-5">
          <form onSubmit={e => this.submitForm(e)}>
            {this.redeemForm()}
          </form>
        </div>
      </Host>
    );
  }

}
