// EconomicCalendarWidget.jsx
import { useEffect, useRef, memo } from 'react';

function EconomicCalendarWidget() {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tradays.com/c/js/widgets/calendar/widget.js?v=15';
    script.type = 'text/javascript';
    script.async = true;
    script.dataset.type = 'calendar-widget';
    script.innerHTML = `{"width":"100%","height":"100%","mode":"2","fw":"react","theme":1}`;

    container.current?.appendChild(script);
  }, [container]);

  return (
    <div
      ref={container}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // center horizontally
        justifyContent: 'flex-start', // align content at top
        height: '680px', // fixed height
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        id="economicCalendarWidget"
        style={{
          width: '100%',
          height: '500px', // height for the widget itself
        }}
      ></div>
      <div style={{ marginTop: '10px' }}>
        <a
          href="https://www.mql5.com/?utm_source=calendar.widget&utm_medium=link&utm_term=economic.calendar&utm_content=visit.mql5.calendar&utm_campaign=202.calendar.widget"
          rel="noopener nofollow"
          target="_blank"
        >
          MQL5 Algo Trading Community
        </a>
      </div>
    </div>
  );
}

export default memo(EconomicCalendarWidget);
