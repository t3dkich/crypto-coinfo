import { useMemo } from "react";
import "./App.css";
import { useGetData } from "./hooks/useGetData";
import { Table } from "./Table";
import formatCoinInfo from "./utils/formater";

const App = () => {
  let info = useGetData();
  const data = useMemo(() => formatCoinInfo(info.data), [info]);
<<<<<<< Updated upstream
=======

  console.log(info.data);

>>>>>>> Stashed changes
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
      {data ? <Table columns={columns} data={data} /> : null}
    </div>
  );
};

export default App;
