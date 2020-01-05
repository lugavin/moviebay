import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

/**
 * 友情链接
 */
@Entity('cms_link')
export class Link {

    // 自增唯一ID
    @PrimaryGeneratedColumn()
    id: number;

    // 链接URL
    @Column()
    url: string;

    // 链接标题
    @Column()
    title: string;

    // 链接图片
    @Column()
    image: string;

    // 链接打开方式
    @Column()
    target: string;

    // 链接注释
    @Column()
    notes: string;

    // 是否可见（Y/N）
    @Column()
    visible: boolean;

    // 链接RSS地址
    @Column()
    rss: string;

    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'created_by'})
    createdBy: string;

    @Column({name: 'updated_at', nullable: true})
    updatedAt: Date;

    @Column({name: 'updated_by', nullable: true})
    updatedBy: string;
}