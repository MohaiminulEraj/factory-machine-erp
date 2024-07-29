import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class CreateMachineDataDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    machineId: number

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    q1: boolean

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    q2: boolean

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    q3: boolean

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    q4: boolean

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    q5: boolean
}
