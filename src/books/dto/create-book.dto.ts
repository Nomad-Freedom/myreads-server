import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

import { BookStatus } from '../book-status.enum';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  cover_image: string;

  @IsString()
  author: string;

  @IsNumberString()
  @Length(4, 4)
  @IsOptional()
  publication_year?: number;

  @IsEnum(BookStatus, { message: 'status must be READ,READING or UNREAD' })
  status: BookStatus;
}
