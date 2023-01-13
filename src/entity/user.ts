import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";

@Entity('Users')
export class User extends BaseEntity {
    @Index("id_UNIQUE", { synchronize: false })
    @PrimaryGeneratedColumn({ type: 'int'})
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    username: string

    @Column({
        name: 'password',
        type: 'varchar',
        length: 255
    })
    password: string

    @Column({
        type: 'varchar',
        length: 255
    })
    fullname: string

    @Column({ type: Date })
    createdAt: Date

    @Column({ type: Date })
    updatedAt: Date
}