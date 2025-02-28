
export type Skill = {
  id: string;
  name: string;
  category: string;
  description: string;
  connections: string[];
  position?: { x: number; y: number };
};
