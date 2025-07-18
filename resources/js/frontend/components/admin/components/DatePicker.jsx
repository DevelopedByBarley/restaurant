import { useEffect, useRef, useState } from "react";

export default function DatePicker({ date, setDate, handleDateChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(date || null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(true);
  const daysContainerRef = useRef(null);

  useEffect(() => {
    if (daysContainerRef.current) {
      renderCalendar();
    }
  }, [currentDate, isCalendarOpen, selectedDate]);

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysContainer = daysContainerRef.current;
    if (!daysContainer) return;

    daysContainer.innerHTML = "";

    // Hétfővel kezdődik (0 = vasárnap, 1 = hétfő)
    const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    for (let i = 0; i < startDay; i++) {
      const emptyDiv = document.createElement("div");
      daysContainer.appendChild(emptyDiv);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDiv = document.createElement("div");
      dayDiv.className =
        "flex h-[38px] w-[38px] items-center justify-center rounded-[7px] border-[.5px] border-transparent text-dark hover:border-indigo-400 hover:bg-indigo-50 sm:h-[46px] sm:w-[47px] dark:text-white dark:hover:border-dark-3 dark:hover:bg-dark mb-2 cursor-pointer";
      dayDiv.textContent = i.toString();

      // Kiválasztott nap kiemelése
      const dayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      if (selectedDate === dayStr) {
        dayDiv.classList.add("bg-indigo-600", "text-white", "dark:text-white");
      }

      dayDiv.addEventListener("click", () => {
        setSelectedDate(dayStr);
        setDate(dayStr);
        if (handleDateChange) handleDateChange({ target: { value: dayStr } });
      });
      daysContainer.appendChild(dayDiv);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const d = new Date(prevDate);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const d = new Date(prevDate);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  const handleCancel = () => {
    setIsCalendarOpen(false);
  };

  const handleToggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <section className="bg-white py-4 dark:bg-dark">
      <div className="container">
        <div className="mx-auto w-full">
          <div className="relative mb-3">
            <input
              id="datepicker"
              type="text"
              placeholder="Válassz dátumot"
              className="h-12 w-full appearance-none rounded-lg border border-gray-300 bg-white pl-12 pr-4 text-dark outline-none focus:border-indigo-600 dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              value={selectedDate || ""}
              readOnly
              onClick={handleToggleCalendar}
            />
            <span
              id="toggleDatepicker"
              onClick={handleToggleCalendar}
              className="absolute inset-y-0 flex h-12 w-12 items-center justify-center text-dark-5"
            >
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                {/* ...icon path... */}
                <path d="M18 3.3125H16.3125V2.625C16.3125 2.25 16 1.90625 15.5937 1.90625C15.1875 1.90625 14.875 2.21875 14.875 2.625V3.28125H6.09375V2.625C6.09375 2.25 5.78125 1.90625 5.375 1.90625C4.96875 1.90625 4.65625 2.21875 4.65625 2.625V3.28125H3C1.9375 3.28125 1.03125 4.15625 1.03125 5.25V16.125C1.03125 17.1875 1.90625 18.0938 3 18.0938H18C19.0625 18.0938 19.9687 17.2187 19.9687 16.125V5.25C19.9687 4.1875 19.0625 3.3125 18 3.3125Z" fill="currentColor"/>
              </svg>
            </span>
          </div>

          {isCalendarOpen && (
            <div className="flex w-full flex-col rounded-xl bg-white p-4 shadow-four sm:p-[30px] dark:bg-dark-2 dark:shadow-box-dark">
              <div className="flex items-center justify-between pb-4">
                <button
                  className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[7px] border-[.5px] border-gray-300 bg-gray-100 text-dark hover:border-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 sm:h-[46px] sm:w-[46px] dark:border-dark-3 dark:bg-dark dark:text-white"
                  onClick={handlePrevMonth}
                >
                  {/* balra nyíl */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M16.2375 21.4875C16.0125 21.4875 15.7875 21.4125 15.6375 21.225L7.16249 12.6C6.82499 12.2625 6.82499 11.7375 7.16249 11.4L15.6375 2.77498C15.975 2.43748 16.5 2.43748 16.8375 2.77498C17.175 3.11248 17.175 3.63748 16.8375 3.97498L8.96249 12L16.875 20.025C17.2125 20.3625 17.2125 20.8875 16.875 21.225C16.65 21.375 16.4625 21.4875 16.2375 21.4875Z" />
                  </svg>
                </button>
                <span className="text-xs font-medium capitalize text-dark dark:text-white">
                  {currentDate.toLocaleDateString("hu-HU", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[7px] border-[.5px] border-gray-300 bg-gray-100 text-dark hover:border-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 sm:h-[46px] sm:w-[46px] dark:border-dark-3 dark:bg-dark dark:text-white"
                  onClick={handleNextMonth}
                >
                  {/* jobbra nyíl */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7.7625 21.4875C7.5375 21.4875 7.35 21.4125 7.1625 21.2625C6.825 20.925 6.825 20.4 7.1625 20.0625L15.0375 12L7.1625 3.97498C6.825 3.63748 6.825 3.11248 7.1625 2.77498C7.5 2.43748 8.025 2.43748 8.3625 2.77498L16.8375 11.4C17.175 11.7375 17.175 12.2625 16.8375 12.6L8.3625 21.225C8.2125 21.375 7.9875 21.4875 7.7625 21.4875Z" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-7 justify-between text-center pb-2 pt-4 text-xs font-medium capitalize text-body-color dark:text-dark-6">
                <span>H</span>
                <span>K</span>
                <span>Sze</span>
                <span>Cs</span>
                <span>P</span>
                <span>Sz</span>
                <span>V</span>
              </div>
              <div
                ref={daysContainerRef}
                id="days-container"
                className="grid grid-cols-7 text-center text-xs font-medium"
              >
                {/* Days will be rendered here */}
              </div>
             
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
