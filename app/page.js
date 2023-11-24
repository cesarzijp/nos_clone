"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const partijData = [
    { zetels: 24, naam: "VVD", kleur: "#7C4DFF" },
    { zetels: 25, naam: "GL PvdA", kleur: "#FFC107" },
    { zetels: 37, naam: "PVV", kleur: "#4CAF50" },
    { zetels: 20, naam: "NSC", kleur: "#FFC07F" },
    { zetels: 9, naam: "D66", kleur: "#9FE77E" },
    { zetels: 7, naam: "BBB", kleur: "#52796f" },
    { zetels: 5, naam: "CDA", kleur: "#5FA72C" },
    { zetels: 5, naam: "SP", kleur: "#E1220D" },
    { zetels: 3, naam: "FvD", kleur: "#B91BD5" },
    { zetels: 3, naam: "SGP", kleur: "#66C1DA" },
    { zetels: 3, naam: "CU", kleur: "#A3FF6A" },
    { zetels: 3, naam: "Denk", kleur: "#6A96FF" },
    { zetels: 2, naam: "Volt", kleur: "#441E67" },
    { zetels: 1, naam: "Ja21", kleur: "#1E6738" },
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
    } else {
      console.log("zit er al in");
      setGekozenPartijState(gekozenPartijState.filter((a) => a.naam !== naam));
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
          <span className='percentage'>{totaalGekozenZetels.toString()}</span>
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
              }}
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
