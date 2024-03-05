import useFilterStore from "@/stores/filterStore";
import styled from "styled-components";

export default function TimeRange({ artist, track }) {
  const {
    artistTimeRange,
    trackTimeRange,
    setArtistTimeRange,
    setTrackTimeRange,
  } = useFilterStore();

  function isActive(range) {
    if (artist) return artistTimeRange === range;
    if (track) return trackTimeRange === range;
    return false;
  }

  function onClick(range) {
    console.log("range", range);
    if (artist) return setArtistTimeRange(range);
    if (track) return setTrackTimeRange(range);
  }

  return (
    <StlyedTimeRangeContainer>
      <StyledTimeRangeButton
        $active={isActive("long_term")}
        onClick={() => onClick("long_term")}
      >
        all time
      </StyledTimeRangeButton>
      <StyledTimeRangeButton
        $active={isActive("medium_term")}
        onClick={() => onClick("medium_term")}
      >
        six months
      </StyledTimeRangeButton>
      <StyledTimeRangeButton
        $active={isActive("short_term")}
        onClick={() => onClick("short_term")}
      >
        four weeks
      </StyledTimeRangeButton>
    </StlyedTimeRangeContainer>
  );
}

const StlyedTimeRangeContainer = styled.div`
  display: flex;
  padding-block-start: 0.3rem;
  gap: 0.5rem;
`;

const StyledTimeRangeButton = styled.button`
  width: 90px;
  background-color: transparent;
  border: ${({ $active, theme }) =>
    $active ? "1px solid " + theme.hColor : "1px solid " + theme.fontColor};
  border-radius: 0.2rem;
  padding: 0.2rem 0.5rem;
  color: ${({ $active, theme }) => ($active ? theme.hColor : theme.fontColor)};
  transition: border 1s, color 1s;
  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      border: ${({ theme }) => "1px solid " + theme.hColor};
      color: ${({ theme }) => theme.hColor};
    }
  }
`;
