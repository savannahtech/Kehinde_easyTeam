import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: UserDto): Promise<User> {
    return new User(await this.userService.create(createUserDto));
  }

  @Get()
  @UseGuards(AuthGuard('local'))
  async findAll(): Promise<User[]> {
    return (await this.userService.findAll()).map((user) => new User(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: ObjectId): Promise<User> {
    return new User(await this.userService.findOne(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new User(
      (await this.userService.update(id, updateUserDto)) as Partial<User>,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: ObjectId) {
    return new User((await this.userService.remove(id)) as Partial<User>);
  }
}
