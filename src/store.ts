import create from 'zustand';
import { addDays, subDays } from 'date-fns';

export interface BowelEntry {
  id: string;
  date: Date;
  type: 'rabbit' | 'goat' | 'cow' | 'seagull';
  color: string;
  experience: 'excellent' | 'good' | 'difficult' | 'very_difficult';
  characteristics: {
    blood: boolean;
    floating: boolean;
    mucus: boolean;
    gas: boolean;
  };
  notes?: string;
}

// Generar datos de prueba para un mes
const generateTestData = (): BowelEntry[] => {
  const today = new Date();
  const testData: BowelEntry[] = [];
  
  // Caso 1: Sangre en las heces (últimos 3 días)
  testData.push({
    id: '1',
    date: subDays(today, 2),
    type: 'cow',
    color: 'darkBrown',
    experience: 'difficult',
    characteristics: {
      blood: true,
      floating: false,
      mucus: false,
      gas: false
    }
  });

  testData.push({
    id: '2',
    date: subDays(today, 1),
    type: 'cow',
    color: 'darkBrown',
    experience: 'very_difficult',
    characteristics: {
      blood: true,
      floating: false,
      mucus: true,
      gas: false
    }
  });

  // Caso 2: Estreñimiento (3 días seguidos de tipo rabbit)
  testData.push({
    id: '3',
    date: subDays(today, 6),
    type: 'rabbit',
    color: 'brown',
    experience: 'difficult',
    characteristics: {
      blood: false,
      floating: false,
      mucus: false,
      gas: true
    }
  });

  testData.push({
    id: '4',
    date: subDays(today, 5),
    type: 'rabbit',
    color: 'brown',
    experience: 'very_difficult',
    characteristics: {
      blood: false,
      floating: false,
      mucus: false,
      gas: true
    }
  });

  testData.push({
    id: '5',
    date: subDays(today, 4),
    type: 'rabbit',
    color: 'darkBrown',
    experience: 'difficult',
    characteristics: {
      blood: false,
      floating: false,
      mucus: false,
      gas: true
    }
  });

  // Caso 3: Diarrea (3 días de tipo seagull)
  testData.push({
    id: '6',
    date: subDays(today, 3),
    type: 'seagull',
    color: 'yellow',
    experience: 'difficult',
    characteristics: {
      blood: false,
      floating: false,
      mucus: true,
      gas: true
    }
  });

  testData.push({
    id: '7',
    date: subDays(today, 2),
    type: 'seagull',
    color: 'yellow',
    experience: 'very_difficult',
    characteristics: {
      blood: false,
      floating: false,
      mucus: true,
      gas: true
    }
  });

  testData.push({
    id: '8',
    date: subDays(today, 1),
    type: 'seagull',
    color: 'yellow',
    experience: 'difficult',
    characteristics: {
      blood: false,
      floating: false,
      mucus: true,
      gas: true
    }
  });

  // Días normales distribuidos en el mes
  const normalTypes = ['goat', 'cow'];
  const normalColors = ['brown', 'darkBrown'];
  const normalExperiences = ['excellent', 'good'];

  for (let i = 30; i > 7; i--) {
    if (i % 2 === 0) { // Agregar entradas en días alternos para datos normales
      const randomType = normalTypes[Math.floor(Math.random() * normalTypes.length)] as 'goat' | 'cow';
      const randomColor = normalColors[Math.floor(Math.random() * normalColors.length)];
      const randomExperience = normalExperiences[Math.floor(Math.random() * normalExperiences.length)] as 'excellent' | 'good';

      testData.push({
        id: `normal-${i}`,
        date: subDays(today, i),
        type: randomType,
        color: randomColor,
        experience: randomExperience,
        characteristics: {
          blood: false,
          floating: Math.random() > 0.7,
          mucus: false,
          gas: Math.random() > 0.7
        }
      });
    }
  }

  return testData;
};

interface Store {
  entries: BowelEntry[];
  isPrivateMode: boolean;
  addEntry: (entry: Omit<BowelEntry, 'id'>) => void;
  deleteEntry: (id: string) => void;
  togglePrivateMode: () => void;
}

export const useStore = create<Store>((set) => ({
  entries: generateTestData(),
  isPrivateMode: false,
  addEntry: (entry) =>
    set((state) => ({
      entries: [
        ...state.entries,
        {
          ...entry,
          id: Math.random().toString(36).substr(2, 9),
        },
      ],
    })),
  deleteEntry: (id) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    })),
  togglePrivateMode: () =>
    set((state) => ({
      isPrivateMode: !state.isPrivateMode,
    })),
}));