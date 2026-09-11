import type { Plant, Category } from '../types/plant';
import { MOCK_PLANTS } from '../data/mockPlants';

export const plantService = {
  getAllPlants: (): Plant[] => {
    return MOCK_PLANTS;
  },

  getPlantById: (id: string): Plant | undefined => {
    return MOCK_PLANTS.find((p) => p.id === id);
  },

  getPlantsByCategory: (category: Category): Plant[] => {
    return MOCK_PLANTS.filter((p) => p.category === category);
  },

  getPopularPlants: (): Plant[] => {
    return MOCK_PLANTS.filter((p) => p.isPopular);
  }
};