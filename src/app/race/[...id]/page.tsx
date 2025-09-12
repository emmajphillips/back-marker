import Link from 'next/link';

import { getRace } from '@/app/_lib/raceData';
import { formatDate } from '@/app/_utils/formatDate';
import { formatDateTime } from '@/app/_utils/formatDateTime';

export default async function Race({
  params,
}: {
  params: Promise<{ id: Array<string> }>;
}) {
  const { id } = await params;
  const [season, round] = id;
  const race = await getRace(season, round);

  return (
    <>
      <Link href={'/'}>Back</Link>
      <h1>{race.raceName}</h1>
      <p>{race.Circuit.circuitName}</p>
      <p>
        {race.Circuit.Location.locality}, {race.Circuit.Location.country}
      </p>
      <p>{race.Sprint && 'Sprint weekend'}</p>
      <div>
        Weekend schedule:
        <p>
          First practice:{' '}
          {formatDateTime(race.FirstPractice.date, race.FirstPractice.time)}
        </p>
        {race.SecondPractice && (
          <p>
            Second practice:{' '}
            {formatDateTime(race.SecondPractice.date, race.SecondPractice.time)}
          </p>
        )}
        {race.ThirdPractice && (
          <p>
            Third practice:{' '}
            {formatDateTime(race.ThirdPractice.date, race.ThirdPractice.time)}
          </p>
        )}
        {race.SprintQualifying && (
          <p>
            Sprint qualifying:{' '}
            {formatDateTime(
              race.SprintQualifying.date,
              race.SprintQualifying.time
            )}
          </p>
        )}
        {race.Sprint && (
          <p>
            Sprint race: {formatDateTime(race.Sprint.date, race.Sprint.time)}
          </p>
        )}
        <p>
          Qualifying:{' '}
          {formatDateTime(race.Qualifying.date, race.Qualifying.time)}
        </p>
        <p>Race: {formatDateTime(race.date, race.time)}</p>
      </div>
    </>
  );
}
