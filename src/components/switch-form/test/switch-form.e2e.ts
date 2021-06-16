import { newE2EPage } from '@stencil/core/testing';

describe('switch-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<switch-form></switch-form>');

    const element = await page.find('switch-form');
    expect(element).toHaveClass('hydrated');
  });
});
