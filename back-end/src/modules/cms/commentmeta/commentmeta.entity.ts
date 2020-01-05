import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

/**
 * 评论的元数据
 */
@Entity('cms_comment_meta')
export class CommentMeta {

    // 自增唯一ID
    @PrimaryGeneratedColumn()
    id: number;

    // 对应评论ID
    @Column({name: 'comment_id'})
    commentId: string;

    // 键名
    @Column({name: 'meta_key'})
    metaKey: string;

    // 键值
    @Column({name: 'meta_val'})
    metaVal: string;

}