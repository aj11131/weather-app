export function bearingToDirection(bearing: number){
  if ((bearing >= 0 && bearing < 23) || (bearing >= 338 && bearing <= 360)) {
    return 'N';
  } else if ( bearing >= 23 && bearing < 113) {
    return 'NE';
  } else if ( bearing >= 113 && bearing < 158) {
    return 'SE';
  } else if ( bearing >= 158 && bearing < 203 ) {
    return 'S';
  } else if ( bearing >= 203 && bearing < 248 ) {
    return 'SW';
  } else if ( bearing >= 248 && bearing < 293 ) {
    return 'W';
  } else if ( bearing >= 293 && bearing < 338 ) {
    return 'NW';
  } else {
    return '';
  }
}
