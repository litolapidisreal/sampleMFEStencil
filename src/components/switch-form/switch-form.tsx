import { Component, Host, h, State, Prop, Event, EventEmitter } from '@stencil/core';
import { DataService } from '../../service/data';
// import { DataService } from '../../service/data';

@Component({
  tag: 'switch-form',
  styleUrl: 'switch-form.scss',
  shadow: false,
  scoped: true
})

export class SwitchForm {

  @State() selectItems = [
    'Sun Life Prosperity Bond Fund',
    'Sun Life Properity Philippine Equity Fund',
    'Sun Life Properity Money Market Fund',
    'Sun Life Properity Government Securities Fund',
    'Sun Life Properity Index Fund',
    'Sun Life Properity Achiever Fund 2028',
    'Sun Life Properity Achiever Fund 2038',
    'Sun Life Properity Achiever Fund 2048',
    'Sun Life Properity World Equity Index Feeder Fund'
  ]

  @State() controls = {
    modeOfTransfer: null,
    numberOfShares: null,
    depositAmount: null,
    depositFrom: "Sun Life Prosperity Balanced Fund",
    isTransferAllShares: null,
    isTransferForSpecificAppNo: null,
    applicationNo: null,
    depositTo: null,
    totalAmount: null,
    totalShares: null,
    termsAgreement: false,
    remarks: null
  }

  @Prop() jwt: any;
  @State() toggleSelect: boolean = false;
  @State() showTermsModal: boolean = false;
  @State() showSummaryModal: boolean = false;
  @State() showDiscardModal: boolean = false;
  @State() showFunds: boolean = true;
  @State() showVerify: boolean = false;
  @Event() ok: EventEmitter;

  @Prop() show: boolean = false;

  textareaPlaceholder="Specify sales load when switching to loaded fund or if joining PROMO180.";

  constructor() {
  }

  controlValue(controlName: string, value: any) {
    this.controls = {
      ...this.controls,
      [controlName]: value
    }

    if (this.controls.depositAmount) {
      this.controls.totalAmount = this.controls.depositAmount;
    }

    if (this.controls.numberOfShares) {
      this.controls.totalShares = this.controls.numberOfShares;
    }

    // this.controls.totalShares = this.controls.numberOfShares;
    // this.controls.totalAmount = this.controls.depositAmount;
  }


  submitForm(event: Event) {
    event.preventDefault();

    DataService.switchFund(this.controls, this.jwt).then(val => {
      console.log(val);
      return val;
    })

  }

  displayTotalShares(e: any) {
    this.controls.totalShares = e.target.value;
  }

  onCheckedModeOfTransferChange(event: any) {
    this.controlValue('modeOfTransfer', event.target.value);

    this.toggleSelect = !this.toggleSelect;

    this.controls.isTransferForSpecificAppNo = null;
    this.controls.applicationNo = null;
    this.controls.remarks = null;

    if (this.toggleSelect) {
      this.controls.depositAmount = null;
      this.controls.totalAmount = null;
    } else {
      this.controls.numberOfShares = null;
      this.controls.totalShares = null;
    }
  }

  onTermsChecked(e: any) {
    this.controls.termsAgreement = e.target.checked;

    this.showTermsModal = !this.showTermsModal;
  }

  openSuccessModal = () => {
    this.showSummaryModal = !this.showSummaryModal;
  }

  openDiscardModal = () => {
    this.showDiscardModal = !this.showDiscardModal;
  }

  openVerifyModal = () => {
    this.showSummaryModal = false;
    this.showVerify = !this.showVerify;
  }

  decline = () => {
    this.controls.termsAgreement = false;
    this.showTermsModal = false;
  }

  accept = () => {
    this.controls.termsAgreement = true;
    this.showTermsModal = false;
  }

  modify = () => {
    this.showSummaryModal = false;
  }

  discard = () => {
    this.ok.emit(false);
    this.showDiscardModal = false;
  }

  goBack = () => {
    this.showDiscardModal = false;
  }

  cancel = () => {
    this.showVerify = false;
  }

