import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../shared/entity/base.entity';

@Entity('cms_episode')
export class EpisodeEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'imdb_id', nullable: false })
  imdbId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  src: string;

  @Column({ nullable: false })
  season: number;

  @Column({ nullable: false })
  episode: number;

  @Column({ name: 'release_season' })
  releaseSeason: number;

  @Column({ name: 'release_episode' })
  releaseEpisode: number;

}
