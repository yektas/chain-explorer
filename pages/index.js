import Web3 from "web3";
import web3Extension from "@energi/web3-ext";
import {
  CheckIcon,
  DocumentDuplicateIcon,
  DocumentSearchIcon,
  StopIcon,
  PlayIcon,
} from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { Datatable, Layout, StatCard } from "../components";
import { shortenAddress, shortenHash } from "../utils";
import useCopyClipboard from "../hooks/useCopyClipboard";

const explorerUrl = "https://explorer.energi.network";
const web3 = new Web3("https://nodeapi.energi.network");
web3Extension.extend(web3);

const columns = [
  {
    Header: "Tx Hash",
    accessor: "hash",
    Cell: (props) => (
      <a
        target="_blank"
        rel="noreferrer"
        className="underline text-primary"
        href={`${explorerUrl}/tx/${props.value}`}
      >
        <span className="inline-block">
          <DocumentSearchIcon className="h-4 w-4" />
        </span>
        {shortenHash(props.value)}
      </a>
    ),
  },
  {
    Header: "From",
    accessor: "from",
    Cell: (props) => (
      <a
        target="_blank"
        rel="noreferrer"
        className="underline text-primary"
        href={`${explorerUrl}/address/${props.value}`}
      >
        <span className="inline-block">
          <DocumentSearchIcon className="h-4 w-4" />
        </span>
        {shortenHash(props.value, 30)}
      </a>
    ),
  },
  {
    Header: "To",
    accessor: "to",
    Cell: (props) => (
      <a
        target="_blank"
        rel="noreferrer"
        className="underline text-primary"
        href={`${explorerUrl}/address/${props.value}`}
      >
        <span className="inline-block">
          <DocumentSearchIcon className="h-4 w-4" />
        </span>
        {shortenHash(props.value, 30)}
      </a>
    ),
  },
  {
    Header: "Amount",
    accessor: "value",
    Cell: (props) => (
      <div className="flex justify-center items-center">
        <img
          className="inline-block w-5 h-5 mr-1"
          src="/energi.png"
          alt="Energi coin logo"
        />
        {parseFloat(web3.utils.fromWei(props.value, "NRG")).toFixed(2)}
      </div>
    ),
  },
];

export default function Home() {
  const [isCopied, setIsCopied] = useCopyClipboard();

  const [blockNumber, setBlockNumber] = useState();
  const [numberOfTransactions, setNumberOfTransactions] = useState();
  const [miner, setMiner] = useState();
  const [transactions, setTransactions] = useState([]);
  const [chainId, setChainId] = useState();
  const [totalDifficulty, setTotalDifficulty] = useState();

  const [active, setActive] = useState(true);

  const intervalRef = useRef();

  const getBlockchainData = async () => {
    const blockNumber = await web3.nrg.getBlockNumber();
    const numberOfTransactions = await web3.nrg.getBlockTransactionCount(
      "latest"
    );
    const latestBlock = await web3.nrg.getBlock("latest");
    setBlockNumber(blockNumber);
    setNumberOfTransactions(numberOfTransactions);
    setMiner(latestBlock.miner);
    setTransactionData(latestBlock.transactions);
    setChainId(await web3.nrg.getChainId());
    setTotalDifficulty(latestBlock.totalDifficulty);
  };

  useEffect(() => {
    if (!active) {
      clearInterval(intervalRef.current);
      return;
    }

    //Update every 5 seconds
    let id = setInterval(() => {
      getBlockchainData();
    }, 5000);

    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [active]);

  const setTransactionData = async (transactionHashes) => {
    const transactionData = await Promise.all(
      transactionHashes.map(
        async (transactionHash) =>
          await web3.nrg.getTransaction(transactionHash)
      )
    );
    setTransactions(transactionData);
  };

  const toggle = () => {
    if (active) {
      clearInterval(intervalRef.current);
    }
    setActive(!active);
  };

  return (
    <Layout>
      <div className="relative mt-28">
        <section className="max-w-full mx-4 py-4 sm:mx-auto sm:px-4 lg:px-8">
          <button
            className="rounded-lg px-4 mb-5 sm:mb-0 py-2 mx-auto bg-primary text-white text-lg font-semibold shadow-homogen shadow-primary/70 uppercase flex items-center"
            onClick={() => toggle()}
          >
            {active ? (
              <>
                <StopIcon className="inline-block w-10 h-10 mr-2" />
                Stop data flow
              </>
            ) : (
              <>
                <PlayIcon className="inline-block w-10 h-10 mr-2" />
                Start data flow
              </>
            )}
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-3 md:gap-x-6 gap-y-2">
            <StatCard title="Block Number" value={blockNumber} />
            <StatCard title="Chain ID" value={chainId} />
            <StatCard title="Total Difficulty" value={totalDifficulty} />
            <StatCard title="Transactions" value={numberOfTransactions} />
            <StatCard title="Miner Address" value={miner}>
              <p
                onClick={() => setIsCopied(miner)}
                className="text-3xl font-bold text-black cursor-pointer justify-center items-center flex space-x-2"
              >
                <span>{shortenAddress(miner)}</span>
                {isCopied ? (
                  <CheckIcon className="h-6 w-6 text-green-700 inline-block" />
                ) : (
                  <DocumentDuplicateIcon className="h-8 w-8 text-gray-700 inline-block" />
                )}
              </p>
            </StatCard>
          </div>
        </section>

        <section className="max-w-full mx-4 py-6 sm:mx-auto sm:px-6 lg:px-8 mt-4">
          <Datatable columns={columns} data={transactions} />
        </section>
      </div>
    </Layout>
  );
}
