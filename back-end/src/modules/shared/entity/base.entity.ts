import {BeforeInsert, BeforeUpdate, Column} from 'typeorm';
import Consts from '../util/consts';

export class BaseEntity {

    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'created_by'})
    createdBy: string;

    @Column({name: 'updated_at', nullable: true})
    updatedAt: Date;

    @Column({name: 'updated_by', nullable: true})
    updatedBy: string;

    @BeforeInsert()
    beforeInsert() {
        this.createdAt = new Date();
        this.createdBy = Consts.ACCOUNT;
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.updatedAt = new Date();
        this.updatedBy = Consts.ACCOUNT;
    }

}
