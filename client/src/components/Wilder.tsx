import React from "react";
import blank_profile from "../assets/avatar.png";
import Skill from "./Skill";
import { IWilder } from "../types/IWilder";
import { Link } from "react-router-dom";
import {
  useMutation,
} from "@apollo/client";
import { DELETE_WILDER } from "../services/wilders.mutation";

interface WilderProps {
  wilder: IWilder;
  refreshWilders: Function;
}

const Wilder = ({
  wilder: { id, name, skills = [], avatarUrl },
  refreshWilders,
}: WilderProps) => {
  const [deleteWilder] = useMutation(DELETE_WILDER, {
    variables: {
      deleteWilderId: id.toString(),
    },
    onCompleted: (data) => {
      alert(data?.deleteWilder.message);
      refreshWilders();
    },
  });

  const handleDelete = async () => {
    if (window.confirm("are you sure ?"))
      try {
        // setWilders((oldList) => oldList.filter((wilder) => wilder.id !== id));
        await deleteWilder();
      } catch (err) {
        console.error(err);
      }
  };

  return (
    <>
      <div className="flex bg-white p-4 rounded-2xl mb-4 shadow-md">
        <Link to={`/wilders/${id}`}>
          <img
            src={avatarUrl || blank_profile}
            alt={name}
            className="h-16 w-16 rounded-full mr-6"
          />
        </Link>

        <div className="flex justify-between w-full  min-w-[200px]">
          <div className="flex flex-col">
            <Link to={`/wilders/${id}`}>
              <h3 className="font-semibold">
                {name[0].toUpperCase() + name.split("").splice(1).join("")}
              </h3>
            </Link>

            <ul className="flex flex-wrap">
              {skills.slice().map((skill, index) => (
                <Skill
                  key={index}
                  title={skill.name}
                  wilderId={id}
                  skillId={skill.id}
                  votes={skill.votes}
                />
              ))}
            </ul>
          </div>
          <div className="flex flex-col min-w-[40px]">
            <Link to={`/wilders/${id}/edit`}>
              <button className="mb-2 w-full">✏️</button>
            </Link>
            <button onClick={handleDelete}>x</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wilder;
