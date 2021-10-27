import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BookStatus } from '../book-status.enum';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  cover_image: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  publication_year: number;

  @Column()
  status: BookStatus;
}
