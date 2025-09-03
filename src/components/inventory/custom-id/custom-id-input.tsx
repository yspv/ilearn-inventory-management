"use client";

import { TextField } from "@radix-ui/themes";
import React from "react";
import { IMask, useIMask } from "react-imask";

const datetimeBlocks: { [key: string]: any } = {
  YYYY: {
    mask: "0000",
  },
  MM: {
    mask: IMask.MaskedRange,
    from: 1,
    to: 12,
  },
  DD: {
    mask: IMask.MaskedRange,
    from: 1,
    to: 31,
  },
};

function formatDigits(format: string) {
  return format.replace(/\[D:(\d+)\]/, (_, n) =>
    new Array(+n).fill("0").join(""),
  );
}

function formatHex(format: string) {
  return format.replace(/\[X:(\d+)\]/, (_, n) =>
    new Array(+n).fill("*").join(""),
  );
}

export function CustomIdInput(props: {
  fields: {
    type: string;
    format: string;
  }[];
}) {
  const { fields } = props;
  const format = fields.reduce((str, f) => str + f.format, "");
  const { ref } = useIMask({
    lazy: false,
    mask: formatHex(formatDigits(format)),
    blocks: datetimeBlocks,
  });
  return (
    <>
      <TextField.Root ref={ref as any} size="3" />
    </>
  );
}
