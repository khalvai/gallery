import "./App.css";

function Image({
  address,
  height,
  width,
}: {
  address: string;
  height: string;
  width: string;
}) {
  return (
    <div className="image-container">
      <img
        src={address}
        alt="Placeholder"
        style={{ height, width, borderRadius: "10px" }}
      />
    </div>
  );
}
function App() {
  return (
    <>
      <div className="flex gap-2 justify-center mt-2 h-screen">
        <Image address="/night.jpeg" height="600px" width="400px" />
        <Image address="/couple.jpeg" height="600px" width="300px" />
      </div>
    </>
  );
}

export default App;
