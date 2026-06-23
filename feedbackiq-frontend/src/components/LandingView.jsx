import React, { useEffect, useRef } from 'react';
import { ArrowRight, Play, TrendingUp, Puzzle, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function LandingView({ onGetStarted, onViewDemo }) {
  const canvasRef = useRef(null);

  // WebGL Shader Animation initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let resizeObserver;
    const syncSize = () => {
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(canvas.parentElement);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
          vec2 uv = v_texCoord;
          vec2 p = (uv - 0.5) * 2.0;
          p.x *= u_resolution.x / u_resolution.y;

          float t = u_time * 0.2;
          float color = 0.0;
          
          for(float i = 0.0; i < 8.0; i++) {
              p.y += sin(p.x * 2.0 + t + i) * 0.15;
              p.x += cos(p.y * 1.5 + t * 0.8 + i) * 0.1;
              float dist = abs(p.y);
              color += 0.002 / dist;
          }

          vec3 baseColor = vec3(0.04, 0.04, 0.05); 
          vec3 pathColor = vec3(0.63, 1.0, 0.7); 
          
          vec3 finalColor = mix(baseColor, pathColor, clamp(color, 0.0, 0.75));
          
          float vignette = 1.0 - length(uv - 0.5) * 1.1;
          finalColor *= vignette;

          gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const compileShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(s));
      }
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    let animationFrameId;
    const render = (t) => {
      syncSize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '92vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px' }}>
      
      {/* Background WebGL Shader Container */}
      <div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: 0, 
          overflow: 'hidden', 
          pointerEvents: 'none',
          opacity: 0.15 /* Dimmed background lines to maximize contrast and text readability */
        }}
      >
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        {/* Soft bottom shading to merge into footer */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, var(--bg-app) 100%)' }} />
      </div>

      {/* Hero Core Content */}
      <section 
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          textAlign: 'center', 
          maxWidth: '960px', 
          margin: '0 auto', 
          padding: '0 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px'
        }}
      >
        {/* Floating Core Badging */}
        <div 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '6px 16px', 
            borderRadius: '999px', 
            background: 'rgba(26, 26, 26, 0.8)', 
            border: '1px solid rgba(162, 255, 179, 0.2)' 
          }}
        >
          <ShieldCheck size={16} style={{ color: 'var(--primary-accent)' }} />
          <span className="text-label-sm" style={{ textTransform: 'none', color: 'var(--primary-accent)', fontSize: '14px' }}>
            AI-Powered Customer Feedback Platform
          </span>
        </div>

        {/* Dynamic Headers */}
        <h1 
          className="text-display-xl" 
          style={{ 
            fontSize: 'min(76px, 9vw)', 
            lineHeight: '1.15', 
            fontWeight: 800, 
            letterSpacing: '-0.04em',
            margin: 0,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.9)'
          }}
        >
          Transform Feedback <br />
          <span style={{ color: 'var(--primary-accent)' }}>into Strategy.</span>
        </h1>

        <p 
          className="text-body-lg" 
          style={{ 
            color: '#ffffff', /* High-contrast white */
            maxWidth: '720px', 
            margin: '0 auto',
            fontSize: '24px', /* Larger font */
            lineHeight: '1.7',
            opacity: 1.0,
            textShadow: '0 2px 16px rgba(0, 0, 0, 1), 0 1px 4px rgba(0, 0, 0, 1)' /* Premium drop-shadow to separate from grid */
          }}
        >
          FeedbackIQ turns thousands of unstructured customer reviews into actionable product insights using AI. Identify recurring complaints, feature requests, and sentiment trends in seconds.
        </p>

        {/* Buttons / Actions */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          <button className="btn btn-primary" style={{ padding: '18px 44px', fontSize: '19px', borderRadius: '10px', fontWeight: '700' }} onClick={onGetStarted}>
            Try FeedbackIQ <ArrowRight size={19} />
          </button>
          
          <button className="btn btn-secondary" style={{ padding: '18px 44px', fontSize: '19px', borderRadius: '10px', fontWeight: '700' }} onClick={onViewDemo}>
            <Play size={18} /> View Demo
          </button>
        </div>
      </section>

      {/* Bento Grid Preview Card Section */}
      <section 
        style={{ 
          position: 'relative', 
          zIndex: 10, 
          width: '100%', 
          maxWidth: '1200px', 
          margin: '72px auto 0',
          padding: '0 16px'
        }}
      >
        <div className="grid-3">
          {/* Card 1: Sentiment */}
          <div className="glass-panel hoverable" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="text-body-md" style={{ fontWeight: '600', fontSize: '18px' }}>Sentiment Analysis</h3>
              <TrendingUp size={18} style={{ color: 'var(--primary-accent)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', height: '16px', width: '100%', borderRadius: '4px', overflow: 'hidden', backgroundColor: '#222' }}>
                <div style={{ width: '65%', backgroundColor: 'var(--primary-accent)' }} />
                <div style={{ width: '35%', backgroundColor: 'var(--error)' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', opacity: 0.7 }}>
                <span>65% Positive</span>
                <span>35% Negative</span>
              </div>
            </div>
          </div>

          {/* Card 2: Features */}
          <div className="glass-panel hoverable" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="text-body-md" style={{ fontWeight: '600', fontSize: '18px' }}>Feature Requests</h3>
              <Puzzle size={18} style={{ color: 'var(--secondary-accent)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ opacity: 0.85 }}>• Dark Mode</span>
                <span style={{ color: 'var(--primary-accent)', fontWeight: 600 }}>42% vol</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ opacity: 0.85 }}>• Export to CSV</span>
                <span style={{ color: 'var(--secondary-accent)', fontWeight: 600 }}>28% vol</span>
              </div>
            </div>
          </div>

          {/* Card 3: Complaints */}
          <div className="glass-panel hoverable" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="text-body-md" style={{ fontWeight: '600', fontSize: '18px' }}>Key Complaints</h3>
              <AlertTriangle size={18} style={{ color: 'var(--error)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'center', margin: 'auto 0' }}>
              <span className="text-headline-md" style={{ color: 'var(--error)', fontSize: '32px', fontWeight: '800' }}>-12%</span>
              <span className="text-label-sm" style={{ textTransform: 'none', opacity: 0.7, fontSize: '12px' }}>API latency drops reported</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
