import { render, screen } from '@testing-library/react';
import MoviesGrid from '../MoviesGrid';

test('shows fallback message when there are no movies', () => {
  render(<MoviesGrid movies={[]} />);
  expect(screen.getByText(/no movies yet/i)).toBeInTheDocument();
});

test('displays cards for movies', () => {
  render(<MoviesGrid movies={[
    { _id: '1', imdbID: 'tt1', title: 'A', year: '2000', type: 'movie', poster: { _id: 'p1', url: 'x' } },
    { _id: '2', imdbID: 'tt2', title: 'B', year: '2001', type: 'movie' }
  ]} />);
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();
  expect(screen.getAllByText(/movie/)).toHaveLength(2);
});
