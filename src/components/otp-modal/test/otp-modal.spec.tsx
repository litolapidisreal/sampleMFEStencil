import { newSpecPage } from '@stencil/core/testing';
import { OtpModal } from '../otp-modal';

describe('otp-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [OtpModal],
      html: `<otp-modal></otp-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <otp-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </otp-modal>
    `);
  });
});
