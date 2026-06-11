import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ViolationsService } from "./violations.service";
import { CreateViolationDto } from "./dto/create-violation.dto";
import { ViolationsQueryDto } from "./dto/violations-query.dto";
import { UpdateViolationStatusDto } from "./dto/update-violation-status.dto";
import { IdParamDto } from "@common/dto/id-param.dto";
import { CreateAiViolationDto } from "./dto/create-ai-violation.dto";
import { NotificationsService } from "@modules/notifications/notifications.service";
import { ViolationWorkflowService } from "@modules/notifications/violation-workflow.service";
import { Public } from "@common/decorators/public.decorator";

@Controller({ path: "violations", version: "1" })
export class ViolationsController {
  constructor(
    private readonly violationsService: ViolationsService,
    private readonly notificationsService: NotificationsService,
    private readonly workflowService: ViolationWorkflowService,
  ) {}

  @Public()
  @Post()
  create(@Body() payload: CreateViolationDto) {
    return this.violationsService.create(payload);
  }

  @Post("ai")
  createFromAi(@Body() payload: CreateAiViolationDto) {
    return this.violationsService.createFromAi(payload);
  }

  @Get()
  findAll(@Query() query: ViolationsQueryDto) {
    return this.violationsService.findAll(query);
  }

  @Get(":id")
  findOne(@Param() params: IdParamDto) {
    return this.violationsService.findDetails(params.id);
  }

  @Post(":id/notifications/resend")
  resendNotification(@Param() params: IdParamDto) {
    return this.notificationsService.resendViolationNotice(params.id);
  }

  @Patch(":id/status")
  updateStatus(
    @Param() params: IdParamDto,
    @Body() payload: UpdateViolationStatusDto,
  ) {
    return this.workflowService.updateStatus(params.id, payload.status);
  }
}
