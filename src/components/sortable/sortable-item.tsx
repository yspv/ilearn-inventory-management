"use client";
import { DraggableSyntheticListeners, UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import React, { CSSProperties, PropsWithChildren } from "react";
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { useSortableList } from "./sortable-list";

interface Props {
  id: UniqueIdentifier;
}

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = React.createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

export function SortableItem(props: PropsWithChildren<Props>) {
  const { children, id } = props;
  const {
    active,
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const { isOutside } = useSortableList();
  const context = React.useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  );

  const style: CSSProperties = {
    touchAction: 'none',
    opacity: isDragging && !isOutside ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableItemContext.Provider value={context}>
      <Card ref={setNodeRef} style={style} variant="ghost">
        <Flex gap="4" align="center" justify="between">
          {isOutside && active?.id === id ? (
            <Text color="red">Delete</Text>
          ) : (
            children
          )}
        </Flex>
      </Card>
    </SortableItemContext.Provider>
  );
}

export function DragHandle() {
  const { attributes, listeners, ref } = React.useContext(SortableItemContext);
  return (
    <Button
      color="gray"
      variant="ghost"
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <DragHandleDots2Icon />
    </Button>
  );
}
