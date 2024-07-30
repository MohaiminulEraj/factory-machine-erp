import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { MachineService } from './../src/modules/machine/machine.service';
import { MachineTypes } from './../src/modules/machine/enums/machine-types.enum';

describe('MachineService (e2e)', () => {
    let machineService: MachineService;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [MachineService],
        }).compile();

        machineService = moduleFixture.get<MachineService>(MachineService);
    });

    describe('createMachine', () => {
        it('should create a new machine', async () => {
            const newMachine = {
                machineName: 'Test Machine',
                machineType: MachineTypes.MAKER,
            };

            const createdMachine = await machineService.createMachine(newMachine);

            expect(createdMachine).toBeDefined();
            expect(createdMachine.machineName).toEqual(newMachine.machineName);
            expect(createdMachine.machineType).toEqual(newMachine.machineType);

        });
    });

    describe('findAll', () => {
        it('should return an array of machines', async () => {
            const machines = await machineService.findAll();
            expect(machines).toBeDefined();
            expect(machines.length).toBeGreaterThan(0);
        });
    });

    describe('findOneByMachineId', () => {
        it('should return a machine with the specified machineId', async () => {
            const machineId = 1;
            const machine = await machineService.findOneByMachineId(machineId);

            expect(machine).toBeDefined();
            expect(machine.id).toEqual(machineId);
        });
    });
});