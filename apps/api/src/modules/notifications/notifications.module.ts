import { Module } from "@nestjs/common";
import { DatabaseModule } from "@database/database.module";
import { EmailService } from "./email/email.service";
import { NotificationsService } from "./notifications.service";
import { ViolationWorkflowService } from "./violation-workflow.service";

@Module({
  imports: [DatabaseModule],
  providers: [EmailService, NotificationsService, ViolationWorkflowService],
  exports: [NotificationsService, ViolationWorkflowService],
})
export class NotificationsModule {}
