import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { PLAN_CATALOG } from "../graphql/operations";
import { mergeCatalog } from "../constants/plans";

/** Plans with live catalog prices / limits / modules; static fallback while loading or offline. */
export function usePlans() {
  const { data } = useQuery(PLAN_CATALOG);
  return useMemo(() => mergeCatalog(data?.planCatalog), [data]);
}
