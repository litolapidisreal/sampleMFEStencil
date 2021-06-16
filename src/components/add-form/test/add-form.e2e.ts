import { newE2EPage } from '@stencil/core/testing';

describe('add-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<add-form></add-form>');

    const element = await page.find('add-form');
    expect(element).toHaveClass('hydrated');
  });
});
