type Props = {
  error: string;
};
export function ErrorMessage({ error }: Props) {
  return (
    error && (
      <div
        className="mb-3 text-danger"
        style={{ minHeight: "1.5rem", color: "red" }}
      >
        {error}
      </div>
    )
  );
}
