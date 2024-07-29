import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'
import { MachineTypes } from '../enums/machine-types.enum'

export class FindMachineDataDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    machineId: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    userId: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    from: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    to: number

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
    machineType: MachineTypes
}
