import { componentType } from "@/constants/componentType";
import { DragableItem } from "@/core/DragableItem/DragableItem";
import DynamicEngine from "@/core/Dynamic/Dynamic";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function IndexPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragableItem index={1} style={{ marginBottom: "10px" }}>
        <DynamicEngine
          componentType={componentType.Layout}
          name={"flex"}
          data={{
            children: [<div key="1">123</div>]
          }}
        />
        <DynamicEngine
          componentType={componentType.Base}
          name={"Button"}
          item="123"
          onClick={() => {
            alert("123");
          }}
        />
      </DragableItem>
    </DndProvider>
  );
}
