import useOnlineStatus from "../../Hooks/useOnlineStatus";

export default function Offline({ children }) {
  const isOnline = useOnlineStatus();

  if (isOnline === false) {
    return children;
  }
}
