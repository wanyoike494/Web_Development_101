// Map projection utilities for geographic data visualization

export interface ProjectionConfig {
  width: number;
  height: number;
  scale?: number;
  translate?: [number, number];
  center?: [number, number];
  precision?: number;
  clipAngle?: number;
}

export interface GeoPoint {
  type: 'Point';
  coordinates: [number, number];
}

export interface GeoFeature {
  type: 'Feature';
  geometry: any;
  properties: Record<string, any>;
}

// Common projection types
export type ProjectionType = 
  | 'mercator'
  | 'natural-earth'
  | 'robinson'
  | 'winkel-tripel'
  | 'equirectangular'
  | 'albers'
  | 'conic-equal-area'
  | 'azimuthal-equal-area'
  | 'orthographic';

// Projection factory functions
export const createProjection = (type: ProjectionType, config: ProjectionConfig) => {
  const { width, height } = config;
  
  switch (type) {
    case 'mercator':
      return createMercatorProjection(config);
    case 'natural-earth':
      return createNaturalEarthProjection(config);
    case 'robinson':
      return createRobinsonProjection(config);
    case 'winkel-tripel':
      return createWinkelTripelProjection(config);
    case 'equirectangular':
      return createEquirectangularProjection(config);
    case 'albers':
      return createAlbersProjection(config);
    case 'conic-equal-area':
      return createConicEqualAreaProjection(config);
    case 'azimuthal-equal-area':
      return createAzimuthalEqualAreaProjection(config);
    case 'orthographic':
      return createOrthographicProjection(config);
    default:
      return createMercatorProjection(config);
  }
};

// Individual projection implementations
const createMercatorProjection = (config: ProjectionConfig) => {
  const { width, height, scale = 1, translate = [0, 0], center = [0, 0] } = config;
  
  return {
    name: 'mercator',
    project: ([longitude, latitude]: [number, number]): [number, number] => {
      const lambda = (longitude * Math.PI) / 180;
      const phi = (latitude * Math.PI) / 180;
      
      const x = (width / 2) + (scale * 360 * (lambda + translate[0]) / (2 * Math.PI));
      const y = (height / 2) - (scale * 360 * Math.log(Math.tan(Math.PI / 4 + phi / 2)) / (2 * Math.PI)) + translate[1];
      
      return [x, y];
    },
    invert: ([x, y]: [number, number]): [number, number] => {
      const lambda = ((x - width / 2) / scale) * (2 * Math.PI) / 360 - translate[0];
      const phi = 2 * Math.atan(Math.exp(((height / 2 - y - translate[1]) / scale) * (2 * Math.PI) / 360)) - Math.PI / 2;
      
      return [
        (lambda * 180) / Math.PI,
        (phi * 180) / Math.PI,
      ];
    },
  };
};

const createNaturalEarthProjection = (config: ProjectionConfig) => {
  const { width, height, scale = 1 } = config;
  
  return {
    name: 'natural-earth',
    project: ([longitude, latitude]: [number, number]): [number, number] => {
      // Simplified Natural Earth projection
      const lambda = (longitude * Math.PI) / 180;
      const phi = (latitude * Math.PI) / 180;
      
      const x = (width / 2) + (scale * 360 * lambda) / (2 * Math.PI);
      const y = (height / 2) - (scale * 180 * phi) / Math.PI;
      
      return [x, y];
    },
    invert: ([x, y]: [number, number]): [number, number] => {
      const lambda = ((x - width / 2) / scale) * (2 * Math.PI) / 360;
      const phi = ((height / 2 - y) / scale) * Math.PI / 180;
      
      return [
        (lambda * 180) / Math.PI,
        (phi * 180) / Math.PI,
      ];
    },
  };
};

const createRobinsonProjection = (config: ProjectionConfig) => {
  const { width, height, scale = 1 } = config;
  
  return {
    name: 'robinson',
    project: ([longitude, latitude]: [number, number]): [number, number] => {
      // Simplified Robinson projection
      const lambda = (longitude * Math.PI) / 180;
      const phi = (latitude * Math.PI) / 180;
      
      const x = (width / 2) + (scale * 360 * lambda) / (2 * Math.PI);
      const y = (height / 2) - (scale * 180 * phi * (1 + Math.cos(phi))) / (2 * Math.PI);
      
      return [x, y];
    },
    invert: ([x, y]: [number, number]): [number, number] => {
      const lambda = ((x - width / 2) / scale) * (2 * Math.PI) / 360;
      // Simplified inverse - would need iterative solution for accuracy
      const phi = ((height / 2 - y) / scale) * Math.PI / 180;
      
      return [
        (lambda * 180) / Math.PI,
        (phi * 180) / Math.PI,
      ];
    },
  };
};

const createWinkelTripelProjection = (config: ProjectionConfig) => {
  const { width, height, scale = 1 } = config;
  
  return {
    name: 'winkel-tripel',
    project: ([longitude, latitude]: [number, number]): [number, number] => {
      const lambda = (longitude * Math.PI) / 180;
      const phi = (latitude * Math.PI) / 180;
      
      const x = (width / 2) + (scale * 360 * lambda) / (2 * Math.PI);
      const y = (height / 2) - (scale * 180 * phi) / Math.PI;
      
      return [x, y];
    },
    invert: ([x, y]: [number, number]): [number, number] => {
      const lambda = ((x - width / 2) / scale) * (2 * Math.PI) / 360;
      const phi = ((height / 2 - y) / scale) * Math.PI / 180;
      
      return [
        (lambda * 180) / Math.PI,
        (phi * 180) / Math.PI,
      ];
    },
  };
};

// Utility functions
export const getProjectionBounds = (projection: any, countries: GeoFeature[]): {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
} => {
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  
  countries.forEach(feature => {
    if (feature.geometry && feature.geometry.coordinates) {
      // This would need proper GeoJSON processing
      // For now, return reasonable bounds
    }
  });
  
  return {
    minX: minX === Infinity ? -180 : minX,
    maxX: maxX === -Infinity ? 180 : maxX,
    minY: minY === Infinity ? -90 : minY,
    maxY: maxY === -Infinity ? 90 : maxY,
  };
};

export const fitProjectionToFeatures = (
  projection: any,
  features: GeoFeature[],
  width: number,
  height: number
): { scale: number; translate: [number, number] } => {
  const bounds = getProjectionBounds(projection, features);
  
  const dx = bounds.maxX - bounds.minX;
  const dy = bounds.maxY - bounds.minY;
  
  const scale = Math.min(
    (width - 100) / dx,
    (height - 100) / dy
  ) * 0.8; // Add some padding
  
  const translate = [
    (width - scale * dx) / 2,
    (height + scale * dy) / 2
  ];
  
  return { scale, translate };
};

export const calculateDistance = (
  point1: [number, number],
  point2: [number, number],
  units: 'km' | 'miles' = 'km'
): number => {
  const R = units === 'km' ? 6371 : 3959; // Earth radius in km or miles
  const dLat = (point2[1] - point1[1]) * Math.PI / 180;
  const dLon = (point2[0] - point1[0]) * Math.PI / 180;
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(point1[1] * Math.PI / 180) * Math.cos(point2[1] * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(
    Math.sqrt(a),
    Math.sqrt(1 - a)
  );
  
  return R * c;
};

export const findCenter = (points: Array<[number, number]>): [number, number] => {
  const sumX = points.reduce((sum, [x]) => sum + x, 0);
  const sumY = points.reduce((sum, [, y]) => sum + y, 0);
  
  return [
    sumX / points.length,
    sumY / points.length,
  ];
};
