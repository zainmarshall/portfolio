<script lang="ts">
    import { onMount } from "svelte";

    let { onFinish, onExplode } = $props();

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null = null;

    // Geometric, single-stroke segments for ZAIN
    const typography = {
        Z: ["M 0 0 L 180 0 L 0 200 L 180 200"],
        A: ["M 230 200 L 320 0 L 410 200", "M 270 120 L 370 120"],
        I: ["M 470 0 L 470 200"],
        N: ["M 530 200 L 530 0 L 700 200 L 700 0"],
    };

    type Stroke = {
        d: string;
        path2d: Path2D;
        len: number;
        el: SVGPathElement;
    };

    let strokeStore: Record<string, Stroke[]> = {};
    let bgAlpha = $state(1);
    let startTime = 0;
    let isInitialized = false;

    class Particle {
        x: number;
        y: number;
        color: string;
        history: { x: number; y: number }[] = [];
        maxHistory = 12;

        constructor(color: string, startX: number, startY: number) {
            this.color = color;
            this.x = startX;
            this.y = startY;
        }

        update(tx: number, ty: number, immediate = false) {
            if (immediate) {
                this.x = tx;
                this.y = ty;
            } else {
                this.x += (tx - this.x) * 0.4;
                this.y += (ty - this.y) * 0.4;
            }
            this.history.unshift({ x: this.x, y: this.y });
            if (this.history.length > this.maxHistory) this.history.pop();
        }

        clearHistory() {
            this.history = [];
        }

        draw(c: CanvasRenderingContext2D) {
            c.save();
            c.lineCap = "round";
            // Trail
            for (let i = 0; i < this.history.length; i++) {
                const p = this.history[i];
                const prev = this.history[i + 1] || p;
                const opacity = (1 - i / this.maxHistory) * 0.7;
                c.strokeStyle = `${this.color}${Math.floor(opacity * 255)
                    .toString(16)
                    .padStart(2, "0")}`;
                c.lineWidth = 14 * (1 - i / this.maxHistory);
                c.beginPath();
                c.moveTo(prev.x, prev.y);
                c.lineTo(p.x, p.y);
                c.stroke();
            }
            // Glow head
            c.fillStyle = "white";
            c.shadowBlur = 40;
            c.shadowColor = this.color;
            c.beginPath();
            c.arc(this.x, this.y, 7, 0, Math.PI * 2);
            c.fill();
            c.restore();
        }
    }

    class ExplosionParticle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        color: string;
        alpha = 1;
        size: number;
        friction = 0.95;
        driftX: number;
        driftY: number;

        constructor(x: number, y: number, color: string) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 20 + 8;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.size = Math.random() * 3 + 1;
            this.driftX = Math.random() * 0.6 - 0.3;
            this.driftY = Math.random() * 0.6 - 0.3;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vx =
                this.vx * this.friction + this.driftX * (1 - this.friction);
            this.vy =
                this.vy * this.friction + this.driftY * (1 - this.friction);
            this.alpha -= 0.012;
        }

        draw(c: CanvasRenderingContext2D) {
            c.save();
            c.globalAlpha = Math.max(0, this.alpha);
            c.fillStyle = this.color;
            c.shadowBlur = 10;
            c.shadowColor = this.color;
            c.beginPath();
            c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            c.fill();
            c.restore();
        }
    }

    let pL: Particle | null = null;
    let pR: Particle | null = null;
    let explosionParticles: ExplosionParticle[] = [];
    let isExploding = false;
    let explosionStartTime = 0;

    function startExplosion(scale: number, offset: { x: number; y: number }) {
        isExploding = true;
        explosionStartTime = performance.now();
        onExplode?.();

        Object.entries(typography).forEach(([key, lines]) => {
            const strokes = strokeStore[key];
            const color = key === "Z" || key === "A" ? "#00ffcc" : "#ff0077";
            strokes.forEach((s) => {
                const count = Math.floor(s.len / 4);
                for (let i = 0; i < count; i++) {
                    const pt = s.el.getPointAtLength((i / count) * s.len);
                    explosionParticles.push(
                        new ExplosionParticle(
                            pt.x * scale + offset.x,
                            pt.y * scale + offset.y,
                            color,
                        ),
                    );
                }
            });
        });
    }

    function animate() {
        requestAnimationFrame(animate);

        if (!ctx || !canvas || !isInitialized || !pL || !pR) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const time = performance.now();
        const duration = 1000;
        const startDelay = 100;
        const elapsed = time - startTime;

        const baseWidth = 700; // Match typography width
        const baseHeight = 200;
        const scale = Math.min(canvas.width / 950, canvas.height / 450, 1.6);
        const offset = {
            x: canvas.width / 2 - (baseWidth / 2) * scale,
            y: canvas.height / 2 - (baseHeight / 2) * scale,
        };

        if (isExploding) {
            bgAlpha = Math.max(0, bgAlpha - 0.08);
            for (let i = explosionParticles.length - 1; i >= 0; i--) {
                const p = explosionParticles[i];
                p.update();
                p.draw(ctx);
                if (p.alpha <= 0) explosionParticles.splice(i, 1);
            }

            if (
                explosionParticles.length === 0 ||
                time - explosionStartTime > 2500
            ) {
                onFinish?.();
            }
            return;
        }

        if (elapsed < startDelay) {
            pL.update(canvas.width * -0.1, canvas.height / 2);
            pR.update(canvas.width * 1.1, canvas.height / 2);
        } else {
            const progress = Math.min((elapsed - startDelay) / duration, 1);

            // Left sequence: Z, A_legs, A_cross
            const leftStrokes = [...strokeStore.Z, ...strokeStore.A];
            const leftTotalLen = leftStrokes.reduce((acc, s) => acc + s.len, 0);

            // Right sequence: N, I
            const rightStrokes = [...strokeStore.N, ...strokeStore.I];
            const rightTotalLen = rightStrokes.reduce(
                (acc, s) => acc + s.len,
                0,
            );

            const renderSequence = (
                strokes: Stroke[],
                p: number,
                color: string,
                particle: Particle,
            ) => {
                const totalLen = strokes.reduce((acc, s) => acc + s.len, 0);
                let currentLen = p * totalLen;
                let lastPos = { x: particle.x, y: particle.y };

                strokes.forEach((s) => {
                    const drawLen = Math.min(currentLen, s.len);
                    if (drawLen > 0) {
                        // Static part
                        ctx!.save();
                        ctx!.translate(offset.x, offset.y);
                        ctx!.scale(scale, scale);
                        ctx!.lineWidth = 14;
                        ctx!.lineCap = "round";
                        ctx!.lineJoin = "round";
                        ctx!.strokeStyle = color;
                        ctx!.setLineDash([drawLen, s.len]);
                        ctx!.stroke(s.path2d);
                        ctx!.restore();

                        // Update particle head if this is the active stroke
                        if (currentLen <= s.len + 0.1) {
                            const pt = s.el.getPointAtLength(drawLen);
                            lastPos = {
                                x: pt.x * scale + offset.x,
                                y: pt.y * scale + offset.y,
                            };
                        }
                    }
                    currentLen -= s.len;
                });
                particle.update(lastPos.x, lastPos.y, true);
            };

            renderSequence(leftStrokes, progress, "#00ffcc", pL);
            renderSequence(rightStrokes, progress, "#ff0077", pR);

            if (progress >= 1) {
                startExplosion(scale, offset);
                return;
            }
        }

        pL.draw(ctx);
        pR.draw(ctx);
    }

    onMount(() => {
        const svgNs = "http://www.w3.org/2000/svg";
        try {
            Object.entries(typography).forEach(([key, lines]) => {
                strokeStore[key] = lines.map((d) => {
                    const el = document.createElementNS(svgNs, "path");
                    el.setAttribute("d", d);
                    return {
                        d,
                        path2d: new Path2D(d),
                        len: el.getTotalLength(),
                        el,
                    };
                });
            });

            ctx = canvas.getContext("2d")!;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            pL = new Particle(
                "#00ffcc",
                canvas.width * -0.1,
                canvas.height / 2,
            );
            pR = new Particle("#ff0077", canvas.width * 1.1, canvas.height / 2);

            isInitialized = true;
            startTime = performance.now();
            animate();
        } catch (e) {
            onFinish?.();
            return;
        }

        const handleResize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });
</script>

<div
    class="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-none"
    style="background-color: rgba(5, 5, 7, {bgAlpha})"
>
    <canvas bind:this={canvas} class="absolute inset-0 w-full h-full"></canvas>
</div>
