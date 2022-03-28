import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, description: string, price: number) {
    const prodId =
      +new Date() + Math.floor(100000 + Math.random() * 900000).toString();
    const newProduct = new Product(prodId, title, description, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts() {
    return [...this.products];
  }

  getProduct(productId: string) {
    const product = this.getSingleProduct(productId)[0];
    return product;
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const [product, index] = this.getSingleProduct(productId);
    const updatedProduct = { ...product };
    if (title) updatedProduct.title = title;
    if (description) updatedProduct.desciption = description;
    if (price) updatedProduct.price = price;
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  deleteProduct(productId: string) {
    const [product, index] = this.getSingleProduct(productId);
    this.products.splice(index, 1);
    return product;
  }

  getSingleProduct(productId: string): [Product, number] {
    const index = this.products.findIndex((prod) => prod.id === productId);
    const product = this.products.find((prod) => prod.id === productId);
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return [product, index];
  }
}
