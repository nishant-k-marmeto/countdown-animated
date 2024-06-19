class CountdownTimer extends HTMLElement {
  constructor() {
    debugger
    super();
    this.targetDate = new Date(this.dataset.date).getTime();

    if (isNaN(this.targetDate)) {
      this.innerHTML = 'Invalid date format';
      return;
    }

    this.update();
    this.interval = setInterval(this.update.bind(this), 100);
  }

  update() {
    const currentDate = new Date().getTime();
    const timeRemaining = this.targetDate - currentDate;

    if (timeRemaining <= 0) {
      this.innerHTML = 'Countdown expired!';
      clearInterval(this.interval);
      return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    function formatNumberWithLeadingZero(number) {
      return number < 10 ? `0${number}` : number.toString();
    }

    this.innerHTML = `
      <div class="countdown__item">
        <div class="flex col-gap-1 justify-center">
          ${days
        .toString()
        .split('')
        .map((digit) => `<span class="countdown__item--digits">${digit}</span>`)
        .join('')}
        </div>
        Days
      </div>
      <div class="countdown__item">
        <div class="flex col-gap-1 justify-center">
          ${formatNumberWithLeadingZero(hours)
        .split('')
        .map((digit) => `<span class="countdown__item--digits">${digit}</span>`)
        .join('')}
        </div>
        Hours
      </div>
      <div class="countdown__item">
        <div class="flex col-gap-1 justify-center">
          ${formatNumberWithLeadingZero(minutes)
        .split('')
        .map((digit) => `<span class="countdown__item--digits">${digit}</span>`)
        .join('')}
        </div>
        Minutes
      </div>
      <div class="countdown__item">
        <div class="flex col-gap-1 justify-center">
          ${formatNumberWithLeadingZero(seconds)
        .split('')
        .map((digit) => `<span class="countdown__item--digits">${digit}</span>`)
        .join('')}
        </div>
        Seconds
      </div>
    `;
  }

  connectedCallback() {
    this.update();
  }
}

customElements.define('marmeto-countdown-timer', CountdownTimer);
