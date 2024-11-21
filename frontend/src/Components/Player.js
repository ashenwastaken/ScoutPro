import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlayerNav from "./PlayerNav";
import PlayerFooter from "./PlayerFooter";
import dummyPlayerImage from "../assets/images/player.png";
import axiosInstance from "../services/axiosInstance";
import Loading from "./Loading";

export default function Player() {
  const { id } = useParams();
  const [player, setPlayer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerProfile = async () => {
      try {
        const { status, data } = await axiosInstance.get(`/player/${id}`);
        if (status === 200) {
          setPlayer(data);
          setIsLoading(false);
        }
      } catch (error) {
        alert(error.response.data.error);
        setIsLoading(false);
      }
    };

    fetchPlayerProfile();
  }, [player, id]);

  const requestPdf = async (id) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/generate-pdf/${id}`, {
        responseType: "blob",
      });

      if (response.status === 200) {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const downloadUrl = URL.createObjectURL(pdfBlob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `ScroutPro-${player.playerName}.pdf`;
        document.body.appendChild(link);
        link.click();

        URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(link);
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setIsLoading(false);
        alert(error.response.data.error);
      }
    }
  };

  if (!player.images || !player.playerName)
    return <Loading isLoading={isLoading} />;

  return (
    <>
      <PlayerNav player={player} requestPdf={requestPdf} />
      <section className="heroSection">
        <Loading isLoading={isLoading} />
        <div className="heroBackground">
          <div className="container">
            <div className="row align-items-center mb-5">
              <div className="col-12 col-lg-6">
                <h1 className="heroPlayerName" data-text={player.playerName}>
                  {player.playerName}
                </h1>
                <div className="heroPlayerWrapper">
                  <h5 className="infoHeading">Team</h5>
                  <p className="infoText">Los Angeles Leopards</p>
                </div>
                <div className="heroPlayerWrapper">
                  <h5 className="infoHeading">Position</h5>
                  <p className="infoText">{player.position}</p>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="heroImageWrapper">
                  <img
                    alt="Player main display"
                    src={
                      (player.images.length && player.images[0].path) ||
                      dummyPlayerImage
                    }
                    className="heroPlayerImage"
                  />
                </div>
              </div>
            </div>
            <div className="allStatsWrapper">
              <div className="statsWrapper">
                <p className="playerStatsHeading">Weight</p>
                <p className="playerStats">{player.weight}</p>
              </div>
              <div className="statsWrapper">
                <p className="playerStatsHeading">Height</p>
                <p className="playerStats">{player.heightWithShoes}</p>
              </div>
              <div className="statsWrapper">
                <p className="playerStatsHeading">BF</p>
                <p className="playerStats">{player.bodyFat}</p>
              </div>
              <div className="statsWrapper">
                <p className="playerStatsHeading">Wingspan</p>
                <p className="playerStats">{player.wingSpan}</p>
              </div>
              <div className="statsWrapper">
                <p className="playerStatsHeading">Standing Reach</p>
                <p className="playerStats">{player.standingReach}</p>
              </div>
              <div className="statsWrapper">
                <p className="playerStatsHeading">Hand Width</p>
                <p className="playerStats">{player.handWidth}</p>
              </div>
              <div className="statsWrapper">
                <p className="playerStatsHeading">Hand Length</p>
                <p className="playerStats">{player.handLength}</p>
              </div>
              <div className="statsWrapper">
                <p className="playerStatsHeading">Standing Vert</p>
                <p className="playerStats">{player.standingVert}</p>
              </div>
              <div className="statsWrapper">
                <p className="playerStatsHeading">Max Vert</p>
                <p className="playerStats">{player.maxVert}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row align-items-center my-5">
          <div className="col-12 col-lg-6 mt-0 imgWithSvg">
            <svg
              width="361"
              height="503"
              viewBox="0 0 361 503"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M129.477 159.886H194.984L65.5064 503H0L129.477 159.886Z"
                fill="#A40F37"
                fillOpacity="0.2"
              />
              <path
                d="M290.476 0H360.797L221.804 368.205H151.483L290.476 0Z"
                fill="#A40F37"
                fillOpacity="0.2"
              />
              <path
                d="M135.666 419.848H209.569L178.095 503H104.448L135.666 419.848Z"
                fill="#A40F37"
                fillOpacity="0.2"
              />
            </svg>
            <div className="d-flex justify-content-center">
              <div className="heroImageWrapper">
                <img
                  alt="Player mugshot"
                  src={
                    (player.images.length && player.images[1].path) ||
                    dummyPlayerImage
                  }
                  className="heroPlayerImage"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mt-5 mt-lg-0">
            <h2 className="playerProfileText">Player Profile</h2>
            <p className="playerProfileSubHeading">
              {player.description
                .split("\n")
                .filter((sentence) => sentence.trim() !== "")
                .map((sentence, index, array) => (
                  <React.Fragment key={index}>
                    {sentence.trim()}
                    {index < array.length - 1 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                  </React.Fragment>
                ))}
            </p>
            <div className="allStatsWrapper justify-content-start">
              <div className="statsWrapper">
                <p className="playerStatsHeading text-dark">Lane Agility</p>
                <p className="playerStats text-dark">{player.laneAgility}</p>
              </div>
              <div className="statsWrapper w-auto">
                <p className="playerStatsHeading text-dark">Reactive Shuttle</p>
                <p className="playerStats text-dark">{player.shuttle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="footageContainer">
        <div className="container text-center">
          <h2 className="footageHeading">Game Footage and Highlights</h2>
          <div className="row">
            {player.videos.map(
              (url) =>
                url !== "" && (
                  <div className="col-12 col-lg">
                    <iframe
                      title="Frame 1"
                      width="100%"
                      height="342"
                      src={url}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )
            )}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row align-items-center my-5">
          <div className="col-12 col-lg-6 mt-0">
            <h2 className="playerProfileText">Downloadable PDF</h2>
            <p className="playerProfileSubHeading">
              For a comprehensive review, coaches and scouts can download the
              athlete's detailed profile in PDF format. This downloadable player
              card includes basic information, key statistics, and any embedded
              commentary or notes, serving as a valuable resource for
              evaluations.
              <br />
              <br />
              The PDF offers a quick yet thorough snapshot of the athlete’s
              strengths and achievements, curated for effective evaluation. Note
              that the content is non-editable once downloaded, ensuring a
              consistent, professional document for internal or scouting
              purposes.
            </p>
            <button
              onClick={() => requestPdf(player._id)}
              className="downloadPdfBtnRed"
              type="button"
            >
              Download PDF
            </button>
          </div>
          <div className="col-12 col-lg-6 mt-5 mt-lg-0 imgWithSvgReverse">
            <svg
              width="369"
              viewBox="0 0 369 514"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M132.622 163.383H199.561L67.2524 514H0.313477L132.622 163.383Z"
                fill="#A40F37"
                fillOpacity="0.2"
              />
              <path
                d="M297.142 0H369L226.968 376.258H155.109L297.142 0Z"
                fill="#A40F37"
                fillOpacity="0.2"
              />
              <path
                d="M138.946 429.029H214.465L182.303 514H107.046L138.946 429.029Z"
                fill="#A40F37"
                fillOpacity="0.2"
              />
            </svg>
            <div className="d-flex justify-content-center align-items-center">
              {player.pdfPreview ? (
                <img
                  alt="PDF Display"
                  src={player.pdfPreview.path}
                  className="pdfImage"
                />
              ) : (
                <p className="generatingText">Generating Preview...</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <PlayerFooter />
    </>
  );
}
