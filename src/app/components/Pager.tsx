interface PagerProps {
  numberOfPages: number;
  currentPage: number;
  changePage: (page: number) => void;
}

export default function Pager({ numberOfPages, currentPage, changePage }: PagerProps) {
  return (
    <nav aria-label="Drink results pager">
      <ul>
        <li>
          <button onClick={(e) => changePage}>Previous</button>
        </li>

        {Array.from({ length: numberOfPages }, (_, i) => (
          <li key={i}>
            <button onClick={(e) => changePage(i + 1)}>{i + 1}</button>
          </li>
        ))}

        <li>
          <button onClick={(e) => changePage}>Next</button>
        </li>
      </ul>
    </nav>
  );
}
