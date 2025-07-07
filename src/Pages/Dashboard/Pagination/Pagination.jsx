import ReactPaginate from "react-paginate";
import "./pagination.css";

export default function PaginatedItems({ itemsPerPage, total, setpage }) {
  const pageCount = total / itemsPerPage;
  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => setpage(e.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="coustom-paginate"
        pageLinkClassName="pageLinkClassName	"
        activeLinkClassName="activeLinkClassName"
        nextClassName="nextClassName"
        previousClassName="previousClassName"
        previousLinkClassName="previousLinkClassName"
        nextLinkClassName="nextLinkClassName"
        disabledClassName="disabledClassName"
      />
    </>
  );
}
