import React, { useState } from 'react';
import styles from './CalendarPage.module.css';
import SideNav from '../components/Layout/SideNav';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi';

// Dati di esempio per gli eventi
const events = [
  { date: new Date(2025, 4, 31), title: 'Exam: Analisi I', type: 'exam' },
  { date: new Date(2025, 5, 1), title: 'Submit: Essay', type: 'deadline' },
  { date: new Date(2025, 5, 3), title: 'Group Meeting', type: 'event' },
  { date: new Date(2025, 5, 12), title: 'Lezione Diritto', type: 'event' },
];

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 1)); // Maggio 2025

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Lunedì
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className={styles.pageGrid}>
      <SideNav />
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <div className={styles.dateControls}>
            <button onClick={prevMonth}><FiChevronLeft /></button>
            <h2>{format(currentDate, 'MMMM yyyy')}</h2>
            <button onClick={nextMonth}><FiChevronRight /></button>
          </div>
          <button className={styles.primaryButton}><FiPlus/> Add Event</button>
        </header>

        <div className={styles.calendarContainer}>
          <div className={styles.weekdays}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className={styles.calendarGrid}>
            {days.map(day => (
              <div 
                key={day.toString()} 
                className={`${styles.dayCell} ${!isSameMonth(day, monthStart) ? styles.otherMonth : ''} ${isToday(day) ? styles.today : ''}`}
              >
                <span className={styles.dayNumber}>{format(day, 'd')}</span>
                <div className={styles.eventsContainer}>
                  {events
                    .filter(event => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                    .map((event, i) => (
                      <div key={i} className={`${styles.eventPill} ${styles[event.type]}`}>
                        {event.title}
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;