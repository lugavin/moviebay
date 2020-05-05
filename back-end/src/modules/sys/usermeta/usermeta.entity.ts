import {Entity, Column, PrimaryGeneratedColumn, Index} from 'typeorm';

/**
 * 用户元数据信息
 * 说明: SYS_USER 已经存储了每个用户会用到的基本信息, 比如 username、password、email等常用信息, 但如果我们还要存储一些不常用的数据,
 * 最好的做法不是在表追加一列, 去破坏默认的表结构, 而是将数据存在 SYS_USER_META 表中, SYS_USER_META 这个拓展表可以存储每个用户的QQ号码、手机号码、登录后台的主题选项等等
 */
@Entity('sys_user_meta')
export class UserMetaEntity {

    // 自增唯一ID
    @PrimaryGeneratedColumn()
    id: number;

    // 对应用户ID
    @Index()
    @Column({name: 'user_id'})
    userId: string;

    // 键名
    @Index()
    @Column({name: 'meta_key'})
    metaKey: string;

    // 键值
    @Column({name: 'meta_val'})
    metaVal: string;

}
