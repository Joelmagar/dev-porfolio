import { Html, useProgress } from "@react-three/drei";
export default function CanvasLoader() {
  const progress = useProgress();
  return (
    <Html
      as="div"
      center
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <span className="canvas-loader" />
      <p
        style={{
          fontSize: "14px",
          color: "#f1f1f1",
          marginTop: "20px",
          fontWeight: "800",
        }}
      >
        {`Loading... ${progress?.progress?.toFixed(2)}%`}
      </p>
    </Html>
  );
}
