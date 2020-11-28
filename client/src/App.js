import { useMemo, useState } from "react";
import "./App.css";
import { useGetData } from "./hooks/useGetData";
import { Table } from "./Table";
import formatCoinInfo from "./utils/formater";
import { PrevInfoContext } from "./AppContext";

const App = () => {
  let info = useGetData();
  const data = useMemo(() => formatCoinInfo(info.data), [info]);
  const [prevInfo, setPrevInfo] = useState({});
  const columns = useMemo(() => [
    {
      Header: "Rank",
      accessor: "rank",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Price",
      accessor: "priceUsd",
    },
    {
      Header: "Market Cap",
      accessor: "marketCapUsd",
    },
    {
      Header: "VWAP (24Hr)",
      accessor: "vwap24Hr",
    },
    {
      Header: "Supply",
      accessor: "maxSupply",
    },
    {
      Header: "Volume (24Hr)",
      accessor: "volumeUsd24Hr",
    },
    {
      Header: "Change (24Hr)",
      accessor: "changePercent24Hr",
    },
  ]);

  return (
    <div className="App">
      <PrevInfoContext.Provider value={[prevInfo, setPrevInfo]}>
        {data ? <Table columns={columns} data={data} /> : null}
      </PrevInfoContext.Provider>
    </div>
  );
};

export default App;
