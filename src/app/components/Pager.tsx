interface PagerProps {
  total: number;
  currentPage: number;
  changePage: (page: number) => void;
}

export default function Pager({ total, currentPage, changePage }: PagerProps) {
  return (
    <nav aria-label="Drink results pager">
      <ul>
        <li>
          <button onClick={(e) => changePage}>Previous</button>
        </li>
        <li>
          <button>Next</button>
        </li>
      </ul>
    </nav>
  );
}
