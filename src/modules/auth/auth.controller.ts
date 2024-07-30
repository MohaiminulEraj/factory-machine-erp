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
import { AuthService } from './service/auth.service'
import { LoginDto, RegistrationDto } from './dto/auth.dto'
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { ThrottlerGuard } from '@nestjs/throttler'

@UseGuards(ThrottlerGuard)
@ApiTags('🌏 🔒 Auth API')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOperation({
        summary: 'Login Endpoint'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Login successful',
        status: HttpStatus.OK
    })
    async login(@Body() loginDto: LoginDto) {
        return {
            statusCode: HttpStatus.OK,
            message: 'Login done successfully',
            result: await this.authService.login(loginDto)
        }
    }

    @Post('registration')
    @ApiOperation({
        summary: 'Registration Endpoint'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Registration successful',
        status: HttpStatus.CREATED
    })
    async registration(@Body() registrationDto: RegistrationDto) {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Registration done successfully',
            result: await this.authService.registration(registrationDto)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('refresh-access-token')
    @ApiOperation({
        summary: 'Refreshing your access token'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Access token has been refreshed successful',
        status: HttpStatus.CREATED
    })
    @ApiBearerAuth()
    async refreshAccessToken(@Request() req) {
        return {
            status: HttpStatus.CREATED,
            message: 'Access token generated',
            result: await this.authService.refreshToken(req.user)
        }
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.authService.findOne(+id)
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.authService.remove(+id)
    // }
}
