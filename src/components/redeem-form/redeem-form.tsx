import { Component, Host, h, State, Prop } from '@stencil/core';
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

  @Prop() jwt: any;

  redeemForm() {
    let content = (
      <div>
        <section id="section1">
          <p class="h4-title"><strong>Mode of redemption</strong></p>
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
          <div class="sub-body-panel">
            <div class="mb-3">
              <label class="col-form-label">Amount</label>
              <input type="text" class="form-control"
                value={this.controls.amount}
                onInput={(e: any) => this.controlValue('amount', e.target.value)} />
            </div>
            <div class="mb-3">
              <label class="col-form-label">From</label>
              <input type="text" class="form-control"
                value={this.controls.from}
                onInput={(e: any) => this.controlValue('from', e.target.value)} />
              <input type="checkbox" class="mr-1"
                checked={this.controls.isRedeemForSpecificAppNo}
                onChange={(e: any) => this.controlValue('isRedeemForSpecificAppNo', e.target.checked)} />
              <label class="col-form-label">Redeem from a specific application number</label>
            </div>
          </div>
        </section>
        <section id="section2" class="mt-2">
          <div class="mb-3">
            <label class="col-form-label">Redemption options</label>
            <select class="form-control"
              onInput={(e: any) => this.controlValue('redemptionOptions', e.target.value)} >
              <option selected disabled>--Select one--</option>
              <option value="redemption option 1" selected={this.controls.redemptionOptions === 'redemption option 1'}>Redemption option 1</option>
              <option value="redemption option 2" selected={this.controls.redemptionOptions === 'redemption option 2'}>Redemption option 2</option>
              <option value="redemption option 3" selected={this.controls.redemptionOptions === 'redemption option 3'}>Redemption option 3</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="col-form-label">Reason for redemption</label>
            <select class="form-control"
              onInput={(e: any) => this.controlValue('reasonOfRedemption', e.target.value)} >
              <option selected disabled>--Select one--</option>
              <option value="redemption reason 1" selected={this.controls.reasonOfRedemption === 'redemption reason 1'}>Redemption reason 1</option>
              <option value="redemption reason 2" selected={this.controls.reasonOfRedemption === 'redemption reason 2'}>Redemption reason 2</option>
              <option value="redemption reason 3" selected={this.controls.reasonOfRedemption === 'redemption reason 3'}>Redemption reason 3</option>
            </select>
          </div>
          <div class="mb-3">
            <input type="checkbox" class="mr-1"
            checked={this.controls.isAgree}
            onChange={(e: any) => this.controlValue('isAgree', e.target.checked)}/>
            <label class="tc">I agree to the <span class="terms">Terms and Conditions</span></label>
          </div>
        </section>
        <button type="submit" class="btn btn-block btn-secondary">Submit</button>
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
    DataService.redeemFund(this.controls, this.jwt).then(val => {
      console.log(val);
      return val;
    })
  }

  render() {
    return (
      <Host>
        <div class="container mt-5">
          <div class="base-panel w-50">
            {this.jwt
              ? <section>
                <div class="head-panel">Redeem fund</div>
                <div class="body-panel">
                  <form onSubmit={e => this.submitForm(e)}>
                    {this.redeemForm()}
                  </form>
                </div>
              </section>
              : <div class="mt-2">
                  <div class="alert alert-danger" role="alert">
                    Can't access <strong>redeem fund</strong> form.
                  </div>
              </div>
            }
          </div>
        </div>
      </Host>
    );
  }

}