  switchForm() {
    let content = (
      <div>
        <section id="section1">
          <p class="h4-title"><strong>Mode of transfer</strong></p>
          <div class="form-check form-check-inline">
            <input type="radio" class="form-check-input" id="radio1" name="radioDefault"
              value="shares"
              onChange={(e: any) => this.onCheckedModeOfTransferChange(e)} />
            <label class="form-check-label" htmlFor="radio1">Shares</label>
          </div>
          <div class="form-check form-check-inline">
            <input type="radio" class="form-check-input" id="radio2" name="radioDefault"
              value="amount"
              onChange={(e: any) => this.onCheckedModeOfTransferChange(e)}
              checked />
            <label class="form-check-label" htmlFor="radio2">Amount</label>
          </div>
          <div class="sub-body-panel">
            {this.toggleSelect
              ? <div class="mb-3">
                <label class="col-form-label">Number of shares</label>
                <input type="text" class="form-control"
                  value={this.controls.numberOfShares}
                  onInput={(e: any) => this.controlValue('numberOfShares', e.target.value)} />
                <input type="checkbox" class="mr-1"
                  checked={this.controls.isTransferAllShares}
                  onChange={(e: any) => this.controlValue('isTransferAllShares', e.target.checked)} />
                <label class="col-form-label">Transfer all shares</label>
              </div>
              : <div class="mb-3">
                <label class="col-form-label">Amount</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">PHP</span>
                  </div>
                  <input type="text" class="form-control"
                    value={this.controls.depositAmount}
                    onInput={(e: any) => this.controlValue('depositAmount', e.target.value)} />
                </div>
              </div>
            }
            <div class="mb-3">
              <label class="col-form-label">From</label>
              <input type="text" class="form-control"
                value={this.controls.depositFrom}
                onInput={(e: any) => this.controlValue('depositFrom', e.target.value)}
                disabled />
              <input type="checkbox" class="mr-1"
                checked={this.controls.isTransferForSpecificAppNo}
                onChange={(e: any) => this.controlValue('isTransferForSpecificAppNo', e.target.checked)} />
              <label class="col-form-label">Transfer from a specific application number</label>
            </div>
            {this.controls.isTransferForSpecificAppNo
              ? <div class="mb-3">
                <label class="col-form-label">Application number</label>
                <input type="text" class="form-control"
                  value={this.controls.applicationNo}
                  onInput={(e: any) => this.controlValue('applicationNo', e.target.value)} />
              </div>
              : null
            }
            <div class="mb-3">
              <label class="col-form-label">To</label>
              <select class="form-control"
                onInput={(e: any) => this.controlValue('depositTo', e.target.value)} >
                <option selected disabled>---Select one---</option>
                {this.selectItems.map((itm) =>
                  <option value={itm} selected={this.controls.depositTo === itm}>{itm}</option>
                )}
              </select>
            </div>
          </div>
          <div class="text-right">
            <label class="col-form-label">
              <strong>+</strong> Switch another fund
            </label>
          </div>
          {this.toggleSelect
            ? <div class="mb-3">
                <label class="col-form-label">Total Shares</label>
                <input type="text" class="form-control"
                  value={this.controls.totalShares}
                  disabled />
              </div>
            : <div class="mb-3">
                <label class="col-form-label">Total Amount</label>
                <input type="text" class="form-control"
                  value={this.controls.totalAmount}
                  disabled />
              </div>
          }
          <div class="mb-3">
            <label class="col-form-label">Remarks (Optional)</label>
            <textarea class="form-control"
              placeholder={this.textareaPlaceholder}
              value={this.controls.remarks}
              onInput={(e: any) => this.controlValue('remarks', e.target.value)}/>
          </div>
          <div class="mb-3">
            <input type="checkbox" class="mr-1"
              data-toggle="modal" data-target="#exampleModalCenter"
              checked={this.controls.termsAgreement}
              onChange={(e) => this.onTermsChecked(e)}/>
            <label class="tc">I agree to the <span class="terms">Terms and Conditions</span></label>
          </div>
          <button type="button" class="btn btn-block btn-warning" onClick={this.openSuccessModal}>SUBMIT</button>
        </section>
      </div>
    )

    return content;
  }

  render() {
    return (
      <Host>
        <div class="container mt-5">
          { this.show
            ? <div class="row">
              <div class="col">
                <div class="base-panel">
                  {/* {this.jwt
                  ? */}
                  <section>
                    <div class="head-panel">
                      <span>Switch fund</span>
                      <a onClick={this.openDiscardModal} class="close-btn">x</a>
                    </div>
                    <div class="body-panel">
                      <form>
                        {this.switchForm()}
                      </form>
                    </div>
                  </section>
                  {/* : <div class="mt-2">
                    <div class="alert alert-danger" role="alert">
                      Can't access <strong>switch fund</strong> form.
                    </div>
                  </div>
                } */}
                </div>
              </div>
            </div>
            : null
          }

          <terms-modal visible={this.showTermsModal}>
            <button class="btns decline" onClick={this.decline}>Decline</button>
            <button class="btns accept" onClick={this.accept}>Accept</button>
          </terms-modal>

          <summary-modal visible={this.showSummaryModal}>
            <a class="modify" onClick={this.modify}>Modify</a>
            <button class="btns accept" onClick={this.openVerifyModal}>Proceed</button>
          </summary-modal>

          <plain-modal visible={this.showDiscardModal}>
            <button class="btns cancel" onClick={this.discard}>Discard</button>
            <button class="btns go-back" onClick={this.goBack}>Go back</button>
          </plain-modal>

          <otp-modal visible={this.showVerify}>
            <button class="btns verify" onClick={e => this.submitForm(e)}>VERIFY</button><br />
            <a onClick={this.cancel}>Cancel</a>
          </otp-modal>
        </div>
      </Host>
    );
  }

}
