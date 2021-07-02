import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'switch-fund-modal',
  styleUrl: 'switch-fund-modal.scss',
  shadow: true,
})
export class SwitchFundModal {

  @Prop() modalTitle: string;

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
              <p>By proceeding you:</p>
              <p class="mr1">
                a. Acknowledge that switch transactions through My Sun Life Client Portal/Sun<br />
                Life PH Mobile app <strong>can only be done while in the Philippines.</strong>
              </p>
              <p class="mr1">
                b. Declare that <strong>you are performing this transaction while in the Philippines.</strong>
              </p>
              <p>
                For overseas transactions, please email <strong>slamc@sunlife.com</strong> so we may assign a licensed<br />
                financial advisor to assist you.
              </p>
            </div>
            <div class="funds-button-container">
              <slot />
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
