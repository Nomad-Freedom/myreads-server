import { EntityRepository, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@EntityRepository(Book)
export class BooksRepository extends Repository<Book> {
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { author, cover_image, publication_year, status, title } =
      createBookDto;
    const book = this.create({
      title,
      cover_image,
      author,
      publication_year,
      status,
    });
    await this.save(book);
    return book;
  }
}
