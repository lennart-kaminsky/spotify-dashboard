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
  gap: 1rem;
`;

const StyledTimeRangeButton = styled.button`
  background-color: transparent;
  border: none;
  padding-inline: 0;
  color: var(--fontColor);
  color: ${({ $active }) => ($active ? "var(--hColor)" : "var(--fontColor)")};
`;
