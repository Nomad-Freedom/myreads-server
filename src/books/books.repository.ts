import {
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
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
  async findBooks(): Promise<Book[]> {
    const books = await this.find({});
    return books;
  }

  async findBook(id: string): Promise<Book> {
    const book = await this.findOne({ id }).catch(this.notValidIdError);
    return book;
  }

  async deleteBook(id: string): Promise<DeleteResult> {
    const result = await this.delete({ id }).catch(this.notValidIdError);
    return result;
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const results = await this.update(id, updateBookDto).catch(
      this.notValidIdError,
    );

    if (results.affected === 0) {
      throw new NotFoundException(
        "the book your trying to update doesn't exist",
      );
    }

    const updatedBook = await this.findOne({ id });
    return updatedBook;
  }

  private notValidIdError(error): any {
    if (error.code === '22P02') {
      throw new NotAcceptableException('the is not a valid id');
    }
    throw new InternalServerErrorException();
  }
}
