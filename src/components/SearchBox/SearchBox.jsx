import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filterSlice";
import { selectFilter } from "../../redux/filterSlice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  return (
    <div>
      <label>
        Find contacts by name
        <input
          value={filter}
          onChange={(e) => dispatch(changeFilter(e.target.value))}
          type="text"
        />
      </label>
      {filter && (
        <button onClick={() => dispatch(changeFilter(""))}>Reset</button>
      )}
    </div>
  );
};

export default SearchBox;
