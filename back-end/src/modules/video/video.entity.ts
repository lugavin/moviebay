import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

/**
 * 影视条目信息
 * @see http://www.omdbapi.com/?apikey=34625b5a&i=tt0111161
 * @see https://api.douban.com/v2/movie/imdb/tt0111161?apikey=0df993c66c0c636e29ecbb5344252a4a
 */
@Entity()
export class Video {

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

    // 制片国家
    @Column()
    countries: string;

    // 语言
    @Column()
    languages: string;

    // 影片类型(最多提供3类)
    @Column()
    genres: string;

    // 导演
    @Column()
    director: string;

    // 编剧
    @Column()
    writer: string;

    // 演员
    @Column()
    actors: string;

    // 海报
    @Column()
    poster: string;

    @Column()
    posterThumb: string;

    @Column()
    posterSlide: string;

    // 关键字
    @Column()
    keywords: string;

    @Column()
    imdbID: number;

    @Column()
    imdbRating: number;

    @Column()
    type: number; // movie|tv

    // 当前季数(tv only)
    @Column()
    currentSeason: number;

    // 总季数(tv only)
    @Column()
    seasonsCount: number;

    // 故事情节
    @Column()
    plot: string;

    // 状态(上线|下线)
    @Column()
    status: string;

    // 片源
    @Column()
    resources: string;
}