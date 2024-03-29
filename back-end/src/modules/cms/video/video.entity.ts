import {Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import {EpisodeEntity} from '../episode/episode.entity';
import {BaseEntity, VodStatus, VodType} from 'src/shared';

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
    title: string;

    // 译名
    @Index()
    @Column({name: 'alt_title'})
    altTitle: string;

    // 又名(also known as)
    @Column('varchar', {name: 'aka_title', array: true})
    akaTitle: string[];

    // 年份
    @Column('int4')
    year: number;

    // 发布日期
    @Column('int8')
    released: number;

    // 片长
    @Column('int4')
    runtime: number;

    // 标签
    @Column()
    tag: string;

    // 分类
    @Column()
    type: VodType;

    // 状态(上线|下线)
    @Column('bit')
    status: VodStatus;

    // 片源: [{k:'onedrive', v:'onedrive_link', {k:'baidudisk', v:'baidudisk_link'}]
    @Column('jsonb', {nullable: true})
    sources: string;

    // 类型
    @Column('varchar', {array: true})
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

    // 演员
    @Column('varchar', {array: true})
    actors: string[];

    // 字幕
    // @Column('varchar', {array: true, nullable: true})
    // subtitles: string[];

    // 情节
    @Column('text')
    plot: string;

    // 海报
    @Column()
    poster: string;

    // 海报缩略图
    @Column({name: 'poster_thumb'})
    posterThumb: string;

    @Index({unique: true})
    @Column({name: 'imdb_id'})
    imdbId: string;

    @Column('numeric', {name: 'imdb_rating', precision: 2, scale: 1})
    imdbRating: number;

    @OneToOne(() => EpisodeEntity)
    @JoinColumn({name: 'latest_episode_id'})
    latestEpisode: EpisodeEntity;

}
