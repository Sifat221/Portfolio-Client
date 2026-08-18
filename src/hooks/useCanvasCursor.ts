// @ts-nocheck
import { useEffect } from 'react';

const useCanvasCursor = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.running = true;
    ctx.frame = 1;

    function Oscillate(e) {
      this.init(e || {});
    }

    Oscillate.prototype = {
      init: function (e) {
        this.phase = e.phase || 0;
        this.offset = e.offset || 0;
        this.frequency = e.frequency || 0.001;
        this.amplitude = e.amplitude || 1;
        this.val = 0;
      },
      update: function () {
        this.phase += this.frequency;
        this.val = this.offset + Math.sin(this.phase) * this.amplitude;
        return this.val;
      },
      value: function () {
        return this.val;
      },
    };

    const pos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const E = {
      debug: true,
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    };

    function Node() {
      this.x = pos.x;
      this.y = pos.y;
      this.vy = 0;
      this.vx = 0;
    }

    function Line(e) {
      this.init(e || {});
    }

    Line.prototype = {
      init: function (e) {
        this.spring = e.spring + 0.1 * Math.random() - 0.02;
        this.friction = E.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];
        for (let n = 0; n < E.size; n++) {
          const t = new Node();
          this.nodes.push(t);
        }
      },
      update: function () {
        let e = this.spring;
        let t = this.nodes[0];
        t.vx += (pos.x - t.x) * e;
        t.vy += (pos.y - t.y) * e;
        for (let n, i = 0, a = this.nodes.length; i < a; i++) {
          t = this.nodes[i];
          if (i > 0) {
            n = this.nodes[i - 1];
            t.vx += (n.x - t.x) * e;
            t.vy += (n.y - t.y) * e;
            t.vx += n.vx * E.dampening;
            t.vy += n.vy * E.dampening;
          }
          t.vx *= this.friction;
          t.vy *= this.friction;
          t.x += t.vx;
          t.y += t.vy;
          e *= E.tension;
        }
      },
      draw: function () {
        let e;
        let t;
        let n = this.nodes[0].x;
        let i = this.nodes[0].y;
        let a = 1;
        let o = this.nodes.length - 2;

        ctx.beginPath();
        ctx.moveTo(n, i);
        for (; a < o; a++) {
          e = this.nodes[a];
          t = this.nodes[a + 1];
          n = 0.5 * (e.x + t.x);
          i = 0.5 * (e.y + t.y);
          ctx.quadraticCurveTo(e.x, e.y, n, i);
        }
        e = this.nodes[a];
        t = this.nodes[a + 1];
        if (e && t) {
          ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
        }
        ctx.stroke();
        ctx.closePath();
      },
    };

    let lines = [];
    const f = new Oscillate({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    function createLines() {
      lines = [];
      for (let i = 0; i < E.trails; i++) {
        lines.push(new Line({ spring: 0.4 + (i / E.trails) * 0.025 }));
      }
    }

    function updatePos(e) {
      if (e.touches && e.touches.length > 0) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      } else {
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
    }

    function onMousemove(e) {
      updatePos(e);
      if (lines.length === 0) {
        createLines();
      }
    }

    let animationFrameId;

    function render() {
      if (ctx.running) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',75%,60%,0.25)';
        ctx.lineWidth = 1.5;
        for (let t = 0; t < lines.length; t++) {
          lines[t].update();
          lines[t].draw();
        }
        ctx.frame++;
        animationFrameId = window.requestAnimationFrame(render);
      }
    }

    function resizeCanvas() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }

    document.addEventListener('mousemove', onMousemove);
    document.addEventListener('touchstart', onMousemove);
    document.addEventListener('touchmove', onMousemove);
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    createLines();
    render();

    return () => {
      ctx.running = false;
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      document.removeEventListener('mousemove', onMousemove);
      document.removeEventListener('touchstart', onMousemove);
      document.removeEventListener('touchmove', onMousemove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
};

export default useCanvasCursor;
