import { newSpecPage } from '@stencil/core/testing';
import { AddForm } from '../add-form';

describe('add-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AddForm],
      html: `<add-form></add-form>`,
    });
    expect(page.root).toEqualHtml(`
      <add-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </add-form>
    `);
  });
});
