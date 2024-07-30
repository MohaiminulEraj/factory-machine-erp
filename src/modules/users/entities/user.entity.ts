import { Exclude } from "class-transformer";
import { IsString } from "class-validator";
import { CustomBaseEntity } from "src/common/entity/custom-base.entity";
import { NumberTransformer } from "src/config/custom-transformer.config";
import { Column, Entity } from "typeorm";

@Entity()
export class User extends CustomBaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    employeeId: string

    @Exclude()
    @Column({ type: 'varchar', length: 255, nullable: false, select: false })
    @IsString()
    password: string

    @Column({
        type: 'bigint',
        nullable: true,
        transformer: new NumberTransformer()
    })
    lastLogin: number

    @Column({
        type: 'bigint',
        nullable: true,
        transformer: new NumberTransformer()
    })
    lastPasswordUpdate: number
}
