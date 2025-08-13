"use client";
import {
  Active,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import React from "react";
import { SortableOverlay } from "./sortable-overlay";
import { DragHandle, SortableItem } from "./sortable-item";
import { Flex } from "@radix-ui/themes";

interface BaseItem {
  id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
  items: T[];
  onChange(items: T[]): void;
  onDelete(id: UniqueIdentifier): void;
  renderItem(item: T): React.ReactNode;
}

const SortableListContext = React.createContext<{ isOutside: boolean }>({
  isOutside: false,
});

export function useSortableList() {
  const context = React.useContext(SortableListContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
}

export function SortableList<T extends BaseItem>(props: Props<T>) {
  const { items, onChange, renderItem, onDelete } = props;
  const [active, setActive] = React.useState<Active | null>(null);
  const [isOutsideThreshold, setIsOutsideThreshold] = React.useState(false);
  const activeItem = React.useMemo(
    () => items.find((i) => i.id === active?.id),
    [active, items],
  );
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActive(active);
  }
  function handleDragEnd(event: DragEndEvent) {
    const { active, over, delta } = event;
    const THRESHOLD = 100;
    if (Math.abs(delta.x) > THRESHOLD) {
      onDelete(active.id);
      onChange(items.filter((i) => i.id !== active.id));
      return;
    }
    if (over && active.id !== over?.id) {
      const activeIndex = items.findIndex(({ id }) => id === active.id);
      const overIndex = items.findIndex(({ id }) => id === over.id);
      onChange(arrayMove(items, activeIndex, overIndex));
    }
    setIsOutsideThreshold(false);
    setActive(null);
  }
  function handleDragMove(event: DragMoveEvent) {
    const { delta } = event;
    const xThreshold = 100;
    setIsOutsideThreshold(Math.abs(delta.x) > xThreshold);
  }
  function handleDragCancel() {
    setIsOutsideThreshold(false);
    setActive(null);
  }
  return (
    <DndContext
      sensors={sensors}
      onDragMove={handleDragMove}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items}>
        <SortableListContext value={{ isOutside: isOutsideThreshold }}>
          <Flex direction="column" gap="4" style={{ flex: 1 }}>
            {items.map((item) => (
              <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
            ))}
          </Flex>
        </SortableListContext>
      </SortableContext>
      <SortableOverlay>{activeItem && renderItem(activeItem)}</SortableOverlay>
    </DndContext>
  );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
