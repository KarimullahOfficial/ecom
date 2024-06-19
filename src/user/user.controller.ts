import { Controller, Get, Post, Body, Param, Delete, Query, Put, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ICreateUserDto, ILogInDto, IUpdateUserDto, IUserQueryParam } from 'types';
import { Response } from 'express'



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() icreateDto: ICreateUserDto) {
    return await this.userService.create(icreateDto)

  }

  @Post('login')
  async login(@Body() loginDto: ILogInDto) {

  }

  @Put('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('karim');
    return ({
      success: true,
      message: 'Logout successfully',
    });
  }

  @Get('forgot-password/:email')
  async forgotPassword(@Param('email') email: string) {
    return await this.userService.forgetPassword(email);
  }


  @Get()
  async findAll(@Query() query: IUserQueryParam) {
    return await this.userService.findAll(query)
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.userService.findById(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() iupdateDtoUser: IUpdateUserDto) {
    return await this.userService.update(id, iupdateDtoUser)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id)
  }

}
