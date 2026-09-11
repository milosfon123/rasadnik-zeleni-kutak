export type Category = 'sobne' | 'spoljasnje' | 'voce' | 'saksije';
export type LightRequirement = 'direktno' | 'indirektno' | 'sena';
export type WaterRequirement = 'retko' | 'umereno' | 'cesto';

export interface Plant {
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
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  date: string;
  status: 'U obradi' | 'Isporučeno' | 'Otkazano';
}