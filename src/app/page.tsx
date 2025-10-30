import Link from 'next/link';

import { getCurrentSeasonRaces } from './_lib/raceData';
import { formatDate } from '@/app/_utils/formatDate';
import { formatDateTime } from './_utils/formatDateTime';

type Race = {
  date: string;
  raceName: string;
  round: number;
  season: string;
  Sprint: object;
  Circuit: Circuit;
};

type Circuit = {
  circuitId: string;
};

export default async function Home() {
  const races = await getCurrentSeasonRaces();

  const now = Date.now();

  const upcomingRaces = races?.filter(
    (race: Race) => Date.parse(race.date) - now > 0
  );
  const nextRace = upcomingRaces[0];
  const pastRaces = races?.slice(0, races.length - upcomingRaces.length);

  const isRaceWeekend = () => {
    return Date.parse(nextRace.date) - now < 604800000; // 7 days in milliseconds
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-10 w-full md:max-w-180 lg:max-w-210 h-50vh m-auto py-8 px-8 text-center">
        <span className="text-4xl">Is there a race this weekend?</span>
        <div className="text-xl flex flex-col gap-4">
          {isRaceWeekend() ? (
            <div>
              <div className="text-xl flex flex-col gap-4">
                Yes, It&apos;s the:
                <p className="text-2xl">{nextRace.raceName}</p>
              </div>
            </div>
          ) : (
            <div className="text-xl flex flex-col gap-4">
              No, next race is the:
              <p className="text-2xl">{nextRace.raceName}</p>
            </div>
          )}
          <div className="text-xl flex flex-col">
            <p>{formatDateTime(nextRace.date, nextRace.time)}</p>
            {nextRace.Sprint && <p>Psst...it&apos;s a sprint weekend</p>}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full py-4 px-8 md:max-w-170 lg:max-w-180 m-auto">
        <p className="text-xl">Upcoming races</p>
        {upcomingRaces.map((race: Race) => (
          <Link
            key={race.round + race.raceName + race.season}
            href={`/race/${race.season}/${race.round}/${race.Circuit.circuitId}`}
          >
            <p className="font-semibold">Round {race.round}</p>
            <p>{race.raceName}</p>
            <p>{formatDate(race.date)}</p>
            {race.Sprint && <p>Sprint weekend!</p>}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-3 w-full py-4 px-8 md:max-w-170 lg:max-w-180 m-auto">
        <p className="text-xl">Previous races this season:</p>
        {pastRaces.map((race: Race) => (
          <Link
            key={race.round + race.raceName + race.season}
            href={`/race/results/${race.season}/${race.round}/${race.Circuit.circuitId}`}
          >
            <p className="font-semibold">Round {race.round}</p>
            <p>{race.raceName}</p>
            <p>{formatDate(race.date)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
