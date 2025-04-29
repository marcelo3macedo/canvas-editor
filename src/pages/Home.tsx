import { CanvasEditor } from "../components/CanvasEditor/CanvasEditor";
import { Sidebar } from "../components/Sidebar";

function Home() {
  return (
    <div className="flex h-screen md:p-4 md:max-w-4xl md:mx-auto">
      <Sidebar />
      <CanvasEditor />
    </div>
  );
}

export { Home };