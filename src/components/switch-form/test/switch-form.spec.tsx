import { newSpecPage } from '@stencil/core/testing';
import { SwitchForm } from '../switch-form';

describe('switch-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SwitchForm],
      html: `<switch-form></switch-form>`,
    });
    expect(page.root).toEqualHtml(`
      <switch-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </switch-form>
    `);
  });
});
