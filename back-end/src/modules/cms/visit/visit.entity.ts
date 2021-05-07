import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from 'src/shared';

/**
 * 访问次数
 */
@Entity('cms_visit')
export class VisitEntity extends BaseEntity {

    // 条目id
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    times: number;

    @Column()
    title: string;

    @Column()
    url: string;

}
