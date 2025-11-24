import Link from "next/link";

export default function NotFound() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-dark text-white">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3"> <span className="text-danger">Opps!</span> Lost in Space.</p>
        <p className="lead">
          The page you’re looking for doesn’t exist.
        </p>
        <Link href="/" className="btn btn-primary">
          Return to Earth (Home)
        </Link>
      </div>
    </div>
  );
}