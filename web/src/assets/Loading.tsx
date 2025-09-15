const Loading: React.FC = () => {
  return (
    <svg
      className="animate-spin ml-2 text-gray-500"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
};

export default Loading;
