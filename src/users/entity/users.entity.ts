import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";


@Entity()
export class Users extends BaseEntity {

    @Column({
        nullable: true
    })
    profilePic: string;

    @Column({ unique: true })
    phoneNumber: string;

    @Column({ default: false })
    emailVerified: boolean;

    

}