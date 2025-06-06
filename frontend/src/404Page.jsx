import NotFoundSVG from "../public/not-found.svg";

export default function NotFound() {
  return (
    <div className="not-found-wrapper">
      <div className="not-found-left">
        <p className="four-oh-four">404</p>
        <p className="not-found">PAGE NOT FOUND</p>
        <p className="description">
          The page you are looking for doesn't exist.
        </p>
        <button className="back-home">Back to Home</button>
      </div>
      <img className="not-found-img" src={NotFoundSVG} alt="NOT FOUND" />
    </div>
  );
}
