import React, { useEffect, useState } from "react";
import { AppProvider, useApp } from "./lib/app";
import { StoreProvider } from "./lib/store";
import Approvals, { title as ApprovalsTitle } from "./pages/Approvals";
import LotHold, { title as LotHoldTitle } from "./pages/LotHold";
import LotRun, { title as LotRunTitle } from "./pages/LotRun";
import MasterData, { title as MasterDataTitle } from "./pages/MasterData";
import Lot, { title as LotTitle } from "./pages/Lot";
import LotBatch, { title as LotBatchTitle } from "./pages/LotBatch";
import LotBlend, { title as LotBlendTitle } from "./pages/LotBlend";
import LotFinished, { title as LotFinishedTitle } from "./pages/LotFinished";
import Production, { title as ProductionTitle } from "./pages/Production";
import Receive, { title as ReceiveTitle } from "./pages/Receive";
import Reports, { title as ReportsTitle } from "./pages/Reports";
import Shipments, { title as ShipmentsTitle } from "./pages/Shipments";
import Stock, { title as StockTitle } from "./pages/Stock";
import Trace, { title as TraceTitle } from "./pages/Trace";

const PAGES: Record<string, { C: any; title: string }> = {
  Approvals: { C: Approvals, title: ApprovalsTitle },
  Lot: { C: Lot, title: LotTitle },
  LotBatch: { C: LotBatch, title: LotBatchTitle },
  LotBlend: { C: LotBlend, title: LotBlendTitle },
  LotFinished: { C: LotFinished, title: LotFinishedTitle },
  LotHold: { C: LotHold, title: LotHoldTitle },
  LotRun: { C: LotRun, title: LotRunTitle },
  MasterData: { C: MasterData, title: MasterDataTitle },
  Production: { C: Production, title: ProductionTitle },
  Receive: { C: Receive, title: ReceiveTitle },
  Reports: { C: Reports, title: ReportsTitle },
  Shipments: { C: Shipments, title: ShipmentsTitle },
  Stock: { C: Stock, title: StockTitle },
  Trace: { C: Trace, title: TraceTitle },
};
// No Home page: the quality manager opens on Approvals, the inventory manager on Production.
const current = (role: string) => {
  const k = (window.location.hash || "").replace(/^#\/?/, "").split(/[?#]/)[0];
  return PAGES[k] ? k : role === "qm" ? "Approvals" : "Production";
};

function Router() {
  const { role } = useApp();
  const [, setHashTick] = useState(0);
  const page = current(role);
  useEffect(() => {
    const on = () => { setHashTick((n) => n + 1); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const P = PAGES[page];
  useEffect(() => { document.title = P.title + " · Mawasem"; }, [P]);
  return <P.C key={page} />;
}

export default function App() {
  return <AppProvider><StoreProvider><Router /></StoreProvider></AppProvider>;
}
