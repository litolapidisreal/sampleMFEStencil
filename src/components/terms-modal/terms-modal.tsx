import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'terms-modal',
  styleUrl: 'terms-modal.scss',
  shadow: true
})
export class TermsModal {
  modalTitle = "Terms and Conditions"

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
              <h5>{this.modalTitle}</h5>
            </span>
            <div class="content">
              <p>
                1&#41; By registering with My Sun Life Client Portal, you acknowledge that you may utilize any of the e-services provided by the Portal.
              </p>
              <p>
                2&#41; My Sun Life Client Portal e-services pertain
                  <span class="tc-2">a. Online Payment System</span>
                  <span class="tc-2">b. Disbursement Application</span>
                and any and all other facilities, benefits or services which we may from time to time make available to you through the My Sun Life Client Portal.
              </p>
              <p>
                3&#41;
              </p>
            </div>
            <div class="tc-button-container">
              <slot />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
