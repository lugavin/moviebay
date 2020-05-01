import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from '../../shared/entity/base.entity';

/**
 * 影人条目信息
 */
@Entity('cms_celebrity')
export class CelebrityEntity extends BaseEntity {

    // 条目id
    @PrimaryGeneratedColumn()
    id: number;

    // 影人名字
    @Column()
    name: string;

    // 影人头像
    @Column({nullable: true})
    avatar: string;

    // 影人简介
    @Column()
    intro: string;

    // 性别
    @Column()
    gender: string;

    // 出生日期
    @Column()
    birthday: Date;

    // 出生地
    @Column()
    birthplace: string;

    // 职业
    @Column()
    professions: string;

    // 星座
    @Column()
    constellation: string;

    // 影人剧照(最多10张)
    @Column({nullable: true})
    photos: string;

    // 影人作品(最多5部)
    @Column({nullable: true})
    works: string;

}
