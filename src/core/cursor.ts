import { clamp, lerp } from "../utils/math";

type CursorFollowInit = { offsetX?: number }

const dull = (x: number) => (-Math.pow(x * x, 2)) + 1;

class CursorFollow {
  private mount?: HTMLElement | SVGSVGElement;
  private hovered: boolean = false;
  private momentum: number = 0;
  private offsetX: number = 0;
  // rads
  private rotationOffset: number = 0;
  private mousePosition: { x: number, y: number } = {
    x: 0,
    y: 0
  };

  constructor({
    offsetX
  }: CursorFollowInit) {

    if (offsetX) this.offsetX = offsetX;

    document.addEventListener('mousemove', this.handleMouseMove);

    requestAnimationFrame(this.handleFrame)
  }

  public setMount(mount: HTMLElement | SVGSVGElement) {
    this.mount = mount;
    this.mount.style.top = "0px";
    this.mount.style.left = "0px";
    this.mount.style.position = "fixed";
    this.mount.style.pointerEvents = 'none';
    this.mount.style.transformOrigin = "top left";
    this.mount.style.zIndex = "99999";
  }

  private handleMouseMove = (event: MouseEvent) => {
    const target = 1000 / window.innerWidth;
    const xDiff = (event.clientX - this.mousePosition.x) * target;

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
    if (!this.mount) return;
    if (!this.hovered) this.rotationOffset = lerp(this.rotationOffset, 0, 0.05);

    this.mount.style.transform = `translate(${this.mousePosition.x + this.offsetX}px, ${this.mousePosition.y}px) rotate(${this.momentum + this.rotationOffset}deg)`;
  }

  public setRotationOffset(rotationOffset: number) {
    this.rotationOffset = lerp(this.rotationOffset, rotationOffset, 0.2);
  }

  public hover() {
    this.hovered = true;
  }

  public unhover() {
    this.hovered = false;
  }
}

export default CursorFollow;