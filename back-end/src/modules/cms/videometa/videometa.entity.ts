import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

/**
 * 影视的元数据
 */
@Entity('cms_video_meta')
export class VideoMetaEntity {

    // 自增唯一ID
    @PrimaryGeneratedColumn()
    id: number;

    // 对应影视条目ID
    @Column({name: 'vod_id'})
    vodId: string;

    // 键名
    @Column({name: 'meta_key'})
    metaKey: string;

    // 键值
    @Column({name: 'meta_val'})
    metaVal: string;

}
