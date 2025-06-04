type UsernameProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function LoginPasswordField({ value, onChange }: UsernameProps) {
  return (
    <div className="mb-3">
      <input
        value={value}
        onChange={onChange}
        type="password"
        className="form-control"
        id="loginPassword"
        placeholder="password"
      />
    </div>
  );
}
