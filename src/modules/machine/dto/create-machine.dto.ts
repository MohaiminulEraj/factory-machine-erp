import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MachineTypes } from '../enums/machine-types.enum';

export class CreateMachineDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    machineName: string;

    @IsEnum(MachineTypes, {
        message: 'Machine type must be either "maker" or "packer"'
    })
    @IsNotEmpty()
    @ApiProperty({
        description: 'List of machine types',
        isArray: true,
        enum: MachineTypes,
        example: Object.keys(MachineTypes)
    })
    machineType: MachineTypes;
}
