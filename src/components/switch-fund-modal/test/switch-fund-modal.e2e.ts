import { newE2EPage } from '@stencil/core/testing';

describe('switch-fund-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<switch-fund-modal></switch-fund-modal>');

    const element = await page.find('switch-fund-modal');
    expect(element).toHaveClass('hydrated');
  });
});
