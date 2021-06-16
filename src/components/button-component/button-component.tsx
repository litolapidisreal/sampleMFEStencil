import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'button-component',
  styleUrl: 'button-component.scss',
  shadow: true,
})
export class ButtonComponent {

  @Prop() user_id: string;

  constructor() {
    this.testClick = this.testClick.bind(this);
  }

  testClick() {
    console.log("User ID: ", this.user_id)
    alert("User ID: " + this.user_id);
  }

  render() {
    return (
      <button type="button" class="btn primary" onClick={this.testClick}>
        <slot />
      </button>
    );
  }

}
