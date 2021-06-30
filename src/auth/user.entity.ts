import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userid: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
