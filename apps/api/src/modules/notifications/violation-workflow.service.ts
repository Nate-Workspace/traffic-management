import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DRIZZLE_DB } from "@database/database.tokens";
import type { Database } from "@database/database.types";
import { violations } from "@modules/violations/schema/violations.schema";
import type { ViolationWorkflowStatus } from "./types/notification.types";

const MANUAL_WORKFLOW_STATUSES = ["REVIEWED", "DISMISSED", "PENDING"] as const;

export type ManualWorkflowStatus = (typeof MANUAL_WORKFLOW_STATUSES)[number];

@Injectable()
export class ViolationWorkflowService {
  constructor(@Inject(DRIZZLE_DB) private readonly db: Database) {}

  async updateStatus(violationId: string, status: ManualWorkflowStatus) {
    if (status === "NOTIFIED" as ViolationWorkflowStatus) {
      throw new BadRequestException({
        code: "invalid_workflow_transition",
        message: "NOTIFIED status is set automatically after successful email delivery",
      });
    }

    const [existing] = await this.db
      .select({ id: violations.id, status: violations.status })
      .from(violations)
      .where(eq(violations.id, violationId))
      .limit(1);

    if (!existing) {
      throw new NotFoundException({
        code: "violation_not_found",
        message: "Violation not found",
      });
    }

    this.assertTransition(existing.status, status);

    const [updated] = await this.db
      .update(violations)
      .set({ status })
      .where(eq(violations.id, violationId))
      .returning({
        id: violations.id,
        status: violations.status,
        notificationStatus: violations.notificationStatus,
        lastNotifiedAt: violations.lastNotifiedAt,
        updatedAt: violations.updatedAt,
      });

    if (!updated) {
      throw new NotFoundException({
        code: "violation_not_found",
        message: "Violation not found",
      });
    }

    return {
      id: updated.id,
      status: updated.status,
      notificationStatus: updated.notificationStatus,
      lastNotifiedAt: updated.lastNotifiedAt?.toISOString() ?? null,
      updatedAt: updated.updatedAt.toISOString(),
    };
  }

  private assertTransition(
    current: ViolationWorkflowStatus,
    next: ManualWorkflowStatus,
  ) {
    if (current === next) {
      return;
    }

    const allowed: Record<ViolationWorkflowStatus, ManualWorkflowStatus[]> = {
      PENDING: ["REVIEWED", "DISMISSED"],
      NOTIFIED: ["REVIEWED", "DISMISSED"],
      REVIEWED: ["DISMISSED", "PENDING"],
      DISMISSED: ["PENDING", "REVIEWED"],
    };

    if (!allowed[current].includes(next)) {
      throw new BadRequestException({
        code: "invalid_workflow_transition",
        message: `Cannot transition from ${current} to ${next}`,
      });
    }
  }
}
