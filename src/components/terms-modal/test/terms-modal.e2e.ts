import { newE2EPage } from '@stencil/core/testing';

describe('terms-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<terms-modal></terms-modal>');

    const element = await page.find('terms-modal');
    expect(element).toHaveClass('hydrated');
  });
});
