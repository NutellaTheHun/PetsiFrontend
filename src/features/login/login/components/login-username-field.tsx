type UsernameProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function LoginUsernameField({ value, onChange }: UsernameProps) {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        id="username"
        value={value}
        onChange={onChange}
        placeholder="username"
      />
    </div>
  );
}
