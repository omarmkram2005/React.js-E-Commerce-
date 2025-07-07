export default function Err403() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <div>
        <h1 style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
          Error 403
        </h1>
        <h3 style={{ textAlign: "center", width: "100%" }}>
          You Are Not Allowed To Enter This Page...
        </h3>
      </div>
    </div>
  );
}
