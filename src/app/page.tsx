import Link from "next/link";

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
}

const getCurrentSeasonRaces = async () => {
  const response = await fetch('https://api.jolpi.ca/ergast/f1/current/');
  const data = await response.json();

  return data.MRData.RaceTable.Races;
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
    <>
      <span>Is there a race this weekend?</span>
      <div>
        {isRaceWeekend() ? (
          <div>
            Yes, It&apos;s the: {nextRace.raceName}
            <div>
              <p>Race weekend details:</p>
              <p>{nextRace.date}</p>
              <p>{nextRace.time}</p>
              {nextRace.Sprint && <p>Psst...It&apos;s a sprint weekend</p>}
            </div>
          </div>
        ) : (
          <div>No, next race is the: {nextRace.raceName}</div>
        )}

        <p>Upcoming races</p>
        {upcomingRaces.map((race: Race) => (
          <Link key={race.round + race.raceName + race.season} href={`/race/${race.season}/${race.round}/${race.Circuit.circuitId}`}>
            <p>Round {race.round}</p>
            <p>{race.raceName}</p>
            <p>{race.date}</p>
            {race.Sprint && <p>Sprint weekend!</p>}
          </Link>
        ))}
        <p>Previous races this season:</p>
        {pastRaces.map((race: Race) => (
          <Link key={race.round + race.raceName + race.season} href={`/race/results/${race.season}/${race.round}/${race.Circuit.circuitId}`}>
            <p>Round {race.round}</p>
            <p>{race.raceName}</p>
            <p>{race.date}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
