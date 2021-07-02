import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'summary-modal',
  styleUrl: 'transaction-modal.scss',
  shadow: true,
})
export class TransactionModal {
  modalTitle = "Switch fund - 00128767CF01"

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
              <h3>{this.modalTitle}</h3>
            </span>
            <div class="content">
              <table class="summary">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sun Life Prosperity Balanced Fund</td>
                    <td>Sun Life Prosperity Philippine Equity Fund</td>
                    <td>PHP 1,000.00</td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <strong>Total: PHP 1,000.00</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
              <label class="mr1">Mode of transfer</label><span>Amount</span>
            </div>
            <div class="summary-button-container">
              <slot />
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
