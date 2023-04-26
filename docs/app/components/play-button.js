import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PlayButtonComponent extends Component {
  @action
  draw(data, canvas /*, options, frame */) {
    let h = canvas.height;
    let w = canvas.width;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);

    let percent = h / 255;
    let increase = w / 128;
    let point_count = 128;
    let min = 5;
    // let breakpoint = Math.floor(point_count / options.colors.length);

    let drawLineSegment = (ctx, x, start, stop, color) => {
      ctx.moveTo(x, start);
      ctx.strokeStyle = color;
      ctx.lineTo(x, stop);
      ctx.stroke();
      ctx.beginPath();
    };

    let drawLine = (ctx, x, start, stop, height) => {
      var limit = height * 0.9;
      if (stop >= limit) {
        drawLineSegment(ctx, x, start, limit, 'red');
        start = limit;
      }

      limit = height * 0.1;
      if (stop >= limit) {
        drawLineSegment(ctx, x, start, limit, 'aqua');
        start = limit;
      }

      limit = 0;
      if (stop >= limit) {
        drawLineSegment(ctx, x, start, limit, 'red');
        start = limit;
      }
    };

    for (let point = 1; point <= point_count; point++) {
      let p = data[point]; //get value
      p += min;
      p *= percent;

      let x = increase * point;

      let top = h / 2 + p / 2;
      let bottom = top - p;

      drawLine(ctx, x, top, bottom, h);

      // ctx.moveTo(x, top);
      // ctx.strokeStyle ='red';
      // ctx.lineTo(x, top - (p / 2));
      // ctx.stroke();
      // ctx.beginPath();
      // ctx.moveTo(x, top - (p / 2));
      // ctx.strokeStyle='aqua';
      // ctx.lineTo(x, top - p);
      // ctx.stroke();
      // ctx.beginPath();

      // if ((mid - p) >  20) {
      // ctx.strokeStyle='aqua';
      // ctx.lineTo(x, top - p);
      // ctx.stroke();
      // }
      // else {
      //   ctx.strokeStyle='aqua';
      //   ctx.lineTo(x, mid - p - 20);
      //   ctx.stroke();
      //   ctx.strokeStyle='red';
      //   ctx.lineTo(mid - p - 20, mid - p);
      //   ctx.stroke();
      // }

      // ctx.beginPath();
    }
  }

  @action
  resizeCanvas(canvas, scale) {
    if (!scale) {
      scale = 1.75;
    }
    let parentElement = canvas.parentElement;
    let dims = parentElement.getBoundingClientRect();

    canvas.height = dims.height * scale;
    canvas.width = dims.width * scale;
  }
}
