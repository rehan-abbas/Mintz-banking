import HeaderBox from "@/components/HeaderBox";
import Rightsidebar from "@/components/Rightsidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const home = async() => {
  const loggedIn = await getLoggedInUser();
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="welcome"
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage you raccount and transactions efficiently"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={500.4}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <Rightsidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 250 }, { currentBalance: 500 }]}
      />
    </section>
  );
};

export default home;
