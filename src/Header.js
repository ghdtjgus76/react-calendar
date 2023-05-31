import { addMonths, format, subMonths } from "date-fns";

const Header = ({ currentMonth, setCurrentMonth }) => {
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    }
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    }

    return (
        <div className='Header'>
            <div className='left-col'>
                <div className='current-month'>
                    {format(currentMonth, 'M')}월
                </div>
                <div className='current-year'>
                    {format(currentMonth, 'yyyy')}
                </div>
            </div>
            <div className='right-col'>
                <button 
                    className='month-button prev-month-button'
                    onClick={prevMonth}
                >
                    {'<'}
                </button>
                <button 
                    className='month-button next-month-button'
                    onClick={nextMonth}
                >
                    {'>'}
                </button>
            </div>
        </div>
    )
}

export default Header;