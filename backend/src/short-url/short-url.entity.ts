import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('short_url')
export class ShortUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ name: 'short_path', unique: true })
  shortPath: string;
}
