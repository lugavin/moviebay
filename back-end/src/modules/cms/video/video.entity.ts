import {Entity, Index, Column, PrimaryGeneratedColumn} from 'typeorm';
import {VodStatus, VodType} from '../../shared/util/enums';
import {BaseEntity} from '../../shared/entity/base.entity';

/**
 * 影视条目信息
 * @see http://www.omdbapi.com/?apikey=34625b5a&i=tt0111161
 * @see https://api.douban.com/v2/movie/imdb/tt0111161?apikey=0df993c66c0c636e29ecbb5344252a4a
 */
@Entity('cms_video')
export class VideoEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    // 原名
    @Index()
    @Column()
    name: string;

    // 译名
    @Index()
    @Column()
    title: string;

    // 又名(also known as)
    @Index()
    @Column('varchar', {array: true})
    aka: string[];

    // 年代
    @Column()
    year: number;

    // 发布日期
    @Column()
    released: Date;

    // 片长
    @Column()
    runtime: number;

    // 状态(上线|下线)
    @Column()
    status: VodStatus;

    @Column()
    type: VodType;

    // 片源: {k:'720P', v:'play_url'}
    @Column('jsonb')
    src: string;

    // 分辨率标签: ['HD', '720P']
    // @Column('varchar', {array: true})
    // tags: string[];

    // 影片类型
    @Column('varchar', {array: true})
    genres: string[];

    // 制片国家
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

    // 演员
    @Column('varchar', {array: true})
    actors: string[];

    // 字幕
    @Column('varchar', {array: true, nullable: true})
    subtitles: string[];

    // 故事情节
    @Column('text')
    plot: string;

    // 海报
    @Column()
    poster: string;

    @Column({name: 'poster_thumb'})
    posterThumb: string;

    @Column({name: 'poster_slide', nullable: true})
    posterSlide: string;

    @Column({name: 'imdb_id'})
    imdbId: string;

}
