import type { Plant, Category, LightRequirement, WaterRequirement } from '../types/plant';

export class PlantModel implements Plant {
  id: string;
  name: string;
  latinName: string;
  category: Category;
  price: number;
  discountPrice?: number;
  image: string;
  description: string;
  light: LightRequirement;
  water: WaterRequirement;
  temperature: string;
  isPopular?: boolean;
  inStock: boolean;

  constructor(data: Plant) {
    this.id = data.id;
    this.name = data.name;
    this.latinName = data.latinName;
    this.category = data.category;
    this.price = data.price;
    this.discountPrice = data.discountPrice;
    this.image = data.image;
    this.description = data.description;
    this.light = data.light;
    this.water = data.water;
    this.temperature = data.temperature;
    this.isPopular = data.isPopular;
    this.inStock = data.inStock;
  }

  getFormattedPrice(): string {
    const currentPrice = this.discountPrice || this.price;
    return `${currentPrice.toLocaleString('sr-RS')} RSD`;
  }

  hasDiscount(): boolean {
    return !!this.discountPrice && this.discountPrice < this.price;
  }

  getDiscountPercentage(): number {
    if (!this.hasDiscount() || !this.discountPrice) return 0;
    return Math.round(((this.price - this.discountPrice) / this.price) * 100);
  }
}