import clsx from "clsx";
import React, { useState } from "react";
import Loader from "../components/Loader";
import Wilder from "../components/Wilder";
import WilderForm from "../components/WilderForm";
import { IWilder, IWilderData } from "../types/IWilder";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useQuery } from "@apollo/client";
import { GET_ALL_WILDERS } from "../services/wilders.query";

export default function Home() {
  const [parent] = useAutoAnimate<HTMLUListElement>();

  // const [getAllWilders, { data, loading, error, refetch }] =
  //   useLazyQuery<IWilderData>(GET_ALL_WILDERS);
  const { data, loading, error, refetch } =
    useQuery<IWilderData>(GET_ALL_WILDERS);

 
  if (error) {
    return <div>Il y a une erreur</div>;
  }
  return (
    <div>
      <WilderForm onWilderCreated={refetch} />
      <ul
        ref={parent}
        className={clsx(
          loading && "opacity-90 transition-opacity duration-500"
        )}
      >
        {loading && !data?.readWilders.length ? (
          <Loader />
        ) : (
          data?.readWilders
            .slice()
            .sort((a, b) => b.id - a.id)
            .map((wilder) => (
              <Wilder
                refreshWilders={refetch}
                key={wilder.id}
                wilder={wilder}
              />
            ))
        )}
      </ul>
    </div>
  );
}
