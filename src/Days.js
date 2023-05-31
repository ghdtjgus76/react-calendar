const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Days = () => {
    return (
        <div className='Days'>
            <ul className='days-list'>
                {days.map((day, idx) => (
                    <li 
                        key={idx}
                        className={`days days_${idx}`}
                    >
                        {day}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Days;