import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ViolationsService } from "./violations.service";
import { CreateViolationDto } from "./dto/create-violation.dto";
import { ViolationsQueryDto } from "./dto/violations-query.dto";
import { IdParamDto } from "@common/dto/id-param.dto";

@Controller({ path: "violations", version: "1" })
export class ViolationsController {
  constructor(private readonly violationsService: ViolationsService) {}

  @Post()
  create(@Body() payload: CreateViolationDto) {
    return this.violationsService.create(payload);
  }

  @Get()
  findAll(@Query() query: ViolationsQueryDto) {
    return this.violationsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param() params: IdParamDto) {
    return this.violationsService.findOne(params.id);
  }
}
