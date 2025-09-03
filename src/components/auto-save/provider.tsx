"use client";
import { useDebounceCallback } from "@siberiacancode/reactuse";
import { isEqual } from "lodash";
import React from "react";

type AutoSaveType = { status: string; setStatus(status: string): void };
const AutoSaveContext = React.createContext<AutoSaveType | null>(null);

export function AutoSaveProvider(props: React.PropsWithChildren) {
  const { children } = props;
  const [status, setStatus] = React.useState("idle");
  return (
    <AutoSaveContext.Provider value={{ status, setStatus }}>
      {children}
    </AutoSaveContext.Provider>
  );
}

export function useAutoSaveStatus() {
  const context = React.useContext(AutoSaveContext);
  if (!context) {
    throw Error("useAutoSave() must be within AutoSaveProvider");
  }
  return context;
}

export function useSaveWithStatus<
  F extends (...args: any[]) => Promise<unknown>,
>(fn: F) {
  const { setStatus } = useAutoSaveStatus();
  React.useEffect(() => setStatus("idle"), [setStatus]);
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    setStatus("pending");
    fn.apply(this, args)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  };
}

export function useAutoSave(
  data: any,
  saveFn: () => Promise<unknown>,
  delay: number = 2000,
  validation?: () => boolean,
) {
  const context = React.useContext(AutoSaveContext);
  if (!context) {
    throw Error("useAutoSave() must be within AutoSaveProvider");
  }
  const { status, setStatus } = context;
  const hasChange = React.useRef(false);
  const isValid = React.useRef(false);
  const [lastData, setLastData] = React.useState(data);
  const callback = useDebounceCallback(useSaveWithStatus(saveFn), delay);

  React.useEffect(() => {
    if (!hasChange.current && !isEqual(data, lastData)) {
      hasChange.current = true;
    } else {
      hasChange.current = false;
    }
  }, [data, lastData]);

  React.useEffect(() => {
    if (!validation) {
      isValid.current = true;
      return;
    }
    if (hasChange.current) {
      isValid.current = validation();
    }
  }, [hasChange, validation]);

  React.useEffect(() => {
    setLastData(data);
  }, [data]);

  React.useEffect(() => {
    if (hasChange.current) {
      if (isValid.current) {
        setStatus("pending");
        callback();
        hasChange.current = false;
      } else {
        setStatus("notSaved");
      }
    }
  }, [data, lastData, setStatus, callback]);

  return { status };
}
