import { randAccount, randFullName, randPassword } from '@ngneat/falso'
import { User } from 'src/modules/users/entities/user.entity'
import { define } from 'typeorm-seeding'

define(User, () => {
    const user = new User()
    user.name = randFullName()
    user.employeeId = randAccount()
    user.password = randPassword()
    return user
})
