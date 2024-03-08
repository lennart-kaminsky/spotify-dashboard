export default function handleScroll(scrollElement, setTopListPosition, range) {
  if (scrollElement.current) {
    const { scrollTop } = scrollElement.current;
    setTopListPosition(scrollTop, range);
  }
}
