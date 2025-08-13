import { Building } from './type';
import { EA } from './EA';
import { E1 } from './E1';
import { E1A } from './E1A';
import { E2 } from './E2';
import { E2A } from './E2A';
import { E3 } from './E3';
import { E4 } from './E4';
import { Techno_Edge } from './Techno_Edge';

export const buildingData: Record<string, Building> = {
  EA,
  E1,
  E1A,
  E2,
  E2A,
  E3,
  E4,
  TECHNO_EDGE: Techno_Edge,
};
