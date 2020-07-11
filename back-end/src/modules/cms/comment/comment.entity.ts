import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from '../../../shared';

/**
 * 评论
 */
@Entity('cms_comment')
export class CommentEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pid: number;

    @Column()
    rid: number;

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

}
