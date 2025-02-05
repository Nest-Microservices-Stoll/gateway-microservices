import { Controller, Get, Post, Body, Patch, Param, Inject, ParseUUIDPipe, Query } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/services';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dtos/pagination';
import { StatusDto } from './dto/status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly ordersClient: ClientProxy
  ) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {

    return this.ordersClient.send('createOrder', createOrderDto).pipe(
      catchError((error) => { throw new RpcException(error) })
    )

  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersClient.send('findAllOrders', paginationDto)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      )
  }


  @Get(':status')
  findAllByStatus(
    @Param() status: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {

    return this.ordersClient.send('findAllOrders', { ...status, ...paginationDto }).pipe(
      catchError((error) => { throw new RpcException(error) })
    )

  }


  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {

    return this.ordersClient.send('findOneOrder', id)
      .pipe(
        catchError((error) => { throw new RpcException(error) })
      )
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    return this.ordersClient.send('changeOrderStatus', {
      id: id, status: statusDto.status
    }).pipe(
      catchError((error) => { throw new RpcException(error) })
    )
  }
}
