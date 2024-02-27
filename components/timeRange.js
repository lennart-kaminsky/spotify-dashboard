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
