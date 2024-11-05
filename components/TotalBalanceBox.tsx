import AnimatedCounter from "./AnimatedCounter";
import DoughnutChart from "./Doughnutchart";

const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotalBalanceBoxProps) => {
  return (
    <section className="total-balance">
      <div className="total-balance__header">
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="header-2">Bank Accounts: {totalBanks}</h2>
        <div className="flex flex-col gap-2">
          <p className="total-balance-label">Total Current Balance</p>
          <p className="total-balance-amount flex-center gap-2"></p>
          <AnimatedCounter amount={totalCurrentBalance} />
        </div>
      </div>
    </section>
  );
};

export default TotalBalanceBox;
