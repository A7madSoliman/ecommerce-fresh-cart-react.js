import useOnlineStatus from "../../Hooks/useOnlineStatus";

export default function Online({ children }) {
  const isOnline = useOnlineStatus();
  if (isOnline === true) {
    return children;
  }
}
