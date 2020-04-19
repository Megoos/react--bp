import React from 'react';
import { render } from '@testing-library/react';
import { Header } from 'src/components/Header/Header';

describe('App', () => {
  it('header render', () => {
    const { asFragment, container } = render(<Header />);

    expect(asFragment()).toMatchSnapshot();
    expect(container.textContent).toBe('header');
  });
});
