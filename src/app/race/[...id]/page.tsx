import Link from 'next/link';

const getRace = async (year: string, round: string) => {
  const response = await fetch(
    `https://api.jolpi.ca/ergast/f1/${year}/${round}/races`
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
  const [year, round] = id;
  const race = await getRace(year, round);

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
          First practice: {race.FirstPractice.date} at {race.FirstPractice.time}
        </p>
        {race.SecondPractice && (
          <p>
            Second practice: {race.SecondPractice.date} at{' '}
            {race.SecondPractice.time}
          </p>
        )}
        {race.ThirdPractice && (
          <p>
            Third practice: {race.ThirdPractice.date} at{' '}
            {race.ThirdPractice.time}
          </p>
        )}
        {race.SprintQualifying && (
          <p>
            Sprint qualifying: {race.SprintQualifying.date} at{' '}
            {race.SprintQualifying.time}
          </p>
        )}
        {race.Sprint && (
          <p>
            Sprint race: {race.Sprint.date} at {race.Sprint.time}
          </p>
        )}
        <p>
          Qualifying: {race.Qualifying.date} at {race.Qualifying.time}
        </p>
        <p>
          Race: {race.date} at {race.time}
        </p>
      </div>
    </>
  );
}
