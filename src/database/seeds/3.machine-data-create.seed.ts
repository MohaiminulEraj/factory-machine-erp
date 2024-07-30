import { User } from 'src/modules/users/entities/user.entity'
import { DataSource } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import * as bcrypt from 'bcryptjs'
import { Machine } from 'src/modules/machine/entities/machine.entity'
import { MachineData } from 'src/modules/machine/entities/machine-data.entity'

export class MachineDataCreateSeed implements Seeder {
    public async run(factory: Factory, dataSource: DataSource): Promise<void> {
        const userRepository = dataSource.getRepository(User)
        const machineRepository = dataSource.getRepository(Machine)
        const users = await userRepository.find({
            select: ['id']
        })

        console.log([...users])
        // console.log('heeki')
        // const machineDataRepository = dataSource.getRepository(MachineData)

        // // FIRST TRUNCATE THE TABLE
        // await machineDataRepository.delete({})

        // const machine_type = ['maker', 'packer']

        // for (let i = 1; i <= 100; i++) {
        //     const type =
        //         machine_type[Math.floor(Math.random() * machine_type.length)]
        //     await dataSource.query(
        //         `INSERT INTO machine (machineName, machineType) VALUES ("machine_${i}", "${type}")`
        //     )
        // }

        // await factory(User)().createMany(10)
    }
}
