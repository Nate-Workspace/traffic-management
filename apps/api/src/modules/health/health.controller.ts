import { Controller, Get } from "@nestjs/common";
import { Public } from "@common/decorators/public.decorator";
import { HealthService } from "./health.service";
import type { HealthResponseDto } from "./dto/health-response.dto";

@Public()
@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  getHealth(): HealthResponseDto {
    return this.healthService.getStatus();
  }
}
