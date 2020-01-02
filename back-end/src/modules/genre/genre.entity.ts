import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

/**
 * 影视种类
 */
@Entity()
export class Genre {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    value: string;

    @Column()
    tag: string; // 电影|电视剧|动漫|综艺|音乐MV

    @Column('int')
    seq: number;

}