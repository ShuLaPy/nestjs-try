import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    const generatedId = this.productService.insertProduct(
      prodTitle,
      description,
      price,
    );
    return { id: generatedId };
  }
}
