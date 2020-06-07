import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from '../../../shared';

/**
 * 影视剧集
 * @see https://github.com/devfake/flox
 */
@Entity('cms_episode')
export class EpisodeEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'imdb_id'})
    imdbId: string;

    @Column()
    src: string;

    @Column()
    name: string;

    @Column()
    season: number;

    @Column()
    episode: number;

    @Column({name: 'release_season'})
    releaseSeason: number;

    @Column({name: 'release_episode'})
    releaseEpisode: number;

    // @Column('varchar', {array: true, nullable: true})
    // subtitles: string[];

}
