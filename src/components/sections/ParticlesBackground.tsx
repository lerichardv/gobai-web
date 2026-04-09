'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { type Container, type ISourceOptions, type Engine } from "@tsparticles/engine";
import { loadCanvasMaskPlugin } from "@tsparticles/plugin-canvas-mask";

interface ParticlesBackgroundProps {
    imageSrc: string;
}

export default function ParticlesBackground({ imageSrc }: ParticlesBackgroundProps) {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine: Engine) => {
            await loadFull(engine);
            await loadCanvasMaskPlugin(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
        // console.log("Particles loaded", container);
    }, []);

    const options: ISourceOptions = useMemo(() => ({
        fpsLimit: 60,
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "bubble",
                },
            },
            modes: {
                bubble: {
                    distance: 100,
                    duration: 3,
                    opacity: 1,
                    size: 4,
                },
            },
        },
        particles: {
            color: {
                value: ["#00f2fe", "#4facfe", "#00c6ff", "#0072ff", "#70e1f5"],
            },
            move: {
                enable: true,
                speed: 0.3, // Slow movement
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                    default: "bounce"
                }
            },
            number: {
                value: 0,
            },
            opacity: {
                value: { min: 0.2, max: 0.8 },
                animation: {
                    enable: true,
                    speed: 0.5,
                    sync: false
                }
            },
            shape: {
                type: "circle"
            },
            size: {
                value: { min: 0.5, max: 2 },
                animation: {
                    enable: true,
                    speed: 1,
                    sync: false
                }
            }
        },
        canvasMask: {
            enable: true,
            scale: typeof window !== 'undefined' ? (window.innerWidth < 768 ? 0.5 : 1) : 1, // Responsive scaling based on window width
            pixels: {
                offset: 8 // Higher offset for better performance
            },
            position: {
                x: 0, // Align to left side 
                y: 100 // Align to bottom
            },
            image: {
                src: imageSrc
            },
            override: {
                color: true, // Use image colors
                opacity: true
            }
        },
        background: {
            color: "transparent"
        },
        detectRetina: true,
        fullScreen: {
            enable: false
        }
    }), [imageSrc]);

    if (init) {
        return (
            <div className="absolute inset-0 z-[5] pointer-events-none opacity-100 overflow-hidden mix-blend-screen">
                <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={options}
                    className="w-full h-full"
                />
            </div>
        );
    }

    return null;
}
