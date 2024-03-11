import BackLink from "@/components/backLink";
import Image from "next/image";
import styled from "styled-components";

export default function Custom404() {
  const favRecords = [
    {
      artist: "Touché Amoré",
      album: "Stage Four",
      image: "https://i.scdn.co/image/ab67616d0000b273b5c2e08199c1d30bce73bfbd",
      url: "https://api.spotify.com/v1/albums/6KiS2t3EapTmHSt9xGUqe7",
    },
    {
      artist: "Bon Iver",
      album: "Bon Iver",
      image: "https://i.scdn.co/image/ab67616d0000b2736880235a103031a13ff8c902",
      url: "https://open.spotify.com/album/3JKDDYSBFozqcjWwSV3Yj3",
    },
    {
      artist: "La Dispute",
      album: "Wildlife",
      image: "https://i.scdn.co/image/ab67616d0000b273833c4168f9aa2d172adcbf36",
      url: "https://api.spotify.com/v1/albums/4BDDKxyTMgE1UZh7Wzdx28",
    },
    {
      artist: "Ben Böhmer",
      album: "Breathing",
      image: "https://i.scdn.co/image/ab67616d0000b27363393476ef4f6c43a0a0be09",
      url: "https://api.spotify.com/v1/albums/1bgPsKJwqED6DoNaZNdM42",
    },
    {
      artist: "Jungle",
      album: "Volcano",
      image: "https://i.scdn.co/image/ab67616d0000b27377619f14cb03e11baf5761d1",
      url: "https://api.spotify.com/v1/albums/5xnXOCf5aZgZ43DgGN4EDv",
    },
    {
      artist: "Defeater",
      album: "Empty Days & Sleepless Nights",
      image: "https://i.scdn.co/image/ab67616d0000b27389fb1057ea64ba7781d509ca",
      url: "https://api.spotify.com/v1/albums/6rk4whonuRE69MPpKNZaBC",
    },
  ];
  return (
    <Styled404Container>
      <h2>404 - Page not found</h2>
      <p>
        But since you{"'"}re here now - these are some of my {"(Lennski's)"}
        favorite records:
      </p>
      <StyledFavRecordsContainer>
        {favRecords.map((record) => (
          <li key={record.album}>
            <StyledRecord href={record.url} target="_blank">
              <Image
                src={record.image}
                alt={`Cover of ${record.album}`}
                width="250"
                height="250"
              />
              <p>{record.album} </p>
              <p> by {record.artist}</p>
            </StyledRecord>
          </li>
        ))}
      </StyledFavRecordsContainer>
      <BackLink>Go to dashboard</BackLink>
    </Styled404Container>
  );
}

const Styled404Container = styled.section`
  padding-block: 3rem;
  text-align: center;
`;

const StyledFavRecordsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  list-style: none;
  display: flex;
  padding: 2rem;
`;

const StyledRecord = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
  width: 250px;
  height: 320px;
  border-radius: 5px;
  p {
    margin: 0;
  }
  @media (hover: hover) {
    &:hover {
      background-color: ${({ theme }) => theme.bgDarker};
      scale: 0.9;
    }
  }
`;
