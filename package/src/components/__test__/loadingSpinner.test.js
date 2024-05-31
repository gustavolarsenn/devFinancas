import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Spinner from '../loadingSpinner';

test('renders without crashing', () => {
  render(<Spinner />);
  const spinnerElement = screen.getByTestId('spinner');
  expect(spinnerElement).toBeInTheDocument();
});