import { Component, OnInit, Input, Renderer2, ElementRef, ChangeDetectorRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'tb-bubble',
  templateUrl: './tb-bubble.component.html',
  styleUrls: ['./tb-bubble.component.scss']
})
export class TbBubbleComponent implements OnInit {
  mMax: number = Number.MAX_VALUE;
  mMin: number = 0;
  mVal: number;
  mSize: number = 36;

  mY = 0
  mYMax = Math.tanh(this.mMax as number)
  mYMin = Math.tanh(this.mMin as number)
  mRangeDiff: number=1;

  _mDiameter = 20
  _mClass = "tb-theme--primary-bg"

  @Input() set backgroundClass(val: string) {
    console.log("class");
    if (val) {
      this._mClass = val
    
    }
  }
  @Input() set min(val: number) {
    console.log("min");
    if (val) {
      this.mMin = val
      this.updateRange()
    }
  }

  @Input() set max(val: number) {
    console.log("max");
    if (val) {
      this.mMax = val
      this.updateRange()
    }
  }

  @Input() set value(val: number) {
    console.log("val " + val);
    if (val) {
      this.mY = Math.tanh(val as number)
      this.mVal = val
      
      this.updateY()
    }
  }

  @Input() set size(val: number) {
    if (val) {
      this.mSize = val
    }
  }

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) document: any) { }

  ngOnInit() {
    //console.log("here: " + this.mYMax, this.mYMin, this.mY);
  }

  updateRange(){
    this.mRangeDiff = this.mMax - this.mMin
    this.mYMin =Math.tanh(0) 
    this.mYMax =this.mRangeDiff > 3 ? Math.tanh(3) : Math.tanh(this.mRangeDiff)

  }

  updateY(){
    let diff = (this.mVal - this.mMin)

    diff = diff/this.mRangeDiff

    console.log(diff);
    
    this.mY= Math.tanh(diff*3)
    this._mDiameter = this.mY*this.mSize
    console.log("here: " + this.mYMax, this.mYMin, this.mY);
  }
  
  private addClass(classNames: string) {
    console.log(this.el.nativeElement)
    let classes = classNames.split(' ');
    classes.forEach(
        c => this.renderer.addClass(this.el.nativeElement, c));
    //this.renderer.addClass(this.el.nativeElement,);
}

private removeClass(classNames: string) {
    let classes = classNames.split(' ');

    classes.forEach(
        c => this.renderer.removeClass(this.el.nativeElement, c));

}
}
