"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const partijData = [
    { zetels: 24, naam: "VVD", kleur: "rgba(124, 77, 255, 0.2)" },
    { zetels: 25, naam: "GLPvdA", kleur: "rgba(255, 193, 7, 0.2)" },
    { zetels: 37, naam: "PVV", kleur: "rgba(76, 175, 80, 0.2)" },
    { zetels: 20, naam: "NSC", kleur: "rgba(255, 192, 127, 0.2)" },
    { zetels: 9, naam: "D66", kleur: "rgba(159, 231, 126, 0.2)" },
    { zetels: 7, naam: "BBB", kleur: "rgba(82, 121, 111, 0.2)" },
    { zetels: 5, naam: "CDA", kleur: "rgba(95, 167, 44, 0.2)" },
    { zetels: 5, naam: "SP", kleur: "rgba(225, 34, 13, 0.2)" },
    { zetels: 3, naam: "FvD", kleur: "rgba(185, 27, 213, 0.2)" },
    { zetels: 3, naam: "SGP", kleur: "rgba(102, 193, 218, 0.2)" },
    { zetels: 3, naam: "CU", kleur: "rgba(163, 255, 106, 0.2)" },
    { zetels: 3, naam: "Denk", kleur: "rgba(106, 150, 255, 0.2)" },
    { zetels: 2, naam: "Volt", kleur: "rgba(68, 30, 103, 0.2)" },
    { zetels: 1, naam: "Ja21", kleur: "rgba(30, 103, 56, 0.2)" },
  ];

  const [partijDataState, setPartijDataState] = useState(partijData);
  const [gekozenPartijState, setGekozenPartijState] = useState([]);
  const [zetelPercentage, setZetelPercentage] = useState(0);
  const [totaalGekozenZetels, setTotaalGekozenZetels] = useState(0);

  const totaalZetels = 150;

  const resetGekozenPartijState = () => {
    setGekozenPartijState([]);
  };

  const berekenZetelsInGekozenPartij = () => {
    let totaalZetelsForEach = 0;
    if (gekozenPartijState) {
      gekozenPartijState.forEach(
        (element) =>
          (totaalZetelsForEach = totaalZetelsForEach + element.zetels)
      );
      let zetelPecentageBerekening = totaalZetelsForEach / totaalZetels;
      setZetelPercentage(zetelPecentageBerekening);
      setTotaalGekozenZetels(totaalZetelsForEach);
      console.log(zetelPecentageBerekening);
    }
  };

  useEffect(() => {
    berekenZetelsInGekozenPartij();
  }, [gekozenPartijState]);

  const maakActief = (naam, e) => {
    const vindIndexOpnaam = (element) => element.naam === naam;
    const partijIndexInData = partijData.findIndex(vindIndexOpnaam);

    if (gekozenPartijState.findIndex(vindIndexOpnaam) == -1) {
      setGekozenPartijState([
        ...gekozenPartijState,
        partijDataState[partijIndexInData],
      ]);
      e.target.classList.remove("knop-inactief");
    } else {
      console.log("zit er al in");
      setGekozenPartijState(gekozenPartijState.filter((a) => a.naam !== naam));
      e.target.classList.add("knop-inactief");
    }

    console.log(gekozenPartijState);
  };

  return (
    <main className={styles.main}>
      <h1>Coalitiebouwer</h1>
      <div className='tweede_kamer'>
        <div className='tweede_kamer__balk_outer'>
          {gekozenPartijState &&
            gekozenPartijState.map((gekozenPartij, i) => (
              <div
                style={{
                  backgroundColor: gekozenPartij.kleur,
                  width: (gekozenPartij.zetels / totaalZetels) * 100 + "%",
                }}
                key={i}
              >
                <span>{gekozenPartij.naam}</span>
              </div>
            ))}
        </div>
        <div className='onder_tweede_kamer'>
          <span className='percentage'>
            {Math.round(zetelPercentage * 100).toString()}%
          </span>
          <span className='percentage'>
            {totaalGekozenZetels.toString()} zetels
          </span>
        </div>
      </div>
      <div className='onderkant'>
        {gekozenPartijState.length > 0 && (
          <button className='reset-knop' onClick={resetGekozenPartijState}>
            Reset
          </button>
        )}
        <div className='partijKnoppen'>
          {partijData.map((item) => (
            <button
              style={{
                borderColor: item.kleur,
                backgroundColor: item.kleur,
              }}
              className='knop-inactief'
              onClick={(e) => maakActief(item.naam, e)}
              key={item.naam}
            >
              {item.naam} ({item.zetels})
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
