export const getPlanetImage = (url: string): string => {
  const planetId = url.slice(0, -1).split('/').pop();
  return `https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`;
};
