const EARTH_RADIUS = 6371;

type Coordinate = [number, number];

function degreeToRadian(degrees: number[]) {
  return degrees.map((d) => (d * Math.PI) / 180);
}

/**
 * 위도, 경도가 주어진 두 지점 사이의 거리(km)를 계산
 * @param coordinate1 위치1의 [위도(latitude), 경도(longitude)]
 * @param coordinate2 위치2의 [위도(latitude), 경도(longitude)]
 */
export default function calculateDistance(
  [Lat1, Lon1]: Coordinate,
  [Lat2, Lon2]: Coordinate
) {
  const [A1, B1, A2, B2] = degreeToRadian([Lat1, Lon1, Lat2, Lon2]);
  const dX = (B1 - B2) * Math.cos((A1 + A2) / 2);
  const dY = A1 - A2;

  return Math.floor(EARTH_RADIUS * Math.sqrt(dX ** 2 + dY ** 2));
}
