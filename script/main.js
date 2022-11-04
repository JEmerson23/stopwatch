import * as $ from "https://jemerson23.github.io/myPortfolio/lib/abstractions.js";

class Stopwatch {
  
  constructor(){
    this.hour = 0;
    this.minute = 0;
    this.second = 0;
    this.millisecond = 0;
    
    this.loop = null;
    this.running = false;
    
    this.numberDisplay = $.select("#stopwatch_display");
    
    this.display = {
      hour: $.select("#hour_display"),
      minute: $.select("#minute_display"),
      second: $.select("#second_display"),
      millisecond: $.select("#millisecond_display")
    };
    
    this.updateDisplay();
  }
  
  count() {
    if(this.hour == 99)return;
    
    this.millisecond+=1;
    if(this.millisecond > 99){
      this.millisecond = 0;
      this.second++;
      if(this.second > 59){
        this.second = 0;
        this.minute++;
        if(minute > 59){
          this.minute = 0;
          this.hour++;
        }
      }
    }
    
    this.updateDisplay();
  }
  
  updateDisplay() {
    
    function format(number,digits=1){
      if(digits < 0)throw new Error("O número não pode ter zero ou menos dígitos.");
      
      return (number).toLocaleString('en-US',{
        minimumIntegerDigits: digits,
        useGrouping: false
      });
    }
    
    this.display.hour.innerText = format(this.hour,2);
    this.display.minute.innerText = format(this.minute,2);
    this.display.second.innerText = format(this.second,2);
    this.display.millisecond.innerText = format(this.millisecond,2);
  }
  
  start(){
    const self = this;
    if(!this.running)this.running = true;
    else return;
    this.loop = setInterval(function(){self.count()},10);
  }
  
  stop(){
    const self = this;
    if(this.running)this.running = false;
    else return;
    window.clearInterval(self.loop);
  }
  
  reset(){
    if([this.hour,this.minute,this.second,this.millisecond].every(e=>e==0))return;
    this.hour = this.minute = this.second = this.millisecond = 0;
    this.stop();
    this.updateDisplay();
  }
}

const stopwatch = new Stopwatch();

$.select("#start_button").onclick = () => stopwatch.start();
$.select("#stop_button").onclick = () => stopwatch.stop();
$.select("#reset_button").onclick = () => stopwatch.reset();