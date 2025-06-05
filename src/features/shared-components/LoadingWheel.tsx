type Props = {
  loading: boolean;
};
export function LoadingWheel({ loading }: Props) {
  return (
    loading && (
      <div className="spinner-border text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  );
}
