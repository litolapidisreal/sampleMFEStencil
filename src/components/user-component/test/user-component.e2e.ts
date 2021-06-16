import { newE2EPage } from '@stencil/core/testing';

describe('user-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<user-component></user-component>');

    const element = await page.find('user-component');
    expect(element).toHaveClass('hydrated');
  });
});
