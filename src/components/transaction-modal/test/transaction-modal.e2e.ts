import { newE2EPage } from '@stencil/core/testing';

describe('transaction-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<transaction-modal></transaction-modal>');

    const element = await page.find('transaction-modal');
    expect(element).toHaveClass('hydrated');
  });
});
