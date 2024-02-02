import { clamp } from "../utils/math";

type CursorFollowInit = { mount: HTMLElement | SVGSVGElement, offsetX?: number }

const dull = (x: number) => (-Math.pow(x * x, 2)) + 1;

class CursorFollow {
  private mount: HTMLElement | SVGSVGElement;
  private momentum: number = 0;
  private offsetX: number = 0;
  private mousePosition: { x: number, y: number } = {
    x: 0,
    y: 0
  };

  constructor({
    mount,
    offsetX
  }: CursorFollowInit) {
    this.mount = mount;
    if (offsetX) this.offsetX = offsetX;

    this.mount.style.top = "0px";
    this.mount.style.left = "0px";
    this.mount.style.position = "fixed";
    this.mount.style.pointerEvents = 'none';
    this.mount.style.transformOrigin = "top left";

    document.addEventListener('mousemove', this.handleMouseMove);

    requestAnimationFrame(this.handleFrame)
  }

  private handleMouseMove = (event: MouseEvent) => {
    const xDiff = event.clientX - this.mousePosition.x;

    this.mousePosition.x = event.clientX;
    this.mousePosition.y = event.clientY;

    const clamped = clamp(this.momentum + xDiff, -200, 200);
    this.momentum = clamped * dull(clamped * 0.005);
  }

  private handleFrame = () => {
    this.updateLocation();
    this.momentum *= 0.5;
    requestAnimationFrame(this.handleFrame);
  }

  private updateLocation = () => {
    this.mount.style.transform = `translate(${this.mousePosition.x + this.offsetX}px, ${this.mousePosition.y}px) rotate(${this.momentum}deg)`;
  }
}

export default CursorFollow;