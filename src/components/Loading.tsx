import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Loading() {
  return (
    <div className="flex justify-center items-center">
      <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      <span className="ml-2" role="status" aria-live="polite">
        Loading...
      </span>
    </div>
  );
}

export default Loading;
