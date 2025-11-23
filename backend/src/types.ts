export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Subcategory {
  id: number;
  category_id: number;
  name: string;
  description?: string;
}

export interface Dua {
  id: number;
  subcategory_id?: number;
  title: string;
  arabic?: string;
  transliteration?: string;
  translation?: string;
  reference?: string;
  tags?: string; // comma separated
}
