export default function Err404() {
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
          Error 404
        </h1>
        <h3 style={{ textAlign: "center", width: "100%" }}>
          This Page Dose Not Exist...
        </h3>
      </div>
    </div>
  );
}
