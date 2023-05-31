/* eslint-disable no-loop-func */
import { endOfMonth, endOfWeek, format, isSameMonth, isSameDay, startOfMonth, startOfWeek, addDays, parse } from "date-fns";
import Schedule from "./Schedule";

import { useEffect, useState } from "react";

const Body = ({ currentMonth, selectedDate }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    const [isScheduleVisible, setIsScheduleVisible] = useState(0);
    const [hasSchedule, setHasSchedule] = useState([]);

    const handleScheduleVisible = (e) => {
        setIsScheduleVisible(e.currentTarget.getAttribute('value'));
    }

    useEffect(() => {
        const scheduleData = JSON.parse(localStorage.getItem('has-schedule'));

        if (scheduleData?.length) {
            setHasSchedule(scheduleData);
        }
    }, []);

    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'd');

            days.push(
                <div
                    className={`day-${
                        !isSameMonth(day, monthStart)
                        ? 'disabled'
                        : isSameDay(day, selectedDate)
                        ? 'selected'
                        : format(currentMonth, 'M') !== format(day, 'M')
                        ? 'not-valid'
                        : 'valid'
                    } day_${i}`}
                    key={day}
                    value={format(day, 'M/d')}
                    onClick={handleScheduleVisible}
                >
                    <span
                        className={[
                            format(currentMonth, 'M') !== format(day, 'M') 
                            ? 'text-not-valid' 
                            : 'text-valid',
                            Array.isArray(hasSchedule) && hasSchedule?.find((scheduleItem) => scheduleItem?.month === parseInt(format(day, 'M')) && scheduleItem?.day === parseInt(format(day, 'd')))
                            ? 'text-schedule-on'
                            : 'text-schedule-off'
                        ].join(' ')}
                    >
                        {formattedDate}
                    </span>
                </div>
            )

            day = addDays(day, 1);
        }
        
        rows.push(
            <div className='row' key={day}>
                {days}
            </div>
        )
        days = [];
    }


    return (
        <div className='Body'>
            {rows}
            { isScheduleVisible !== 0 ? (
                <Schedule
                    isScheduleVisible={isScheduleVisible} 
                    setIsScheduleVisible={setIsScheduleVisible}
                    setHasSchedule={setHasSchedule}
                    hasSchedule={hasSchedule}
                    currentMonth={currentMonth}
                />
            ) : null }
        </div>
    )
}

export default Body;