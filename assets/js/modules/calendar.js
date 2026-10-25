/*
 * The calendar (layouts/_partials/calendar.html): `nav[data-calendar]`, hidden
 * until this runs, so without JavaScript every month shows.
 *
 * - `data-calendar`: selector of the month sections (`[data-month]`
 *   "YYYY-MM"), newest first, as the <select>'s options are. Only the chosen
 *   one shows. Buttons with `data-calendar-step` move along that list
 *   (1 = an older month, -1 = a newer one).
 * - It opens on ?month=YYYY-MM when that month has a section, else on the
 *   oldest month from this one on (the next upcoming events), else on the
 *   newest. The choice is kept in the URL so a month can be linked to.
 * - Today's day is marked `.is-today`, and each `time.calendar-time` (a UTC
 *   time) is rewritten in the visitor's time zone.
 */
function pad(n) {
    return String(n).padStart(2, '0');
}

function localTimes(root) {
    const format = new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
    for (const time of root.querySelectorAll('time.calendar-time[datetime]')) {
        const date = new Date(time.getAttribute('datetime'));
        if (!Number.isNaN(date.getTime())) {
            time.title = time.textContent;
            time.textContent = format.format(date);
        }
    }
}

function initNav(nav) {
    const sections = [...document.querySelectorAll(nav.dataset.calendar)];
    if (!sections.length) return;
    nav.dataset.calendarReady = 'true';

    const select = nav.querySelector('select');
    const months = sections.map((s) => s.dataset.month);
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`;
    const today = `${thisMonth}-${pad(now.getDate())}`;

    for (const day of document.querySelectorAll(`[data-date="${today}"]`)) {
        day.classList.add('is-today');
    }

    const show = (month, push) => {
        sections.forEach((s) => { s.hidden = s.dataset.month !== month; });
        select.value = month;
        const index = months.indexOf(month);
        nav.querySelector('[data-calendar-step="1"]').disabled = index >= months.length - 1;
        nav.querySelector('[data-calendar-step="-1"]').disabled = index <= 0;
        if (push) {
            const url = new URL(window.location.href);
            url.searchParams.set('month', month);
            window.history.replaceState(window.history.state, '', url);
        }
    };

    const wanted = new URL(window.location.href).searchParams.get('month');
    const upcoming = months.filter((m) => m >= thisMonth);
    show(months.includes(wanted) ? wanted : (upcoming.at(-1) ?? months[0]), false);

    select.addEventListener('change', () => show(select.value, true));
    for (const button of nav.querySelectorAll('[data-calendar-step]')) {
        button.addEventListener('click', () => {
            const index = months.indexOf(select.value) + Number(button.dataset.calendarStep);
            if (index >= 0 && index < months.length) show(months[index], true);
        });
    }
    nav.hidden = false;
    // The selector now names the month, so the months' own titles go.
    nav.closest('.calendar')?.classList.add('is-paged');
}

export function initCalendar() {
    for (const nav of document.querySelectorAll('nav[data-calendar]:not([data-calendar-ready])')) {
        initNav(nav);
        localTimes(document);
    }
}
