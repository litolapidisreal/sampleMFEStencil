import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'otp-modal',
  styleUrl: 'otp-modal.scss',
  shadow: true,
})
export class OtpModal {

  @Prop({
    mutable: true,
    reflect: true
  })
  public visible: boolean;

  render() {
    return (
      <Host>
        <div class={this.visible ? "wrapper visible" : "wrapper"}>
          <div class="modal">
            <span class="title">
              <h5>Sun Life</h5>
              <h3>OTP Verification</h3>
            </span>
            <div class="content">
              <p>Please enter the 6-digit OTP we've sent to your mobile number</p>
              <p><strong>*******1883</strong></p>
              <p>This code will expire in <strong>297</strong> seconds.</p>
              <div class="verification-code">
                <input type="text"/>
                <input type="text"/>
                <input type="text"/>
                <input type="text"/>
                <input type="text"/>
                <input type="text"/>
                <input type="text"/>
              </div>
            </div>
            <div class="funds-button-container">
              <slot />
            </div>
            <div class="content">
              <p>Didn't get the code?</p>
              <p>You can request for a new one after 1 minute.</p>
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
