"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePopup } from "@/components/UI/Popup";
import { port } from "@/constants/appl.constant";
import Players from "@/components/UI/Players"; // Import the Players component

const Page = () => {
  const { showPopup } = usePopup();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.post(`${port}/playerRegistrationApi/getAllPlayers`, {
          withCredentials: true,
        });

        const data = response.data;

        if (data.status === 4) {
          setPlayers(data.data.playersList || []);
          showPopup(data.message, "success");
        } else {
          showPopup(data.message, "warning");
        }
      } catch (error) {
        showPopup("An error occurred while fetching players.", "warning");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div>
      <h2>Registered Players</h2>
      {loading ? (
        <p>Loading players...</p>
      ) : players.length > 0 ? (
        <Players players={players} />
      ) : (
        <p>No players found.</p>
      )}
    </div>
  );
};

export default Page;
