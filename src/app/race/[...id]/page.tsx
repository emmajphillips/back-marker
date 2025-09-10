import Link from 'next/link';

import { getRace } from '@/app/_lib/raceData';
import { formatDate } from '@/app/_utils/formatDate';

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
          First practice: {formatDate(race.FirstPractice.date)} at{' '}
          {race.FirstPractice.time}
        </p>
        {race.SecondPractice && (
          <p>
            Second practice: {formatDate(race.SecondPractice.date)} at{' '}
            {race.SecondPractice.time}
          </p>
        )}
        {race.ThirdPractice && (
          <p>
            Third practice: {formatDate(race.ThirdPractice.date)} at{' '}
            {race.ThirdPractice.time}
          </p>
        )}
        {race.SprintQualifying && (
          <p>
            Sprint qualifying: {formatDate(race.SprintQualifying.date)} at{' '}
            {race.SprintQualifying.time}
          </p>
        )}
        {race.Sprint && (
          <p>
            Sprint race: {formatDate(race.Sprint.date)} at {race.Sprint.time}
          </p>
        )}
        <p>
          Qualifying: {formatDate(race.Qualifying.date)} at{' '}
          {race.Qualifying.time}
        </p>
        <p>
          Race: {formatDate(race.date)} at {race.time}
        </p>
      </div>
    </>
  );
}
