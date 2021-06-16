import { newE2EPage } from '@stencil/core/testing';

describe('redeem-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<redeem-form></redeem-form>');

    const element = await page.find('redeem-form');
    expect(element).toHaveClass('hydrated');
  });
});
