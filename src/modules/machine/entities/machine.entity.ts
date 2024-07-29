import { CustomBaseEntity } from 'src/common/entity/custom-base.entity'
import { Column, Entity } from 'typeorm'
import { MachineTypes } from '../enums/machine-types.enum'

@Entity()
export class Machine extends CustomBaseEntity {
    @Column({ type: 'varchar', length: 255, nullable: false })
    machineName: string

    @Column({
        type: 'enum',
        enum: MachineTypes,
        nullable: false
    })
    machineType: string
}
