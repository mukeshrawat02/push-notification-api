import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class CreateDeviceDto {
    @ApiModelProperty() readonly fcmToken: string;
    @ApiModelPropertyOptional() readonly bundleId?: string;
    @ApiModelProperty() readonly sandbox: boolean;
}
