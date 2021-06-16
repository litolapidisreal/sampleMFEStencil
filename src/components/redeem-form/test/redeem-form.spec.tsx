import { newSpecPage } from '@stencil/core/testing';
import { RedeemForm } from '../redeem-form';

describe('redeem-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RedeemForm],
      html: `<redeem-form></redeem-form>`,
    });
    expect(page.root).toEqualHtml(`
      <redeem-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </redeem-form>
    `);
  });
});
