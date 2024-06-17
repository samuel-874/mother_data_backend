import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Transform } from "class-transformer";
import { OtpTypes } from "./opt-types.enum";

@Entity()
export class OTPS {
    
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "timestamp" })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    createdAt: Date;

    @Column({ type: "timestamp" })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    expiration: Date;

    @Column()
    usersEmail: string;

    @Column()
    token: string;

    @Column({ default: false })
    verified: boolean;

    @Column({ default: false })
    used: boolean;

    @Column({ type: "timestamp", nullable: true })
    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    verificationDate: Date;

    @Column({ type: "enum", enum: OtpTypes, default: OtpTypes.PASSWORD_RESET })
    optType: OtpTypes;
    
}