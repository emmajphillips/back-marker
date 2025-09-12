import Link from 'next/link';

import { getRace } from '@/app/_lib/raceData';
import { formatDateTime } from '@/app/_utils/formatDateTime';

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

export default async function Race({
  params,
}: {
  params: Promise<{ id: Array<string> }>;
}) {
  const { id } = await params;
  const [season, round, circuit] = id;
  const raceWithResults = await getRace(season, round, true);

  return (
    <>
      <Link href={'/'}>Back</Link>
      <p>{raceWithResults.raceName}</p>
      <p>{formatDateTime(raceWithResults.date, raceWithResults.time)}</p>
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
