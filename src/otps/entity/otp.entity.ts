import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class OTPs {
    
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "date", default: new Date() })
    createdAt: Date;

    @Column({ type: "date" })
    expiration: Date;

    @Column()
    usersEmail: string;

    @Column()
    token: number;

    @Column({ default: false })
    verified: boolean;

    @Column({ default: false })
    used: boolean;
    
}