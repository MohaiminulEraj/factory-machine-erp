import { User } from 'src/modules/users/entities/user.entity'
import { DataSource } from 'typeorm'
import { Factory, Seeder } from 'typeorm-seeding'
import * as bcrypt from 'bcryptjs'

export class UserCreateSeed implements Seeder {
    public async run(factory: Factory, dataSource: DataSource): Promise<void> {
        const userRepository = dataSource.getRepository(User)

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash('123456', salt)

        // FIRST TRUNCATE THE TABLE
        // await userRepository.delete({})
        await dataSource.query(`SET FOREIGN_KEY_CHECKS = 0;`)
        await dataSource.query(`TRUNCATE user;`)
        await dataSource.query(`SET FOREIGN_KEY_CHECKS = 1;`)

        for (let i = 1; i <= 10; i++) {
            await dataSource.query(
                `INSERT INTO user (name, employeeId, password) VALUES ("user_${i}", "emp_${i}", "${hashedPassword}")`
            )
        }

        // await factory(User)().createMany(10)
    }
}
