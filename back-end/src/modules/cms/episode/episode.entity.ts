import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from '../../shared/entity/base.entity';

@Entity('cms_episode')
export class EpisodeEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'imdb_id'})
    imdbId: string;

    @Column()
    name: string;

    @Column()
    src: string;

    @Column()
    season: number;

    @Column()
    episode: number;

    @Column({name: 'release_season'})
    releaseSeason: number;

    @Column({name: 'release_episode'})
    releaseEpisode: number;

}
