import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateMachineDto } from './dto/create-machine.dto'
import { UpdateMachineDto } from './dto/update-machine.dto'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { Machine } from './entities/machine.entity'
import { Between, EntityManager, Repository } from 'typeorm'
import { CreateMachineDataDto } from './dto/create-machine-data.dto'
import { MachineData } from './entities/machine-data.entity'
import { UsersService } from '../users/users.service'
import { FindMachineDataDto } from './dto/find-machine-data.dto'

@Injectable()
export class MachineService {
    constructor(
        @InjectRepository(Machine)
        private readonly machineRepository: Repository<Machine>,
        @InjectRepository(MachineData)
        private readonly machineDataRepository: Repository<MachineData>,
        private readonly userService: UsersService,
        @InjectEntityManager()
        private readonly entityManager: EntityManager
    ) {}
    async createMachine(createMachineDto: CreateMachineDto) {
        return await this.machineRepository.save(createMachineDto)
    }

    async createMachineData(
        userId: number,
        createMachineDataDto: CreateMachineDataDto
    ) {
        return this.entityManager.transaction(async () => {
            const user = await this.userService.findOne(userId)
            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            }
            const machine = await this.findOneByMachineId(
                createMachineDataDto.machineId
            )
            if (!machine) {
                throw new HttpException(
                    'Machine not found',
                    HttpStatus.NOT_FOUND
                )
            }
            const machineData = new MachineData()
            machineData.machine = machine
            machineData.user = user
            machineData.date = Date.now()
            machineData.q1 = createMachineDataDto.q1
            machineData.q2 = createMachineDataDto.q2
            machineData.q3 = createMachineDataDto.q3
            machineData.q4 = createMachineDataDto.q4
            machineData.q5 = createMachineDataDto.q5

            return await this.machineDataRepository.save(machineData)
        })
    }

    async findMachineData(findMachineDataDto: FindMachineDataDto) {
        return await this.machineDataRepository.find({
            where: {
                date: Between(findMachineDataDto.from, findMachineDataDto.to),
                machine: {
                    id: findMachineDataDto.machineId,
                    machineType: findMachineDataDto.machineType
                },
                user: {
                    id: findMachineDataDto.userId
                }
            },
            relations: ['machine', 'user']
        })
    }

    async findAll() {
        return await this.machineRepository.find()
    }

    private async findOneByMachineId(id: number) {
        return await this.machineRepository.findOne({
            where: { id }
        })
    }

    update(id: number, updateMachineDto: UpdateMachineDto) {
        return `This action updates a #${id} machine`
    }

    remove(id: number) {
        return `This action removes a #${id} machine`
    }
}
