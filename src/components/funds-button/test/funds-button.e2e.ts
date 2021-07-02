import { newE2EPage } from '@stencil/core/testing';

describe('funds-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<funds-button></funds-button>');

    const element = await page.find('funds-button');
    expect(element).toHaveClass('hydrated');
  });
});
