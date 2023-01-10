import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Wilder from "../components/Wilder";
import WilderForm from "../components/WilderForm";
import { IWilder } from "../types/IWilder";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { getAllWilders } from "../services/wilders";

export default function Home() {
  const [parent] = useAutoAnimate<HTMLUListElement>();
  const [wilders, setWilders] = useState<IWilder[]>([]);
  const [loadingWilders, setLoadingWilders] = useState(false);

  const loadWildersIntoState = async () => {
    setLoadingWilders(true);
    const controller = new AbortController();
    try {
      setWilders(await getAllWilders({ signal: controller.signal }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWilders(false);
    }
  };

  useEffect(() => {
    loadWildersIntoState();
  }, []);

  return (
    <div>
      <WilderForm onWilderCreated={loadWildersIntoState} />
      <ul
        ref={parent}
        className={clsx(
          loadingWilders && "opacity-90 transition-opacity duration-500"
        )}
      >
        {loadingWilders && !wilders.length ? (
          <Loader />
        ) : (
          wilders
            .slice()
            .sort((a, b) => b.id - a.id)
            .map((wilder) => (
              <Wilder key={wilder.id} setWilders={setWilders} wilder={wilder} />
            ))
        )}
      </ul>
    </div>
  );
}
