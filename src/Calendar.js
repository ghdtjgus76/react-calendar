import { useState } from 'react';

import Header from './Header';
import Days from './Days';
import Body from './Body';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());

    return (
        <div className='calendar'>
            <Header
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
            />
            <Days />
            <Body 
                currentMonth={currentMonth}
                selectedDate={selectedDate}
            />
        </div>
    )
}

export default Calendar;