import { newSpecPage } from '@stencil/core/testing';
import { FundsButton } from '../funds-button';

describe('funds-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FundsButton],
      html: `<funds-button></funds-button>`,
    });
    expect(page.root).toEqualHtml(`
      <funds-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </funds-button>
    `);
  });
});
