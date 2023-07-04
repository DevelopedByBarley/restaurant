import { useEffect, useState } from "react";
import { ToggleButton } from "react-bootstrap";
import { ReservationForm } from "./ReservationForm";

export function Intervals({ reservation, freeIntervals, setFreeIntervals }) {
  const [selectedInterval, setSelectedInterval] = useState(null);

  const handleIntervalSelect = (interval) => {
    setSelectedInterval(interval);
  };

  useEffect(() => {
    if (localStorage.getItem('freeIntervals') !== null) {
      setFreeIntervals(JSON.parse(localStorage.getItem("freeIntervals")))
    }
  }, [setFreeIntervals])

  return (
    <>
      <div className="mt-2 text-center">
        <h3 className="mb-5 mt-5">Foglalható időpontok</h3>
        {freeIntervals?.map((interval, index) => (

          <ToggleButton
            className="m-1"
            key={index}
            type="radio"
            variant="outline-primary"
            name="interval"
            value={interval.from}
            checked={selectedInterval && selectedInterval.from === interval.from}
            onClick={() => handleIntervalSelect(interval)}
          >
            {interval.fromInHour}
          </ToggleButton>

        ))}
      </div>
      <div>
        {selectedInterval && <ReservationForm selectedInterval={selectedInterval} numOfGuests={reservation.numOfGuests} interval={reservation.interval} />}
      </div>
    </>
  );
}