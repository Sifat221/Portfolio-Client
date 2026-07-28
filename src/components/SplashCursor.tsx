import React, { useEffect, useRef } from 'react';

interface SplashCursorProps {
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  CURL?: number;
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  COLOR_UPDATE_SPEED?: number;
  SHADING?: boolean;
  RAINBOW_MODE?: boolean;
  COLOR?: string;
}

export const SplashCursor: React.FC<SplashCursorProps> = ({
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  COLOR_UPDATE_SPEED = 10,
  SHADING = true,
  RAINBOW_MODE = false,
  COLOR = '#A855F7',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL Fluid Simulation Implementation
    function pointerPrototype() {
      return {
        id: -1,
        texcoordX: 0,
        texcoordY: 0,
        prevTexcoordX: 0,
        prevTexcoordY: 0,
        deltaX: 0,
        deltaY: 0,
        down: false,
        moved: false,
        color: [30, 0, 30],
      };
    }

    const config = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1024,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS: 20,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      PAUSED: false,
      BACK_COLOR: { r: 0, g: 0, b: 0 },
      TRANSPARENT: true,
      COLOR,
      RAINBOW_MODE,
    };

    const pointers = [pointerPrototype()];
    const splashPointer = pointers[0];

    // Helper to convert hex to RGB 0..1
    function hexToRGB(hex: string) {
      let c = hex.replace('#', '');
      if (c.length === 3) {
        c = c.split('').map((x) => x + x).join('');
      }
      const num = parseInt(c, 16);
      return {
        r: ((num >> 16) & 255) / 255,
        g: ((num >> 8) & 255) / 255,
        b: (num & 255) / 255,
      };
    }

    const { gl, ext } = getWebGLContext(canvas);

    if (!gl) return;

    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 512;
      config.SHADING = false;
    }

    function getWebGLContext(canvasEl: HTMLCanvasElement) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };

      let webglCtx = canvasEl.getContext('webgl2', params) as WebGL2RenderingContext | null;
      const isWebGL2 = !!webglCtx;

      if (!isWebGL2) {
        webglCtx = (canvasEl.getContext('webgl', params) ||
          canvasEl.getContext('experimental-webgl', params)) as WebGL2RenderingContext | null;
      }

      if (!webglCtx) return { gl: null, ext: { supportLinearFiltering: false } };

      let halfFloat: any;
      let supportLinearFiltering = false;

      if (isWebGL2) {
        webglCtx.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = !!webglCtx.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = webglCtx.getExtension('OES_texture_half_float');
        webglCtx.getExtension('OES_texture_half_float_linear');
      }

      webglCtx.clearColor(0.0, 0.0, 0.0, 0.0);

      const halfFloatTexType = isWebGL2
        ? webglCtx.HALF_FLOAT
        : halfFloat
        ? halfFloat.HALF_FLOAT_OES
        : webglCtx.UNSIGNED_BYTE;

      function formatFormat(
        glCtx: WebGL2RenderingContext,
        internalFormat: number,
        format: number,
        type: number
      ) {
        const f = glCtx.createTexture();
        glCtx.bindTexture(glCtx.TEXTURE_2D, f);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MIN_FILTER, glCtx.NEAREST);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_MAG_FILTER, glCtx.NEAREST);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_S, glCtx.CLAMP_TO_EDGE);
        glCtx.texParameteri(glCtx.TEXTURE_2D, glCtx.TEXTURE_WRAP_T, glCtx.CLAMP_TO_EDGE);
        glCtx.texImage2D(glCtx.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

        const fbo = glCtx.createFramebuffer();
        glCtx.bindFramebuffer(glCtx.FRAMEBUFFER, fbo);
        glCtx.framebufferTexture2D(
          glCtx.FRAMEBUFFER,
          glCtx.COLOR_ATTACHMENT0,
          glCtx.TEXTURE_2D,
          f,
          0
        );

        const status = glCtx.checkFramebufferStatus(glCtx.FRAMEBUFFER);
        return status === glCtx.FRAMEBUFFER_COMPLETE;
      }

      let formatRGBA: any;
      let formatRG: any;
      let formatR: any;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(
          webglCtx,
          webglCtx.RGBA16F,
          webglCtx.RGBA,
          halfFloatTexType
        );
        formatRG = getSupportedFormat(
          webglCtx,
          webglCtx.RG16F,
          webglCtx.RG,
          halfFloatTexType
        );
        formatR = getSupportedFormat(
          webglCtx,
          webglCtx.R16F,
          webglCtx.RED,
          halfFloatTexType
        );
      } else {
        formatRGBA = getSupportedFormat(
          webglCtx,
          webglCtx.RGBA,
          webglCtx.RGBA,
          halfFloatTexType
        );
        formatRG = getSupportedFormat(
          webglCtx,
          webglCtx.RGBA,
          webglCtx.RGBA,
          halfFloatTexType
        );
        formatR = getSupportedFormat(
          webglCtx,
          webglCtx.RGBA,
          webglCtx.RGBA,
          halfFloatTexType
        );
      }

      function getSupportedFormat(
        glCtx: WebGL2RenderingContext,
        internalFormat: number,
        format: number,
        type: number
      ) {
        if (!formatFormat(glCtx, internalFormat, format, type)) {
          switch (internalFormat) {
            case glCtx.R16F:
              return getSupportedFormat(glCtx, glCtx.RG16F, glCtx.RG, type);
            case glCtx.RG16F:
              return getSupportedFormat(glCtx, glCtx.RGBA16F, glCtx.RGBA, type);
            default:
              return null;
          }
        }
        return { internalFormat, format };
      }

      return {
        gl: webglCtx,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      };
    }

    // Material & Shaders Compilation
    class Material {
      vertexShader: WebGLShader;
      fragmentShaderSource: string;
      programs: Record<number, WebGLProgram> = {};
      activeProgram: WebGLProgram | null = null;
      uniforms: Record<string, WebGLUniformLocation | null> = {};

      constructor(vertexShader: WebGLShader, fragmentShaderSource: string) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
      }

      setKeywords(keywords: string[]) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++) {
          hash += hashCode(keywords[i]);
        }

        let program = this.programs[hash];
        if (!program) {
          let fragmentShader = compileShader(
            gl!.FRAGMENT_SHADER,
            this.fragmentShaderSource,
            keywords
          );
          program = createProgram(this.vertexShader, fragmentShader!);
          this.programs[hash] = program;
        }

        if (program !== this.activeProgram) {
          this.uniforms = getUniforms(program);
          this.activeProgram = program;
        }
      }

      bind() {
        if (this.activeProgram) {
          gl!.useProgram(this.activeProgram);
        }
      }
    }

    class Program {
      uniforms: Record<string, WebGLUniformLocation | null>;
      program: WebGLProgram;

      constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        this.program = createProgram(vertexShader, fragmentShader);
        this.uniforms = getUniforms(this.program);
      }

      bind() {
        gl!.useProgram(this.program);
      }
    }

    function createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
      const program = gl!.createProgram()!;
      gl!.attachShader(program, vertexShader);
      gl!.attachShader(program, fragmentShader);
      gl!.linkProgram(program);
      return program;
    }

    function getUniforms(program: WebGLProgram) {
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const activeUniforms = gl!.getProgramParameter(program, gl!.ACTIVE_UNIFORMS);
      for (let i = 0; i < activeUniforms; i++) {
        const uniformName = gl!.getActiveUniform(program, i)!.name;
        uniforms[uniformName] = gl!.getUniformLocation(program, uniformName);
      }
      return uniforms;
    }

    function compileShader(type: number, source: string, keywords?: string[]) {
      source = addKeywords(source, keywords);
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      return shader;
    }

    function addKeywords(source: string, keywords?: string[]) {
      if (!keywords) return source;
      let keywordsString = '';
      keywords.forEach((keyword) => {
        keywordsString += '#define ' + keyword + '\n';
      });
      return keywordsString + source;
    }

    function hashCode(s: string) {
      if (s.length === 0) return 0;
      let hash = 0;
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i);
        hash |= 0;
      }
      return hash;
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;

      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `
    )!;

    const displayShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDither;
      uniform vec2 ditherScale;

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, 0.1));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = max(0.0, dot(n, l));
              c *= diffuse;
          #endif
          gl_FragColor = vec4(c, max(c.r, max(c.g, c.b)));
      }
    `;

    const splatShader = new Program(
      baseVertexShader,
      compileShader(
        gl.FRAGMENT_SHADER,
        `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspect;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspect;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `
      )!
    );

    const displayMaterial = new Material(baseVertexShader, displayShaderSource);

    function blit(target: any) {
      gl!.bindBuffer(gl!.ARRAY_BUFFER, gl!.createBuffer());
      gl!.bufferData(
        gl!.ARRAY_BUFFER,
        new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
        gl!.STATIC_DRAW
      );
      gl!.bindBuffer(gl!.ARRAY_BUFFER, null);

      if (target == null) {
        gl!.viewport(0, 0, gl!.drawingBufferWidth, gl!.drawingBufferHeight);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, null);
      } else {
        gl!.viewport(0, 0, target.width, target.height);
        gl!.bindFramebuffer(gl!.FRAMEBUFFER, target.fbo);
      }
    }

    function resizeCanvas() {
      if (!canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse and Touch Interaction Handlers
    function updatePointerMoveData(
      pointer: typeof splashPointer,
      posX: number,
      posY: number
    ) {
      if (!canvas) return;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1.0 - posY / canvas.height;
      pointer.deltaX = pointer.texcoordX - pointer.prevTexcoordX;
      pointer.deltaY = pointer.texcoordY - pointer.prevTexcoordY;
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    }

    function handleMouseMove(e: MouseEvent) {
      const baseColor = hexToRGB(COLOR);
      splashPointer.color = [baseColor.r * 10, baseColor.g * 10, baseColor.b * 10];
      updatePointerMoveData(splashPointer, e.clientX, e.clientY);
      splat(splashPointer);
    }

    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const baseColor = hexToRGB(COLOR);
        splashPointer.color = [baseColor.r * 10, baseColor.g * 10, baseColor.b * 10];
        updatePointerMoveData(splashPointer, touch.clientX, touch.clientY);
        splat(splashPointer);
      }
    }

    function splat(pointer: typeof splashPointer) {
      if (!pointer.moved) return;
      pointer.moved = false;

      const dx = pointer.deltaX * config.SPLAT_FORCE;
      const dy = pointer.deltaY * config.SPLAT_FORCE;

      gl!.viewport(0, 0, gl!.drawingBufferWidth, gl!.drawingBufferHeight);
      splatShader.bind();
      gl!.uniform1i(splatShader.uniforms.uTarget, 0);
      gl!.uniform1f(
        splatShader.uniforms.aspect,
        gl!.drawingBufferWidth / gl!.drawingBufferHeight
      );
      gl!.uniform2f(
        splatShader.uniforms.point,
        pointer.texcoordX,
        pointer.texcoordY
      );
      gl!.uniform3f(
        splatShader.uniforms.color,
        pointer.color[0] + dx,
        pointer.color[1] + dy,
        pointer.color[2]
      );
      gl!.uniform1f(
        splatShader.uniforms.radius,
        correctRadius(config.SPLAT_RADIUS / 100)
      );

      blit(null);
    }

    function correctRadius(radius: number) {
      if (!canvas) return radius;
      const aspectRatio = canvas.width / canvas.height;
      if (aspectRatio < 1) radius *= aspectRatio;
      return radius;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    let animationId: number;

    function renderLoop() {
      if (config.SHADING) {
        displayMaterial.setKeywords(['SHADING']);
      } else {
        displayMaterial.setKeywords([]);
      }

      displayMaterial.bind();
      blit(null);
      animationId = requestAnimationFrame(renderLoop);
    }

    renderLoop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    COLOR_UPDATE_SPEED,
    SHADING,
    RAINBOW_MODE,
    COLOR,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
    />
  );
};

export default SplashCursor;
