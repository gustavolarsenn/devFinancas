import { render, screen } from '@testing-library/react';
import Spinner from '../Spinner';

test('renders without crashing', () => {
  render(<Spinner />);
  const spinnerElement = screen.getByTestId('spinner');
  expect(spinnerElement).toBeInTheDocument();
});