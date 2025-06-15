"use client";

import { useEffect, useState } from "react";
import styles from "./FuneralStats.module.css";
import { Panel } from "../../components/Statistics/components/Panel";
import { PanelClear } from "../../components/Statistics/components/PanelClear";

export function FuneralStats() {
  const [funeralData, setFuneralData] = useState([]);
  const [errorMsg, setErrorMsg] = useState();

  useEffect(() => {
    const fetchFuneralData = async () => {
      try {
        const response = await fetch("/api/user/statistics/funeral-stats");

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 401) {
            setErrorMsg(errorData.error);
            return;
          } else {
            throw new Error("Błąd poczas pobierania danych");
          }
        }

        const funeralData = await response.json();
        setFuneralData(funeralData);
      } catch (error) {
        console.error("Błąd w trakcie żądania:", error);
      }
    };

    fetchFuneralData();
  }, []);

  return (
    <>
      {funeralData.map((stats) => (
        <div className={styles.statisticsCard} key={stats.unique_key}>
          <p className={styles.cardName}>Pogrzebowe</p>
          <Panel
            title={"Pogrzebów dzisiaj:"}
            value={`${stats.funerals_today ? stats.funerals_today : "0"} szt.`}
            lastYearValue={`${
              stats.funerals_one_year_ago ? stats.funerals_one_year_ago : "0"
            } szt.`}
          />

          <Panel
            title={"Pogrzebów w tym miesiącu:"}
            value={`${
              stats.funerals_this_month ? stats.funerals_this_month : "0"
            } szt.`}
            lastYearValue={`${
              stats.funerals_last_year_same_month
                ? stats.funerals_last_year_same_month
                : "0"
            } szt.`}
          />

          <Panel
            title={"Pogrzebów w tym roku:"}
            value={`${
              stats.funerals_this_year_to_date
                ? stats.funerals_this_year_to_date
                : "0"
            } szt.`}
            lastYearValue={`${
              stats.funerals_last_year ? stats.funerals_last_year : "0"
            } szt.`}
          />

          <PanelClear
            title={"Pogrzebów ogółem:"}
            value={`${stats.total_funerals ? stats.total_funerals : "0"} szt.`}
          />
        </div>
      ))}
    </>
  );
}
