import { WasteItem } from '../types';

export const wasteItems: WasteItem[] = [
  // Wet Waste (Green Bin)
  {
    id: 'apple-core',
    name: 'Apple Core',
    type: 'wet',
    icon: '🍎',
    explanation: 'Fruit peels and cores decompose naturally and make great compost.'
  },
  {
    id: 'banana-peel',
    name: 'Banana Peel',
    type: 'wet',
    icon: '🍌',
    explanation: 'Banana peels are rich in nutrients and perfect for composting.'
  },
  {
    id: 'vegetable-scraps',
    name: 'Vegetable Scraps',
    type: 'wet',
    icon: '🥕',
    explanation: 'All vegetable waste can be composted to create nutrient-rich soil.'
  },
  {
    id: 'tea-bags',
    name: 'Tea Bags',
    type: 'wet',
    icon: '🫖',
    explanation: 'Tea bags and leaves are biodegradable organic matter.'
  },
  {
    id: 'rice',
    name: 'Leftover Rice',
    type: 'wet',
    icon: '🍚',
    explanation: 'Food leftovers are organic waste that decomposes naturally.'
  },
  {
    id: 'bread',
    name: 'Bread Crumbs',
    type: 'wet',
    icon: '🍞',
    explanation: 'Bread and other food scraps are organic waste.'
  },

  // Dry Waste (Blue Bin)
  {
    id: 'plastic-bottle',
    name: 'Plastic Bottle',
    type: 'dry',
    icon: '🍼',
    explanation: 'Plastic bottles can be recycled into new products.'
  },
  {
    id: 'newspaper',
    name: 'Newspaper',
    type: 'dry',
    icon: '📰',
    explanation: 'Paper products can be recycled to make new paper.'
  },
  {
    id: 'cardboard',
    name: 'Cardboard Box',
    type: 'dry',
    icon: '📦',
    explanation: 'Cardboard is recyclable and should go in the dry waste bin.'
  },
  {
    id: 'glass-jar',
    name: 'Glass Jar',
    type: 'dry',
    icon: '🫙',
    explanation: 'Glass containers can be recycled indefinitely without losing quality.'
  },
  {
    id: 'aluminum-can',
    name: 'Aluminum Can',
    type: 'dry',
    icon: '🥤',
    explanation: 'Aluminum cans are highly recyclable and valuable.'
  },
  {
    id: 'clothes',
    name: 'Old Clothes',
    type: 'dry',
    icon: '👕',
    explanation: 'Textiles can be recycled or donated for reuse.'
  },

  // Toxic Waste (Red Bin)
  {
    id: 'battery',
    name: 'Battery',
    type: 'toxic',
    icon: '🔋',
    explanation: 'Batteries contain harmful chemicals and need special disposal.'
  },
  {
    id: 'light-bulb',
    name: 'CFL Bulb',
    type: 'toxic',
    icon: '💡',
    explanation: 'CFL bulbs contain mercury and require hazardous waste disposal.'
  },
  {
    id: 'paint-can',
    name: 'Paint Can',
    type: 'toxic',
    icon: '🎨',
    explanation: 'Paint contains toxic chemicals that can harm the environment.'
  },
  {
    id: 'medicine',
    name: 'Expired Medicine',
    type: 'toxic',
    icon: '💊',
    explanation: 'Medicines can contaminate water and soil if not disposed properly.'
  },
  {
    id: 'phone',
    name: 'Old Phone',
    type: 'toxic',
    icon: '📱',
    explanation: 'Electronic devices contain toxic materials and precious metals.'
  },
  {
    id: 'cleaning-spray',
    name: 'Cleaning Spray',
    type: 'toxic',
    icon: '🧴',
    explanation: 'Chemical cleaners are hazardous and need special disposal.'
  }
];