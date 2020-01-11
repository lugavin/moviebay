import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

/**
 * 访问次数
 */
@Entity('cms_visit')
export class VisitEntity {

    // 条目id
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    times: number;

    @Column()
    title: string;

    @Column()
    url: string;

    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'created_by'})
    createdBy: string;

    @Column({name: 'updated_at', nullable: true})
    updatedAt: Date;

    @Column({name: 'updated_by', nullable: true})
    updatedBy: string;

}