import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateDeviceDto {
    @ApiModelProperty() fcmToken: string;
    @ApiModelPropertyOptional() bundleId: string;
    @ApiModelProperty() sandbox: boolean;
}
