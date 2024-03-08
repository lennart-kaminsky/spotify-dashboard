export default function handleScroll(scrollElement, handleSetScrollPosition) {
  if (scrollElement.current) {
    const { scrollTop } = scrollElement.current;
    handleSetScrollPosition(scrollTop);
  }
}
