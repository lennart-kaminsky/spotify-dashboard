import styled from "styled-components";

export default function TimeRange({ timeRange, onTimeRange }) {
  return (
    <StlyedTimeRangeContainer>
      <StyledTimeRangeButton
        $active={timeRange === "long_term"}
        onClick={() => onTimeRange("long_term")}
      >
        all time
      </StyledTimeRangeButton>
      <StyledTimeRangeButton
        $active={timeRange === "medium_term"}
        onClick={() => onTimeRange("medium_term")}
      >
        six months
      </StyledTimeRangeButton>
      <StyledTimeRangeButton
        $active={timeRange === "short_term"}
        onClick={() => onTimeRange("short_term")}
      >
        four weeks
      </StyledTimeRangeButton>
    </StlyedTimeRangeContainer>
  );
}
const StlyedTimeRangeContainer = styled.div`
  display: flex;
  padding-block-start: 0.5rem;
  /* gap: 1rem; */
  gap: 0.5rem;
`;

const StyledTimeRangeButton = styled.button`
  width: 90px;
  background-color: transparent;
  /* border: 1px solid var(--fontColor); */
  border: ${({ $active }) =>
    $active ? "1px solid var(--hColor)" : "1px solid var(--fontColor)"};
  border-radius: 0.2rem;
  /* padding-inline: 0; */
  padding: 0.2rem 0.5rem;
  color: ${({ $active }) => ($active ? "var(--hColor)" : "var(--fontColor)")};
  &:hover {
    border: 1px solid var(--hColor);
    color: var(--hColor);
  }
`;
