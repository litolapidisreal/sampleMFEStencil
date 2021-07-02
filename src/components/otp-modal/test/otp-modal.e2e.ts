import { newE2EPage } from '@stencil/core/testing';

describe('otp-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<otp-modal></otp-modal>');

    const element = await page.find('otp-modal');
    expect(element).toHaveClass('hydrated');
  });
});
