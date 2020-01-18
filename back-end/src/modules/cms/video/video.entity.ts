import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {VodStatus, VodType} from '../../shared/util/constants';
import {BaseEntity} from '../../shared/entity/base.entity';

/**
 * 影视条目信息
 * @see http://www.omdbapi.com/?apikey=34625b5a&i=tt0111161
 * @see https://api.douban.com/v2/movie/imdb/tt0111161?apikey=0df993c66c0c636e29ecbb5344252a4a
 */
@Entity('cms_video')
export class VideoEntity extends BaseEntity {

    // 条目id
    @PrimaryGeneratedColumn()
    id: number;

    // 片名
    @Column()
    title: string;

    // 关键字
    @Column()
    keywords: string;

    // 等级
    @Column()
    rated: string;

    // 年代
    @Column()
    year: number;

    // 发布日期
    @Column()
    released: Date;

    // 片长
    @Column()
    runtime: number;

    // 版本
    // @Column()
    // version: string;

    // 片源: [{k:'720P', v:'play_url'}]
    @Column('jsonb')
    sources: string[];

    // 类型: [{k:'drama', v:'剧情'}]
    @Column('jsonb')
    genres: string[];

    // 地区
    @Column('varchar', {array: true})
    countries: string[];

    // 语言
    @Column('varchar', {array: true})
    languages: string[];

    // 导演
    @Column('varchar', {array: true})
    directors: string[];

    // 编剧
    @Column('varchar', {array: true})
    writers: string[];

    // 主演
    @Column('varchar', {array: true})
    actors: string[];

    // 故事情节
    @Column()
    plot: string;

    // 海报
    @Column()
    poster: string;

    @Column({name: 'poster_thumb', nullable: true})
    posterThumb: string;

    @Column({name: 'poster_slide', nullable: true})
    posterSlide: string;

    // 状态(上线|下线)
    @Column()
    status: VodStatus;

    @Column()
    type: VodType;

    // 剧集(tv only): 当前季数/总季数
    @Column({nullable: true})
    season: string;

    // 评分&播放次数字段经常发生变化, 挪到VideoMeta表维护
    @Column({name: 'imdb_id', nullable: true})
    imdbId: string;

}
