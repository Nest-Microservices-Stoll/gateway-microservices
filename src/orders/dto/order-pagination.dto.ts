import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dtos/pagination";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";



export class OrderPaginationDto extends PaginationDto {


    @IsOptional()
    @IsEnum(OrderStatusList, {
        message: `Valid status are ${OrderStatusList}`
    })
    status: OrderStatus

}