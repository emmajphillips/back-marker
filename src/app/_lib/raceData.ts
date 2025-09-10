export const getCurrentSeasonRaces = async () => {
  const response = await fetch('https://api.jolpi.ca/ergast/f1/current/');
  const data = await response.json();

  return data.MRData.RaceTable.Races;
};

export const getRace = async (
  season: string,
  round: string,
  withResults: boolean = false
) => {
  const response = await fetch(
    `https://api.jolpi.ca/ergast/f1/${season}/${round}/${
      withResults ? 'results' : 'races'
    }`
  );
  const data = await response.json();

  return data.MRData.RaceTable.Races[0];
};
