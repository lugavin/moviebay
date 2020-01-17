import {BeforeInsert, BeforeUpdate, Column} from 'typeorm';
import {Transform} from 'class-transformer';
import {dateTransform} from './transform';
import {Constants} from '../util/constants';

export class BaseEntity {

    @Transform(dateTransform)
    @Column({name: 'created_at'})
    createdAt: Date;

    @Column({name: 'created_by'})
    createdBy: string;

    @Transform(dateTransform)
    @Column({name: 'updated_at', nullable: true})
    updatedAt: Date;

    @Column({name: 'updated_by', nullable: true})
    updatedBy: string;

    @BeforeInsert()
    beforeInsert() {
        this.createdAt = new Date();
        this.createdBy = Constants.ACCOUNT;
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.updatedAt = new Date();
        this.updatedBy = Constants.ACCOUNT;
    }

}
