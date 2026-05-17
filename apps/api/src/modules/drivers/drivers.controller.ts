import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { DriversService } from "./drivers.service";
import { CreateDriverDto } from "./dto/create-driver.dto";
import { UpdateDriverDto } from "./dto/update-driver.dto";
import { DriversQueryDto } from "./dto/drivers-query.dto";
import { IdParamDto } from "@common/dto/id-param.dto";

@Controller({ path: "drivers", version: "1" })
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(@Body() payload: CreateDriverDto) {
    return this.driversService.create(payload);
  }

  @Get()
  findAll(@Query() query: DriversQueryDto) {
    return this.driversService.findAll(query);
  }

  @Get(":id")
  findOne(@Param() params: IdParamDto) {
    return this.driversService.findOne(params.id);
  }

  @Patch(":id")
  update(@Param() params: IdParamDto, @Body() payload: UpdateDriverDto) {
    return this.driversService.update(params.id, payload);
  }

  @Delete(":id")
  remove(@Param() params: IdParamDto) {
    return this.driversService.remove(params.id);
  }
}
