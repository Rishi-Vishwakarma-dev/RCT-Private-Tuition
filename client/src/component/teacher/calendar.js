export function calendarOrganizer() {
    if (document.querySelector('.calendar-container')) {
        let dates = new Date();
        let year = dates.getFullYear();
        let month = dates.getMonth();

        const day = document.querySelector(".calendar-dates");
        const currdate = document.querySelector(".calendar-current-date");
        const prenexIcons = document.querySelectorAll(".calendar-navigation span");
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const manipulate = () => {

            let dayone = new Date(year, month, 1).getDay();
            let lastdate = new Date(year, month + 1, 0).getDate();
            let dayend = new Date(year, month, lastdate).getDay();
            let monthlastdate = new Date(year, month, 0).getDate();
            let lit = "";

            for (let i = dayone; i > 0; i--) {
                lit +=
                    `<li className="inactive">${monthlastdate - i + 1}</li>`;
            }

            for (let i = 1; i <= lastdate; i++) {

                let isToday = i === dates.getDate()
                    && month === new Date().getMonth()
                    && year === new Date().getFullYear()
                    ? "active"
                    : "";
                lit += `<li className="${isToday}">${i}</li>`;
            }

            for (let i = dayend; i < 6; i++) {
                lit += `<li className="inactive">${i - dayend + 1}</li>`
            }

            currdate.innerText = `${months[month]} ${year}`;
            day.innerHTML = lit;
        }

        manipulate();

        prenexIcons.forEach(icon => {
            icon.addEventListener("click", () => {
                month = icon.id === "calendar-prev" ? month - 1 : month + 1;

                if (month < 0 || month > 11) {
                    dates = new Date(year, month, new Date().getDate());
                    year = dates.getFullYear();
                    month = dates.getMonth();
                }
                else {
                    dates = new Date();
                }

                manipulate();
            });
        });
    }
}
