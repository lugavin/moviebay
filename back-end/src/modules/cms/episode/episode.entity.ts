import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from '../../../shared';

/**
 * 影视剧集
 * @see https://github.com/devfake/flox
 * @see http://www.omdbapi.com/?apikey=34625b5a&t=Game%20of%20Thrones&season=1
 */
@Entity('cms_episode')
export class EpisodeEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'imdb_id'})
    imdbId: string;

    @Column()
    title: string;

    @Column()
    src: string;

    // 当前季数
    @Column()
    season: number;

    // 当前集数
    @Column()
    episode: number;

    @Column()
    seasons: number;

    @Column()
    episodes: number;

    // @Column('varchar', {array: true, nullable: true})
    // subtitles: string[];

}
