import { Component, h, Host, Prop, State } from '@stencil/core';
import { DataService } from '../../service/data';

@Component({
  tag: 'user-component',
  styleUrl: 'user-component.scss',
  shadow: false,
  scoped: true
})
export class UserComponent {

  @Prop() jwt: string;
  @Prop() cssClass: string;
  @Prop() valid: boolean;

  @State() formControls = {
    id: Math.floor(Math.random() * 100),
    street: null,
    subdivision: null,
    municipality: null,
    province: null,
  }

  formValue(controlName: string, value: any) {
    this.formControls = {
      ...this.formControls,
      [controlName]: value
    };
  }

  submit(e: Event) {
    e.preventDefault();

    DataService.changeAddress(this.formControls, this.jwt).then(val => {
      console.log(val)
      return val;
    })
  }

  renderForm() {
    return (
      <form onSubmit={e => this.submit(e)}>
        <div class="mb-3">
          <label class="col-form-label">Street</label>
          <input type="text" class="form-control"
            value={this.formControls.street}
            onInput={(e: any) => this.formValue('street', e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label class="col-form-label">Subdivision</label>
          <input type="text" class="form-control"
            value={this.formControls.subdivision}
            onInput={(e: any) => this.formValue('subdivision', e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label class="col-form-label">Municipality</label>
          <input type="text" class="form-control"
            value={this.formControls.municipality}
            onInput={(e: any) => this.formValue('municipality', e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label class="col-form-label">Province</label>
          <input type="text" class="form-control"
            value={this.formControls.province}
            onInput={(e: any) => this.formValue('province', e.target.value)}
          />
        </div>
        <button class="btn btn-block btn-secondary" type="submit">Submit</button>
      </form>
    );
  }

  render() {
    return (
      <Host>
        <div class="container mt-5">
          <div class="base-panel w-50">
            { this.jwt
              ? <section>
                <div class="head-panel">Change address</div>
                <div class="body-panel">
                 {this.renderForm()}
                </div>
              </section>
              : <div class="mt-2">
                  <p class="text-danger">Can't access <strong>change address</strong> form.</p>
                </div>
            }
          </div>
        </div>
      </Host>
    );
  }

  async fetchData() {
    console.log("Calling users data....")
    return DataService.getData(this.jwt).then(val => {
      console.log(val);
      return val;
    });
  }
}
