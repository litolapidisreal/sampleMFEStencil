import { newSpecPage } from '@stencil/core/testing';
import { SwitchFundModal } from '../switch-fund-modal';

describe('switch-fund-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SwitchFundModal],
      html: `<switch-fund-modal></switch-fund-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <switch-fund-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </switch-fund-modal>
    `);
  });
});
