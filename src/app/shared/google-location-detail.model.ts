export interface GoogleLocationDetail {
  result: {
    geometry: {
      location: {
        lat: string;
        lng: string;
      }
    }
  };
}
