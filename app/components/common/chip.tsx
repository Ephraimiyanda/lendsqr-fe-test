export function Chip({ status }: { status: string }) {
  return (
    <div className={`chip ${status}`}>
      <p>{status}</p>
    </div>
  );
}
