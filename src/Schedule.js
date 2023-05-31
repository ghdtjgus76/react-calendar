import { useEffect, useRef, useState } from "react";

import format from "date-fns/format";

const Schedule = ({ isScheduleVisible, setIsScheduleVisible, setHasSchedule, hasSchedule, currentMonth }) => {
    const [schedules, setSchedules] = useState([]);
    const [schedule, setSchedule] = useState('');

    const month = isScheduleVisible[0];
    const day = isScheduleVisible.slice(2);

    const modalOutside = useRef();

    useEffect(() => {
        const schedulesDataStr = localStorage.getItem(`schedules_${month}_${day}`);

        if (schedulesDataStr) {
            const scheduleDataArray = schedulesDataStr.split(',');

            setSchedules(scheduleDataArray);
        }
    }, []);

    useEffect(() => {
        if (hasSchedule?.length) {
            localStorage.setItem(`has-schedule`, JSON.stringify(hasSchedule));
        }
    }, [hasSchedule]);

    useEffect(() => {
        if (schedules.length) {
            localStorage.setItem(`schedules_${month}_${day}`, schedules);
        }
    }, [schedules]);
    
    const handleModalVisibleOutside = (e) => {
        if (modalOutside.current === e.target) {
            setIsScheduleVisible(0);
        }
    }

    const handleModalVisible = () => {
        setIsScheduleVisible(0);
    }

    const handleSchedule = (e) => {
        setSchedule(e.target.value);
    }

    const onCreateNewSchedule = () => {
        if (format(currentMonth, 'M') !== month) {
            alert(`현재는 ${format(currentMonth, 'M')}월입니다. ${format(currentMonth, 'M')}월에 속한 날에 대한 일정만 추가할 수 있습니다.`);
            return;
        }


        if (schedule.length) {
            setSchedules((prevSchedules) => [...prevSchedules, schedule]);
            setSchedule('');

            setHasSchedule([...(hasSchedule), {
                month: parseInt(month), 
                day: parseInt(day)
            }]);
            
        }
    }
    
    return (
        <div className='schedule-background' 
            ref={modalOutside} 
            onClick={handleModalVisibleOutside}
        >
            <div className='Schedule'>
                <h1>{month}월 {day}일 일정</h1>
                <button
                    className='modal-close-button'
                    onClick={handleModalVisible}
                >
                    X
                </button>
                <div className='new-schedule-wrapper'>
                    <input
                        type='text'
                        className='new-schedule-input' 
                        required
                        value={schedule}
                        onChange={handleSchedule}
                    />
                    <button 
                        className='new-schedule-button'
                        onClick={onCreateNewSchedule}
                    >
                        일정 추가하기
                    </button>
                </div>
                <ul className='schedule-item-wrapper'>
                    {schedules.map((scheduleItem, idx) => (
                        <li
                            className='schedule-item'
                            key={idx}    
                        >
                            {scheduleItem}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Schedule;