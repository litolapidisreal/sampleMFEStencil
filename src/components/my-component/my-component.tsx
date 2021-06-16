import { Component, Prop, h, Event, Method, State } from '@stencil/core';
import { format } from '../../utils/utils';
import { DataService } from './../../service/data';
import { EventEmitter } from '../../../dist/types/stencil-public-runtime';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.scss',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  @State() data$: any;

  testText = [];

  constructor() {}

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  @Event() completed: EventEmitter<any>;

  @Method()
  async fetchData() {
    return await DataService.getData("Asdasd").then(val => {
      // console.log("Component values: ", val)
      this.completed.emit(val);
      return val;
    });
  }

  // @Listen('completed', {target: 'body'})

  // @Method()
  // async getEvent(e: CustomEvent<any>) {
  //   this.data$ = e.detail;
  //   console.log('called from stencilJs', this.data$);

  //   return e.detail;
  // }

  componentWillLoad() {
    // this.fetchData();
  }

  render() {
    // this.fetchData();
    return (
      <div>
        Hello, World! I'm {this.getText()}
        <br></br>
        {/* <button type="button" class="btn primary" onClick={this.fetchData.bind(this)}>Button from StencilJs</button> */}
        <slot></slot>
      </div>
    );

  }
}
