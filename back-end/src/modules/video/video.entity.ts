import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Video {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    keywords: string;

    area: string;
    year: number;
    lang: string;
    intro: string;

    vodSrc: string;

    @Column()
    poster: string;

    @Column()
    posterThumb: string;

    @Column()
    posterSlide: string;

    directors: string;
    actors: string;
    genres: string;

}