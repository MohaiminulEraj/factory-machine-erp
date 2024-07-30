import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('🔒 User API')
@Controller('users')
@UseGuards(JwtAuthGuard, ThrottlerGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get users'
  })
  @ApiResponse({
      description: 'Something went wrong',
      status: HttpStatus.BAD_REQUEST
  })
  @ApiResponse({
      description: 'User Data Found!',
      status: HttpStatus.FOUND
  })
  @ApiBearerAuth()
  async findAll() {
    return {
      statusCode: HttpStatus.OK,
      message: 'Data Found!',
      result:  await this.usersService.findAll()
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get users'
  })
  @ApiResponse({
      description: 'Something went wrong',
      status: HttpStatus.BAD_REQUEST
  })
  @ApiResponse({
      description: 'User Data Found!',
      status: HttpStatus.FOUND
  })
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
