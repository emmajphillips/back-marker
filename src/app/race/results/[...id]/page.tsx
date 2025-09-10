import Link from 'next/link';

import { formatDate } from '@/app/_utils/formatDate';

type RaceResult = {
  position: string;
  status: string;
  points: string;
  Driver: Driver;
};

type Driver = {
  givenName: string;
  familyName: string;
};

const getRaceWithResults = async (year: string, round: string) => {
  const response = await fetch(
    `https://api.jolpi.ca/ergast/f1/${year}/${round}/results`
  );
  const data = await response.json();

  return data.MRData.RaceTable.Races[0];
};

export default async function Race({
  params,
}: {
  params: Promise<{ id: Array<string> }>;
}) {
  const { id } = await params;
  const [season, round, circuit] = id;
  const raceWithResults = await getRaceWithResults(season, round);

  return (
    <>
      <Link href={'/'}>Back</Link>
      <p>{raceWithResults.raceName}</p>
      <p>{formatDate(raceWithResults.date)}</p>
      <p>RACE RESULTS</p>
      {raceWithResults.Results.map((result: RaceResult) => (
        <div key={round + circuit + season + result.Driver.givenName}>
          <p>{result.position}</p>
          <p>
            {result.Driver.givenName} {result.Driver.familyName}
          </p>
          {result.status !== 'Finished' && <p>{result.status}</p>}
          {Number(result.points) > 0 && <p>Points: {result.points}</p>}
        </div>
      ))}
    </>
  );
}
