import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpStatus,
    Request,
    UseGuards
} from '@nestjs/common'
import { MachineService } from './machine.service'
import { CreateMachineDto } from './dto/create-machine.dto'
import { UpdateMachineDto } from './dto/update-machine.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateMachineDataDto } from './dto/create-machine-data.dto'
import { ThrottlerGuard } from '@nestjs/throttler'
import { AuthGuard } from '@nestjs/passport'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { FindMachineDataDto } from './dto/find-machine-data.dto'

@UseGuards(ThrottlerGuard, JwtAuthGuard)
@ApiTags('🔒 Machine API')
@Controller('machine')
export class MachineController {
    constructor(private readonly machineService: MachineService) {}

    @Post()
    @ApiOperation({
        summary: 'Machine Endpoint'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Machine created successfully',
        status: HttpStatus.OK
    })
    async createMachine(@Body() createMachineDto: CreateMachineDto) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Login done successfully',
            result: await this.machineService.createMachine(createMachineDto)
        }
    }

    @Get('data')
    @ApiOperation({
        summary: 'Machine Data Endpoint'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Data Found!',
        status: HttpStatus.OK
    })
    async findMachineData(@Body() findMachineDataDto: FindMachineDataDto) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Data Found!',
            result: await this.machineService.findMachineData(findMachineDataDto)
        }
    }

    @Post('data')
    @ApiOperation({
        summary: 'Machine Data Endpoint'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Machine Data created successfully',
        status: HttpStatus.OK
    })
    async createMachineData(
        @Request() req,
        @Body() createMachineDataDto: CreateMachineDataDto
    ) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Login done successfully',
            result: await this.machineService.createMachineData(
                +req.user.id,
                createMachineDataDto
            )
        }
    }    

    @Get()
    findAll() {
        return this.machineService.findAll()
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.machineService.findOne(+id)
    // }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateMachineDto: UpdateMachineDto
    ) {
        return this.machineService.update(+id, updateMachineDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.machineService.remove(+id)
    }
}
