import {BookFormErrors, NewBook} from '../types/book';

const MIN_YEAR = 1500;
const CURRENT_YEAR = new Date().getFullYear();

export function validateBookForm(form: NewBook): BookFormErrors {
  const errors: BookFormErrors = {};

  const title = form.title.trim();
  const author = form.author.trim();
  const year = form.year.trim();
  const genre = form.genre.trim();

  if (!title) {
    errors.title = 'El título es obligatorio.';
  }

  if (!author) {
    errors.author = 'El autor es obligatorio.';
  }

  if (!year) {
    errors.year = 'El año es obligatorio.';
  } else if (!/^\d+$/.test(year)) {
    errors.year = 'El año debe contener solo números.';
  } else {
    const numericYear = Number(year);

    if (numericYear < MIN_YEAR || numericYear > CURRENT_YEAR) {
      errors.year = `El año debe estar entre ${MIN_YEAR} y ${CURRENT_YEAR}.`;
    }
  }

  if (!genre) {
    errors.genre = 'El género es obligatorio.';
  }

  return errors;
}

export function hasBookFormErrors(errors: BookFormErrors): boolean {
  return Object.keys(errors).length > 0;
}