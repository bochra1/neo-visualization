export interface NearEarthObject {
    id: string;
    name: string;
    estimated_diameter_min: number ;
    estimated_diameter_max: number;
    estimated_diameter_avg: number;
    orbiting_body: string
  }
  export  interface ApiResponse {
    near_earth_objects: Array<{
      id: string;
      name: string;
      estimated_diameter: {
        kilometers: {
          estimated_diameter_min: number;
          estimated_diameter_max: number;
        };
      };
      close_approach_data?: Array<{
        orbiting_body: string;
      }>;
    }>;
  }