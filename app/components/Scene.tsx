"use client";
import { Component, lazy, Suspense } from "react";
import type { ReactNode } from "react";
import { useInView, useMedia, usePageVisibility } from "../hooks";

const WorldScene = lazy(() => import("./WorldScene"));

export type SceneMode = "core" | "pipeline" | "connection";

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Scene({
  mode,
  active = 0,
  transmitting = false,
  reducedMotion,
}: {
  mode: SceneMode;
  active?: number;
  transmitting?: boolean;
  reducedMotion: boolean;
}) {
  const { ref, inView, hasEntered } = useInView<HTMLDivElement>("80px");
  const smallScreen = useMedia("(max-width: 767px)");
  const pageVisible = usePageVisibility();

  return (
    <div
      ref={ref}
      className={`world-scene world-scene--${mode}`}
      aria-hidden="true"
    >
      {hasEntered && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <WorldScene
              mode={mode}
              active={active}
              transmitting={transmitting}
              smallScreen={smallScreen}
              reducedMotion={reducedMotion}
              running={inView && pageVisible}
            />
          </Suspense>
        </SceneBoundary>
      )}
    </div>
  );
}
