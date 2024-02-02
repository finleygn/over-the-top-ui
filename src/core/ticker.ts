type Interval = ReturnType<typeof setInterval>;

class Ticker {
  private update: Function;
  private frequency: number;
  private interval?: Interval;

  constructor(update: Function, frequency: number) {
    this.update = update;
    this.frequency = frequency;
  }

  start = () => {
    if(!this.interval){
      this.interval = setInterval(() => this.update, this.frequency);
    }
  }

  stop = () => {
    if(this.interval){
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }
}

export default Ticker;