import { User } from 'src/modules/users/entities/user.entity'
import { DataSource } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import * as bcrypt from 'bcryptjs'
import { Machine } from 'src/modules/machine/entities/machine.entity'

export class MachineCreateSeed implements Seeder {
    public async run(factory: Factory, dataSource: DataSource): Promise<void> {
        const machineRepository = dataSource.getRepository(Machine)

        // FIRST TRUNCATE THE TABLE
        await dataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`)
        await dataSource.query(`TRUNCATE machine;`)
        await dataSource.query(`SET FOREIGN_KEY_CHECKS = 1;`)

        const machine_type = ['maker', 'packer']

        for (let i = 1; i <= 100; i++) {
            const type =
                machine_type[Math.floor(Math.random() * machine_type.length)]
            await dataSource.query(
                `INSERT INTO machine (machineName, machineType) VALUES ("machine_${i}", "${type}")`
            )
        }
    }
}
