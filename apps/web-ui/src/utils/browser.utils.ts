class BrowserHelper {
  // https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent
  private DOM_DELTA_PIXEL = 0;
  private DOM_DELTA_LINE = 1;
  private DOM_DELTA_PAGE = 2;

  public wheelDeltaToPx(delta: number, deltaMode: number): number {
    switch (deltaMode) {
      case this.DOM_DELTA_PIXEL:
        return delta;
        case this.DOM_DELTA_LINE:
        case this.DOM_DELTA_PAGE:
        return delta * 30; // sj rough calculated
      default:
        return delta;
    }
  }

  public isFirefox() {
    return /firefox/i.test(navigator.userAgent);
  }

}
export const browserHelper = new BrowserHelper();
