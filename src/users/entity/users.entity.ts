import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { RegRoute } from "./user.route";


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

    @Column({ nullable: true })
    lastLogin: Date;

    @Column({ type: "enum", enum: RegRoute, default: RegRoute.MOTHER_DATA })
    regRoute: RegRoute; // google , motherData 

}