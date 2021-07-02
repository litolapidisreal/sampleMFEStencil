import { newSpecPage } from '@stencil/core/testing';
import { TransactionModal } from '../transaction-modal';

describe('transaction-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TransactionModal],
      html: `<transaction-modal></transaction-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <transaction-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </transaction-modal>
    `);
  });
});
