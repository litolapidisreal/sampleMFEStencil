import { Component, getAssetPath, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { DataService } from '../../service/data';

@Component({
  tag: 'funds-button',
  styleUrl: 'funds-button.scss',
  shadow: true,
  assetsDirs: ['assets']
})
export class FundsButton {
  @Prop() image: string;

  @State() showFundModal: boolean = false;
  @Event() ok: EventEmitter;
  @Event() token: EventEmitter;

  menus = [
    {
      title: 'Switch Fund',
      image: null
    }
  ]

  openFundModal = () => {
    this.showFundModal = !this.showFundModal;
  }

  cancel = () => {
    this.showFundModal = false;
  }

  agree = () => {
    this.showFundModal = false;
    this.ok.emit(true);

    DataService.requestToken().then(val => {
      console.log("TOKEN: ", val);
      this.token.emit(val.access_token);
      sessionStorage.setItem("access_token", val.access_token);
    })
  }

  render() {
    return (
      <div>
        <div class="box" onClick={this.openFundModal}>
          <div class="icon">
            <img src={getAssetPath(`./assets/${this.image}`)}></img>
          </div>
          <p class="fund">Switch fund</p>
        </div>

        <switch-fund-modal visible={this.showFundModal} modalTitle="Switch Fund">
          <button class="btns cancel" onClick={this.cancel}>Cancel</button>
          <button class="btns agree" onClick={this.agree}>I Agree, Proceed to switch fund</button>
        </switch-fund-modal>
      </div>
    );
  }

}
