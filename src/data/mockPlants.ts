import type { Plant } from '../types/plant';

export const MOCK_PLANTS: Plant[] = [
  {
    id: '1',
    name: 'Fikus Lirata',
    latinName: 'Ficus lyrata',
    category: 'ukrasno',
    price: 3200,
    discountPrice: 2800,
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=600',
    description: 'Popularna sobna biljka sa velikim, sjajnim listovima u obliku violine.',
    light: 'indirektno',
    water: 'umereno',
    temperature: '18-25°C',
    isPopular: true,
    inStock: true
  },
  {
    id: '2',
    name: 'Lavanda',
    latinName: 'Lavandula angustifolia',
    category: 'zacinsko',
    price: 850,
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80&w=600',
    description: 'Aromatična višegodišnja biljka prepoznatljivog mirisa i ljubičastih cvetova.',
    light: 'direktno',
    water: 'retko',
    temperature: '15-30°C',
    isPopular: true,
    inStock: true
  },
  {
    id: '3',
    name: 'Patuljasta Jabuka',
    latinName: 'Malus domestica',
    category: 'vocne',
    price: 2100,
    discountPrice: 1800,
    image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?auto=format&fit=crop&q=80&w=600',
    description: 'Idealna voćka za terase i male bašte. Daje ukusne plodove u jesen.',
    light: 'direktno',
    water: 'cesto',
    temperature: '10-25°C',
    isPopular: false,
    inStock: true
  }
];