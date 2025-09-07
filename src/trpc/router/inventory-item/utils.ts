import { Context } from "@/trpc/context";
import { groupArrayToObject } from "@/trpc/helpers";
import { checkPrismaError } from "@/trpc/utils";
import { InventoryField, Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export async function lockItem(props: {
  tx: Prisma.TransactionClient;
  id: string;
  version: number;
}) {
  const { tx, id, version } = props;

  const { count } = await tx.inventoryItem.updateMany({
    where: {
      id,
      version,
    },
    data: {
      version: { increment: 1 },
    },
  });

  if (count === 0) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Version conflict",
    });
  }

  return version + 1;
}

export function fetchAggregates(
  ctx: Context,
  inventoryId: string,
  fields: InventoryField[],
) {
  const aggFields = buildAggFields(fields);
  return checkPrismaError(
    ctx.prisma.inventoryItem.aggregate({
      where: { inventoryId },
      _max: aggFields,
      _min: aggFields,
      _avg: aggFields,
      _count: true,
    }),
  );
}

export function fetchGroupedStrings(
  ctx: Context,
  inventoryId: string,
  fields: InventoryField[],
) {
  const groupFields = buildGroupFields(fields);
  return ctx.prisma.$transaction((tx) => {
    return Promise.all(
      groupFields.map((f: any) =>
        tx.inventoryItem.groupBy({ where: { inventoryId }, take: 5, ...f }),
      ),
    );
  });
}

export function buildStringStats(fields: InventoryField[], groupResults: any) {
  const groupedObject = groupArrayToObject(groupResults);
  return fields.reduce<any[]>((acc, f) => {
    const values = groupedObject[f.type + f.slot];
    if (!values) return acc;
    acc.push({ field: f.title, topValues: values });
    return acc;
  }, []);
}

export function buildNumericStats(fields: InventoryField[], aggResult: any) {
  return fields
    .filter((f) => f.type === "num")
    .reduce<any[]>((acc, f) => {
      const key = f.type + f.slot;
      const avg = aggResult._avg[key];
      const max = aggResult._max[key];
      const min = aggResult._min[key];
      acc.push({ field: f.title, max, min, avg });
      return acc;
    }, []);
}

function buildAggFields(fields: InventoryField[]) {
  return fields
    .filter((f) => f.type === "num")
    .reduce<Record<string, true>>((acc, f) => {
      acc[f.type + f.slot] = true;
      return acc;
    }, {});
}

function buildGroupFields(fields: InventoryField[]) {
  return fields
    .filter((f) => f.type === "string")
    .map((f) => {
      const field = f.type + f.slot;
      return {
        by: [field],
        orderBy: { _count: { [field]: "desc" } },
      };
    });
}
