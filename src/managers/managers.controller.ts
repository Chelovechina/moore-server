import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Controller('managers')
export class ManagersController {
  constructor(private managersService: ManagersService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.managersService.getAllManagers();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createManager(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.createManager(createManagerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  updateManager(@Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.updateManager(updateManagerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteManager(@Param('id') id: string) {
    return this.managersService.deleteManager(id);
  }
}
