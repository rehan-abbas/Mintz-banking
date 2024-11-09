import { Metadata } from "next";
import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import Rightsidebar from "@/components/Rightsidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
  title: 'Home | Banking App',
  description: 'Welcome to your banking dashboard'
}

interface Props {
  searchParams: {
    id?: string;
    page?: string;
  }
}

const Home = async ({ searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  if (!accounts) return null;
  
  const accountsData = accounts?.data;
  const appwriteItemId = searchParams?.id || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="welcome"
            user={loggedIn?.firstName || "Guest"}
            subtext="Access and manage your account and transactions efficiently"
          />
          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions || []}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
      <Rightsidebar
        user={loggedIn}
        transactions={account?.transactions || []}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
