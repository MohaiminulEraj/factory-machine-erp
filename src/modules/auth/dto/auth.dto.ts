import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    employeeId: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string
}

export class RegistrationDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    employeeId: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    confirmPassword: string
}

export class UpdatePasswordDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    currentPassword: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    newPassword: string
}
