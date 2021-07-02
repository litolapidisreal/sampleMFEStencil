import { newSpecPage } from '@stencil/core/testing';
import { TermsModal } from '../terms-modal';

describe('terms-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TermsModal],
      html: `<terms-modal></terms-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <terms-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </terms-modal>
    `);
  });
});
