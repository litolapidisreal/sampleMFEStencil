import { newE2EPage } from '@stencil/core/testing';

describe('plain-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<plain-modal></plain-modal>');

    const element = await page.find('plain-modal');
    expect(element).toHaveClass('hydrated');
  });
});
