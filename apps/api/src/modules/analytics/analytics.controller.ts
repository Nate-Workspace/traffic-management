import { Controller, Get, Query } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsRangeDto } from "./dto/analytics-range.dto";
import { RepeatedOffendersQueryDto } from "./dto/repeated-offenders.dto";
import { RecentViolationsQueryDto } from "./dto/recent-violations.dto";

@Controller({ path: "analytics", version: "1" })
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("summary")
  getSummary(@Query() query: AnalyticsRangeDto) {
    return this.analyticsService.getSummary(query);
  }

  @Get("violations-trend")
  getViolationsTrend(@Query() query: AnalyticsRangeDto) {
    return this.analyticsService.getViolationsTrend(query);
  }

  @Get("repeated-offenders")
  getRepeatedOffenders(@Query() query: RepeatedOffendersQueryDto) {
    return this.analyticsService.getRepeatedOffenders(query);
  }

  @Get("recent-violations")
  getRecentViolations(@Query() query: RecentViolationsQueryDto) {
    return this.analyticsService.getRecentViolations(query);
  }
}
