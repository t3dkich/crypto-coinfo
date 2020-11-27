import { useMemo } from "react";
import "./App.css";
import { useGetData } from "./hooks/useGetData";
import { Table } from "./Table";
import formatCoinInfo from "./utils/formater";

const App = () => {
  let info = useGetData();

  const data = useMemo(() => formatCoinInfo(info.data), [info]);

  console.log(info.data);
  // rank: "1"
  // name: "Bitcoin"
  // priceUsd: "16913.3757279158525175"
  // marketCapUsd: "313500294417.5133763050312525"
  // vwap24Hr: "17021.3725171738134742"
  // maxSupply: "21000000.0000000000000000"
  // volumeUsd24Hr: "12361211306.4722896232531540"
  //   changePercent24Hr: "-2.2339692684575355"
  // id: "bitcoin"
  // supply: "18535643.0000000000000000"
  // symbol: "BTC"
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
      Header: "VWAP (24Hr)",
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
      {console.log(data)}
      {data ? <Table columns={columns} data={data} /> : null}
    </div>
  );
};

export default App;
