import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksRepository)
    private booksRepository: BooksRepository,
  ) {}
  create(createBookDto: CreateBookDto): Promise<Book> {
    return this.booksRepository.createBook(createBookDto);
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.findBooks();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.booksRepository.findBook(id);
    if (!book) {
      throw new NotFoundException("the book your looking for doesn't exist");
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.booksRepository.updateBook(
      id,
      updateBookDto,
    );

    return updatedBook;
  }

  async remove(id: string): Promise<void> {
    const result = await this.booksRepository.deleteBook(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        "the book your trying to deleted doesn't exist",
      );
    }
  }
}
