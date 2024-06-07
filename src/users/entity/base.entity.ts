import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "./users.roles";



export abstract class BaseEntity {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    fullName: string;

    @Column({ unique: true })
    email: string;

    @Column({  })
    password: string;

    @Column({ type: 'enum', enum: Roles, default: Roles.USER })
    role: Roles;
    
}