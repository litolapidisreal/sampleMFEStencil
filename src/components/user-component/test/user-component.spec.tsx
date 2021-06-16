import { newSpecPage } from '@stencil/core/testing';
import { UserComponent } from '../user-component';

describe('user-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UserComponent],
      html: `<user-component></user-component>`,
    });
    expect(page.root).toEqualHtml(`
      <user-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </user-component>
    `);
  });
});
