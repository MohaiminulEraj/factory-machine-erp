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
        const machineDataRepository = dataSource.getRepository(MachineData)
        const users = await userRepository.find()
        const machines = await machineRepository.find()
        const question_answers = [null, true, false]
        // // FIRST TRUNCATE THE TABLE
        // await machineDataRepository.delete({})
        await dataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`)
        await dataSource.query(`TRUNCATE machine_data;`)
        await dataSource.query(`SET FOREIGN_KEY_CHECKS = 1;`)

        for (let i = 1; i <= 1000; i++) {
            const q1 = question_answers[Math.floor(Math.random() * question_answers.length)]
            const q2 = question_answers[Math.floor(Math.random() * question_answers.length)]
            const q3 = question_answers[Math.floor(Math.random() * question_answers.length)]
            const q4 = question_answers[Math.floor(Math.random() * question_answers.length)]
            const q5 = question_answers[Math.floor(Math.random() * question_answers.length)]
            const machine = machines[Math.floor(Math.random() * machines.length)]
            const user = users[Math.floor(Math.random() * users.length)]
            const machineData = new MachineData()
            machineData.date = Date.now()
            machineData.q1 = q1
            machineData.q2 = q2
            machineData.q3 = q3
            machineData.q4 = q4
            machineData.q5 = q5
            machineData.machine = machine
            machineData.user = user
            await machineDataRepository.save(machineData)
        }
    }
}
