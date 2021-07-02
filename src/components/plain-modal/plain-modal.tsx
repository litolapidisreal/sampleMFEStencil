import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'plain-modal',
  styleUrl: 'plain-modal.scss',
  shadow: true,
})
export class PlainModal {

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
            <div class="content">
              <p>This will discard your order ticket. All information entered will be removed.</p>
            </div>
            <div class="plain-button-container">
              <slot />
            </div>
          </div>
        </div>
      </Host>
    );
  }

}
