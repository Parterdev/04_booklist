export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  createdAt: Date;
}

export interface NewBook {
  title: string;
  author: string;
  year: string;
  genre: string;
}

export interface BookFormErrors {
  title?: string;
  author?: string;
  year?: string;
  genre?: string;
}