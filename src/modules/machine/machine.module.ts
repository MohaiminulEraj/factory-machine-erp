import { Module } from '@nestjs/common'
import { MachineService } from './machine.service'
import { MachineController } from './machine.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Machine } from './entities/machine.entity'
import { MachineData } from './entities/machine-data.entity'
import { UsersModule } from '../users/users.module'

@Module({
    imports: [TypeOrmModule.forFeature([Machine, MachineData]), UsersModule],
    controllers: [MachineController],
    providers: [MachineService]
})
export class MachineModule {}
