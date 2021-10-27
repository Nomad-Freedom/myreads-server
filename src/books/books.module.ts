import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksRepository } from './books.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BooksRepository])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
