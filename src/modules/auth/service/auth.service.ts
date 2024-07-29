import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { LoginDto, RegistrationDto, UpdatePasswordDto } from '../dto/auth.dto'
import { User } from 'src/modules/users/entities/user.entity'
import { JwtService } from './jwt.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcryptjs'
import * as crypto from 'crypto'
import { LoggedInUser } from 'src/modules/users/data/logged-in-user.type'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @Inject(JwtService)
        private readonly jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto) {
        const user: User = await this.getAUser({
            employeeId: loginDto.employeeId
        })

        if (!user) {
            throw new HttpException(
                'Invalid User credentials',
                HttpStatus.BAD_REQUEST
            )
        }
        try {
            const isPasswordValid: boolean = this.jwtService.isPasswordValid(
                loginDto.password,
                user.password
            )
            if (!isPasswordValid) {
                throw new HttpException(
                    'Invalid User credentials',
                    HttpStatus.BAD_REQUEST
                )
            }
        } catch (error) {
            throw new HttpException(
                'Invalid User credentials',
                HttpStatus.BAD_REQUEST
            )
        }
        user.lastLogin = Date.now()
        await user.save()

        return await this.unifiedAuthResponse(user)
    }

    async registration(registrationDto: RegistrationDto) {
        if (registrationDto.password != registrationDto.confirmPassword) {
            throw new HttpException(
                'Password Mismatched',
                HttpStatus.BAD_REQUEST
            )
        }
        const previousData = await this.userRepository.findOne({
            where: {
                employeeId: registrationDto.employeeId
            }
        })

        if (previousData) {
            throw new HttpException(
                'Employee Id already exists',
                HttpStatus.CONFLICT
            )
        }

        try {
            let userToRegister: User

            const salt = await bcrypt.genSaltSync(10)
            const hashedPassword = await bcrypt.hash(
                registrationDto.password,
                salt
            )

            userToRegister = new User()
            userToRegister.name = registrationDto.name
            userToRegister.employeeId = registrationDto.employeeId
            userToRegister.password = hashedPassword

            const registeredUser =
                await this.userRepository.save(userToRegister)

            return await this.unifiedAuthResponse(registeredUser)
        } catch (error) {
            throw new HttpException(
                'An error occurred while registering a user',
                HttpStatus.BAD_REQUEST
            )
        }
    }

    findAll() {
        return `This action returns all auth`
    }

    findOne(id: number) {
        return `This action returns a #${id} auth`
    }

    /**
     * GET A USER
     */
    async getAUser(condition: any) {
        return await this.userRepository.findOne({
            select: {
                id: true,
                password: true,
                name: true,
                lastLogin: true
            },
            where: condition
        })
    }

    /**
     * UNIFIED RESPONSE FOR AUTH
     */
    async unifiedAuthResponse(user: User | any) {
        const token: string = this.jwtService.generateToken(user)
        return {
            id: user.id,
            employeeId: user.employeeId,
            name: user.name,
            token: token
        }
    }

    async updateUserPassword(
        userId: number,
        updateUserPasswordDto: UpdatePasswordDto
    ) {
        const user = await this.userRepository.findOne({
            select: ['id', 'password'],
            where: {
                id: userId
            }
        })
        if (!user) {
            throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST)
        }

        const isPasswordValid = this.jwtService.isPasswordValid(
            updateUserPasswordDto.currentPassword,
            user.password
        )
        if (!isPasswordValid) {
            throw new HttpException(
                'Current password is incorrect',
                HttpStatus.BAD_REQUEST
            )
        }

        user.password = this.jwtService.encodePassword(
            updateUserPasswordDto.newPassword
        )
        return await this.userRepository.save(user)
    }

    public async refreshToken(loggedInUser: LoggedInUser) {
        const user = await this.unifiedAuthResponse(
            await this.getAUser({ id: loggedInUser.id })
        )
        return user
    }

    remove(id: number) {
        return `This action removes a #${id} auth`
    }
}
