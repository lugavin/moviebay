import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

/**
 * 评论
 */
@Entity('cms_comment')
export class CommentEntity {

    // 条目id
    @PrimaryGeneratedColumn()
    id: number;

    // 父评论ID
    @Column()
    pid: number;

    // 评论者
    @Column()
    author: string;

    // 评论者网址
    @Column()
    link: string;

    // 评论者邮箱
    @Column()
    email: string;

    // 评论者的User-Agent
    @Column()
    agent: string;

    // 评论正文
    @Column()
    content: string;

    // 评论文章链接
    @Column()
    url: string;

    // 评论是否被批准
    @Column()
    approved: boolean;

    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'created_by'})
    createdBy: string;

    @Column({name: 'updated_at', nullable: true})
    updatedAt: Date;

    @Column({name: 'updated_by', nullable: true})
    updatedBy: string;

}