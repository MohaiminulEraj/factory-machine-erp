import { CustomBaseEntity } from "src/common/entity/custom-base.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { MachineTypes } from "../enums/machine-types.enum";
import { NumberTransformer } from "src/config/custom-transformer.config";
import { Machine } from "./machine.entity";
import { User } from "src/modules/users/entities/user.entity";

@Entity()
export class MachineData extends CustomBaseEntity {
    @Column({
        type: 'bigint',
        nullable: false,
        transformer: new NumberTransformer()
    })
    date: number

    @Column({ type: 'boolean', nullable: true })
    q1: boolean;

    @Column({ type: 'boolean', nullable: true })
    q2: boolean;

    @Column({ type: 'boolean', nullable: true })
    q3: boolean;

    @Column({ type: 'boolean', nullable: true })
    q4: boolean;

    @Column({ type: 'boolean', nullable: true })
    q5: boolean;

    @ManyToOne(() => Machine, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    machine: Machine

    @ManyToOne(() => User, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    user: User
}
