import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {VideoStatus, VideoType} from '../../shared/util/constants';
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

    // 片源: [{k:'720P', v:'video_link'}]
    @Column('jsonb')
    sources: string;

    // 地区: [{k:'dict_country_id', v:'dict_country_val'}]
    @Column('jsonb')
    countries: string;

    // 语言: [{k:'dict_language_id', v:'dict_language_val'}]
    @Column('jsonb')
    languages: string;

    // 类型: [{k:'dict_genre_id', v:'dict_genre_val'}]
    @Column('jsonb')
    genres: string;

    // 导演: [{k:'celebrity_id', v:'celebrity_name'}]
    @Column('jsonb')
    directors: string;

    // 编剧: [{k:'celebrity_id', v:'celebrity_name'}]
    @Column('jsonb')
    writers: string;

    // 主演: [{k:'celebrity_id', v:'celebrity_name'}]
    @Column('jsonb')
    actors: string;

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

    // 关键字
    @Column()
    keywords: string;

    // 状态(上线|下线)
    @Column()
    status: VideoStatus;

    @Column()
    type: VideoType;

    // 剧集(tv only): 当前季数/总季数
    @Column({nullable: true})
    season: string;

    // 评分&播放次数字段经常发生变化, 挪到VideoMeta表维护
    @Column({name: 'imdb_id', nullable: true})
    imdbId: string;

}
