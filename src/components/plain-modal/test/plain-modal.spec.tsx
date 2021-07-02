import { newSpecPage } from '@stencil/core/testing';
import { PlainModal } from '../plain-modal';

describe('plain-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PlainModal],
      html: `<plain-modal></plain-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <plain-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </plain-modal>
    `);
  });
});
