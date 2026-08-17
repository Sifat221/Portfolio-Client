// @ts-nocheck
import { useEffect } from 'react';

const useCanvasCursor = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;
    let frame = 1;

    function n(options: any) {
      this.init(options || {});
    }
    n.prototype = {
      init: function (options: any) {
        this.phase = options.phase || 0;
        this.offset = options.offset || 0;
        this.frequency = options.frequency || 0.001;
        this.amplitude = options.amplitude || 1;
      },
      update: function () {
        this.phase += this.frequency;
        return this.offset + Math.sin(this.phase) * this.amplitude;
      },
      value: function () {
        return this.offset + Math.sin(this.phase) * this.amplitude;
      },
    };

    const f = new (n as any)({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let lines: any[] = [];
    const E = {
      debug: true,
      friction: 0.5,
      trails: 20,
      size: 50,
      dampening: 0.25,
      tension: 0.98,
    };

    function Node(this: any) {
      this.x = pos.x;
      this.y = pos.y;
      this.vy = 0;
      this.vx = 0;
    }

    function Line(this: any, options: any) {
      this.init(options || {});
    }

    Line.prototype = {
      init: function (options: any) {
        this.spring = options.spring + 0.1 * Math.random() - 0.02;
        this.friction = E.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];
        for (let i = 0; i < E.size; i++) {
          const node = new (Node as any)();
          this.nodes.push(node);
        }
      },
      update: function () {
        let spring = this.spring;
        const node0 = this.nodes[0];
        if (!node0) return;

        node0.vx += (pos.x - node0.x) * spring;
        node0.vy += (pos.y - node0.y) * spring;

        for (let i = 0; i < this.nodes.length; i++) {
          const node = this.nodes[i];
          if (i > 0) {
            const prev = this.nodes[i - 1];
            node.vx += (prev.x - node.x) * spring;
            node.vy += (prev.y - node.y) * spring;
            node.vx += prev.vx * E.dampening;
            node.vy += prev.vy * E.dampening;
          }
          node.vx *= this.friction;
          node.vy *= this.friction;
          node.x += node.vx;
          node.y += node.vy;
          spring *= E.tension;
        }
      },
      draw: function () {
        let nodeA, nodeB;
        if (!this.nodes || this.nodes.length < 2) return;
        let x = this.nodes[0].x;
        let y = this.nodes[0].y;
        ctx.beginPath();
        ctx.moveTo(x, y);
        let i = 1;
        const count = this.nodes.length - 2;
        for (; i < count; i++) {
          nodeA = this.nodes[i];
          nodeB = this.nodes[i + 1];
          x = 0.5 * (nodeA.x + nodeB.x);
          y = 0.5 * (nodeA.y + nodeB.y);
          ctx.quadraticCurveTo(nodeA.x, nodeA.y, x, y);
        }
        nodeA = this.nodes[i];
        nodeB = this.nodes[i + 1];
        if (nodeA && nodeB) {
          ctx.quadraticCurveTo(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
        }
        ctx.stroke();
        ctx.closePath();
      },
    };

    function createLines() {
      lines = [];
      for (let i = 0; i < E.trails; i++) {
        lines.push(new (Line as any)({ spring: 0.4 + (i / E.trails) * 0.025 }));
      }
    }

    function updatePos(e: MouseEvent | TouchEvent) {
      if ('touches' in e && e.touches && e.touches.length > 0) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      } else if ('clientX' in e) {
        pos.x = (e as MouseEvent).clientX;
        pos.y = (e as MouseEvent).clientY;
      }
    }

    let animId: number;

    function render() {
      if (!isRunning || !ctx) return;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = `hsla(${Math.round(f.update())}, 65%, 55%, 0.25)`;
      ctx.lineWidth = 1.2;

      for (let i = 0; i < E.trails; i++) {
        if (lines[i]) {
          lines[i].update();
          lines[i].draw();
        }
      }
      frame++;
      animId = requestAnimationFrame(render);
    }

    function resizeCanvas() {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    }

    function onFirstMove(e: MouseEvent | TouchEvent) {
      document.removeEventListener('mousemove', onFirstMove);
      document.removeEventListener('touchstart', onFirstMove);
      document.addEventListener('mousemove', updatePos);
      document.addEventListener('touchmove', updatePos);
      updatePos(e);
      createLines();
      render();
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', onFirstMove);
    document.addEventListener('touchstart', onFirstMove);

    return () => {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', onFirstMove);
      document.removeEventListener('touchstart', onFirstMove);
      document.removeEventListener('mousemove', updatePos);
      document.removeEventListener('touchmove', updatePos);
    };
  }, []);
};

export default useCanvasCursor;
